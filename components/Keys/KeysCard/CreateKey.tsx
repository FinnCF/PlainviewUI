import React, { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { Dropdown, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { Plus } from 'react-feather';
import useAddKeyWithFee from '../../../hooks/contracts/ERCKMS1/Write/useAddKeyWithFee';
import useGenerateRSAKeyPair from '../../../hooks/cryptography/RSAKeys/useGenerateRSAKeyPair';
import { useSignMessage } from 'wagmi';
import { useEncryptBytesWithAES256 } from '../../../hooks/cryptography/AESKeys/useEncryptBytesWithAES256';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';
import { toHex } from 'viem';
import {useSignMessageRaw} from '../../../hooks/cryptography/Signing/useSignMessageRaw';
import useHashBytes from '../../../hooks/cryptography/Hashing/useHashBytes';

export default function CreateKey({ setShowCreateKeyModal }) {

    const router = useRouter();

    // 1) Generate Key Pair
    const rsaKeyPair = useGenerateRSAKeyPair();

    // Sign the public key
    const {signature, sign} = useSignMessageRaw(rsaKeyPair.publicRSAKey);

    // 2) Hash the signature with Keccak256
    const hashedSignature = useHashBytes(signature)

    // 3) Encrypt the private key with AES256
    const { encryptedData, iv } = useEncryptBytesWithAES256(hashedSignature, rsaKeyPair.privateRSAKey);

    // 4) Add the key to the blockchain
    const addKey = useAddKeyWithFee(rsaKeyPair.publicRSAKey, encryptedData, iv);

    useEffect(() => {
        if (addKey.isSuccess) {
            setTimeout(() => {
               router.reload()            
           }, 2000);
        }
    }, [addKey.isSuccess]);

    return (
        <div style={{ height: '100%' }}>
            <div className='card-title d-flex justify-content-between' style={{ marginBottom: '5px', borderBottom: '1px solid lightgrey', boxShadow: '0px 3px 10px rgba(0,0,0,0.1)', width: '100%', textAlign: 'center', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
                <div style={{ marginTop: '7px', marginLeft: '20px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px' }}><strong>Isness</strong>  Create Key Pair</span>
                </div>
                <div style={{ marginRight: '25px', marginTop: '7px' }}>
                    <X onClick={() => setShowCreateKeyModal(false)} style={{ height: '20px', cursor: 'pointer' }} />
                </div>
            </div>
            <Row style={{ padding: '15px' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Card.Body>
                        <p>
                            This process will generate a secure RSA key pair for you. The public key can be openly shared and used by others to verify your digital signatures. The private key remains confidential and will be encrypted for additional security before being stored on the blockchain. Ensuring the privacy and security of your RSA keys is of utmost importance.
                        </p>
                        {}
                        {(() =>{
                            if(!rsaKeyPair.privateRSAKey || !rsaKeyPair.publicRSAKey || addKey.isLoading) return <Spinner animation="grow" role="status"> <span className="visually-hidden">Loading...</span> </Spinner>
                            if(rsaKeyPair && !signature) return <Button variant='outline-dark' onClick={async () => await sign()}>1. Sign Key</Button>
                            if(rsaKeyPair && signature) return <Button variant='outline-dark' onClick={() => addKey.write?.()}>2. Generate Key</Button>
                        })()}
                    </Card.Body>
                </Col>
            </Row>
        </div>
    );
}


