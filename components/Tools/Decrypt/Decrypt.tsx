import React, { useState } from 'react';
import { Card, Row, Col, Button, FormControl } from 'react-bootstrap';
import { X } from 'react-feather';
import { CryptoContext } from "../../../pages/_app"; // Make sure to import the correct path to your context
import { useContext } from "react";
import useDecryptBytesWithPrivateRSAKey from '../../../hooks/cryptography/RSAKeys/useDecryptBytesWithPrivateRSAKey';
import useHexToBytes from '../../../hooks/misc/useHexToBytes';
import useBytesToString from '../../../hooks/misc/useBytesToString';
import { IV_Bits, AES_Bits, RSA_Bits } from '../../../constants/cryptography';
import { useDecryptBytesWithAES256 } from '../../../hooks/cryptography/AESKeys/useDecryptBytesWithAES256';

export default function Decrypt({ setTab }) {

    const { rsaKeys } = useContext(CryptoContext);

    const [enteredEncryptedText, setEnteredEncryptedText]: any = useState('');
    const enteredEncryptedTextBytes = useHexToBytes(enteredEncryptedText)

    const extractedEncryptedAESKey = enteredEncryptedTextBytes?.subarray(0, RSA_Bits / 8);
    const extractedIv = enteredEncryptedTextBytes?.subarray(RSA_Bits / 8, RSA_Bits / 8 + IV_Bits / 8);
    const extractedEncryptedData = enteredEncryptedTextBytes?.subarray(RSA_Bits / 8 + IV_Bits / 8);

    //Decrypt AES Key thats encrypted with RSA Private Key
    const decryptedAESKey = useDecryptBytesWithPrivateRSAKey(extractedEncryptedAESKey, rsaKeys.decryptedPrivateRSAKey );

    //Decrypting the enteredEncryptedText with the decrypted AES Key
    const decryptedTextBytes = useDecryptBytesWithAES256(extractedEncryptedData, extractedIv, decryptedAESKey);

    //Converting the decrypted bytes to string
    const decryptedText = useBytesToString(decryptedTextBytes)

    const handleTextChange = (e) => {
        setEnteredEncryptedText(e.target.value);
    };

    return (
        <Card style={{ marginRight: '20px', height: '100%' }}>
            <Col style={{ marginLeft: '20px', marginRight: '20px', textAlign: 'justify' }}>
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', paddingRight: '5px' }}>
                        <X onClick={() => { setTab(''); }} style={{ cursor: 'pointer' }} />
                    </Col>
                </Row>
                <Row>
                    <Card.Title style={{ marginBottom: '0px', textAlign: 'center' }}>
                        <div>
                            Decrypt
                        </div>
                    </Card.Title>
                    <div style={{marginLeft: '15px'}}>
                    Using active key
                    </div>
                </Row>
                <Card.Body>
                    <div style={{ fontSize: '15px', marginLeft: '5px', paddingBottom: '0px' }}>
                        Encrypted Hex Text
                    </div>
                    <FormControl
                        as="textarea"
                        style={{ borderRadius: '0px', borderColor: 'lightgray', height: '20vh', resize: 'none', marginBottom: '10px' }}
                        value={enteredEncryptedText}
                        onChange={handleTextChange}
                        placeholder="Enter your encrypted text here..."
                    />
                    <div style={{ fontSize: '15px', marginLeft: '5px', paddingBottom: '0px' }}>
                        Text
                    </div>
                    <div style={{ border: '1px solid lightgrey', padding: '10px', position: 'relative', minHeight: '20vh', maxHeight: '20vh', overflowY: 'auto' }}>
                        {decryptedText}
                    </div>
                </Card.Body>
            </Col>
        </Card>
    );
}
