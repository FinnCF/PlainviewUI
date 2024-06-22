import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { X, Eye } from 'react-feather';
import useDecryptKey from '../../../hooks/cryptography/ERCKMSKeys/useDecryptKey';
import useBytesToHex from '../../../hooks/misc/useBytesToHex';

export default function ViewKey({ chosenKey, setTab }) {

    console.log(chosenKey)

    const { signMessage, decryptedPrivateRSAKey, publicRSAKey } = useDecryptKey(chosenKey?.publicRSAKey, chosenKey?.encryptedPrivateRSAKey, chosenKey?.iv)
    const decryptedPrivateRSAKeyHex = useBytesToHex(decryptedPrivateRSAKey)

    useEffect(() => {
        signMessage.reset();
    }, [chosenKey]);

    return (
        <Card style={{ marginRight: '20px', height: '67.8vh' }}>
            <Col style={{ marginLeft: '20px', marginRight: '20px', textAlign: 'justify', fontSize: '11px' }}>
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', paddingRight: '5px' }}>
                        <X onClick={() => { setTab(''); }} style={{ cursor: 'pointer' }} />
                    </Col>
                </Row>
                <Row>
                    <Card.Title style={{ marginBottom: '0px', textAlign: 'center' }}>
                        <div>
                            Key Details
                        </div>
                    </Card.Title>
                </Row>
                <Card.Body>
                    <div style={{ fontSize: '15px', marginLeft: '5px', paddingBottom: '0px' }}>
                        Public Key
                    </div>
                    <div style={{ border: '1px solid lightgrey', padding: '10px', marginBottom: '10px', minHeight: '20vh', maxHeight: '20vh', overflowY: 'auto' }}>
                        {chosenKey?.publicRSAKey}
                    </div>
                    <div style={{ fontSize: '15px', marginLeft: '5px', paddingBottom: '0px' }}>
                        Private Key {signMessage.isSuccess ? '(Decrypted)' : '(Encrypted)'}
                    </div>
                    <div style={{ border: '1px solid lightgrey', padding: '10px', position: 'relative', maxHeight: '23vh', overflowY: 'auto' }}>
                        {
                            signMessage.signature ?
                                decryptedPrivateRSAKeyHex
                                :
                                chosenKey?.encryptedPrivateRSAKey
                        }
                    </div>
                </Card.Body>
                <Card.Body style={{ textAlign: 'center', marginBottom: '0px', marginTop: '0px', paddingBottom: '0px' }}>
                    <Button onClick={() => signMessage.sign?.()} variant='outline-dark'>Decrypt</Button>
                </Card.Body>
            </Col>
        </Card>
    );
}
