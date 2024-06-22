import React, { useState } from 'react';
import { Card, Row, Col, Button, FormControl, InputGroup, Form, Spinner } from 'react-bootstrap';
import { Home, X } from 'react-feather';
import { CryptoContext } from "../../../pages/_app"; // Make sure to import the correct path to your context
import { useContext } from "react";
import useEncryptBytesWithPublicRSAKey from '../../../hooks/cryptography/RSAKeys/useEncryptBytesWithPublicRSAKey';
import useBytesToHex from '../../../hooks/misc/useBytesToHex';
import useStringToBytes from '../../../hooks/misc/useStringToBytes';
import useGetCurrentKey from '../../../hooks/contracts/ERCKMS1/Read/useGetCurrentKey';
import useHexToBytes from '../../../hooks/misc/useHexToBytes';
import { Check, UserX, UserCheck, AlertCircle } from 'react-feather'
import { useAccount } from 'wagmi';
import useEncryptBytesWithRandomAES256 from '../../../hooks/cryptography/AESKeys/useEncryptBytesWithRandomAES256';

export default function Encrypt({ setTab }) {

    const [enteredText, setEnteredText] = useState('');
    const enteredTextBytes = useStringToBytes(enteredText)
    const { address, isConnecting, isReconnecting, isConnected } = useAccount()
    const [ethereumAddress, setEthereumAddress] = useState(address);

    // Retrieviing public RSA Key
    const { data, error, isError, isLoading, isSuccess } = useGetCurrentKey(ethereumAddress);
    const publicRSAKeyBytes = useHexToBytes(data?.publicRSAKey);

    // Encrypting the enteredText with a random AES Key
    const encryptedText = useEncryptBytesWithRandomAES256(enteredTextBytes);

    // Encrypting the AES Key with the public key
    const encryptedAESKey = useEncryptBytesWithPublicRSAKey(publicRSAKeyBytes, encryptedText?.aesKey);

    let hybrid_encrypted_data = new Uint8Array(0)
    if (encryptedAESKey && encryptedText?.iv && encryptedText?.encryptedData) {
        const totalLength = encryptedAESKey.length + encryptedText.iv.length + encryptedText.encryptedData.length;
        hybrid_encrypted_data = new Uint8Array(totalLength);
        hybrid_encrypted_data.set(encryptedAESKey, 0);
        hybrid_encrypted_data.set(encryptedText.iv, encryptedAESKey.length);
        hybrid_encrypted_data.set(encryptedText.encryptedData, encryptedAESKey.length + encryptedText.iv.length);
    }
    const hybrid_encrypted_data_hex = useBytesToHex(hybrid_encrypted_data)
    const isNoKey = error?.message.toString().slice(74).startsWith("No keys found")


    const handleTextChange = (e) => {
        setEnteredText(e.target.value);
    };

    return (
        <Card style={{ marginRight: '20px', height: '100%' }}>
            <Col style={{ marginLeft: '20px', marginRight: '20px', textAlign: 'justify' }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                    <Col xs={4} md={4} style={{ textAlign: 'center' }}>
                    </Col>
                    <Col xs={4} md={4} style={{ textAlign: 'center'}}>
                        <Card.Title style={{ marginBottom: '0px' }}>
                            Encrypt
                        </Card.Title>
                    </Col>
                    <Col xs={4} md={4}>
                        <div style={{textAlign: 'right'}}>
                        <X onClick={() => { setTab(''); }} style={{ cursor: 'pointer' }} />
                        </div>
                    </Col>
                </Row>
                <Card.Body>
                    <div style={{ fontSize: '15px', marginLeft: '5px', paddingBottom: '0px' }}>
                        Recipient Ethereum Address
                    </div>
                    <InputGroup className="mb-3" style={{ top: '4px' }}>
                        <>
                            <InputGroup.Text style={{ padding: '0px' }}>
                                <Button variant="none" >
                                    {address ?
                                        <Home style={{ padding: '0px', margin: '0px' }} onClick={() => { setEthereumAddress(address); setEnteredText('') }} size={15} />
                                        :
                                        <Spinner animation="grow" style={{ height: '15px', width: '15px' }} />
                                    }
                                </Button>
                            </InputGroup.Text>
                            <Form.Control
                                value={ethereumAddress}
                                onChange={(e) => { setEthereumAddress(e.target.value);; setEnteredText('') }}
                                style={{ height: "30px", fontSize: "11px" }}
                                placeholder={"Enter Ethereum Address..."}
                            />
                            <InputGroup.Text style={{ padding: '0px', backgroundColor: 'white', paddingRight: '10px', paddingLeft: '10px' }}>
                                {data?.publicRSAKey && <UserCheck style={{ height: '15px' }} />}
                                {isLoading && <Spinner animation="grow" style={{ height: '15px', width: '15px' }} />}
                                {isNoKey && <UserX style={{ height: '15px' }} />}
                                {!isSuccess && <AlertCircle style={{ height: '15px' }} />}
                            </InputGroup.Text>
                        </>
                    </InputGroup>
                    <div style={{ fontSize: '15px', marginLeft: '5px', paddingBottom: '0px' }}>
                        Text
                    </div>
                    <FormControl
                        as="textarea"
                        disabled={!data?.publicRSAKey}
                        style={{ borderRadius: '0px', borderColor: 'lightgray', height: '10vh', resize: 'none', marginBottom: '10px' }}
                        value={enteredText}
                        onChange={handleTextChange}
                        placeholder="Enter your text here..."
                    />
                    <div style={{ fontSize: '15px', marginLeft: '5px', paddingBottom: '0px' }}>
                        Encrypted Text
                    </div>
                    <div style={{ border: '1px solid lightgrey', padding: '10px', marginBottom: '10px', position: 'relative', minHeight: '30vh', maxHeight: '30vh', overflowY: 'auto' }}>
                        {hybrid_encrypted_data_hex}
                    </div>
                </Card.Body>
            </Col>
        </Card>
    );
}
