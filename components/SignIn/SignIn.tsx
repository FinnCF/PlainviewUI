import { Button } from 'react-bootstrap'
import React from 'react';
import useGetCurrentKey from '../../hooks/contracts/ERCKMS1/Read/useGetCurrentKey';
import { useContext } from 'react';
import { CryptoContext } from '../../pages/_app';
import useDecryptKey from '../../hooks/cryptography/ERCKMSKeys/useDecryptKey';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CreateKey from '../Keys/KeysCard/CreateKey';
import { useAccount } from 'wagmi';
import { hexToBytes } from 'viem';

export default function SignIn() {

    const { address } = useAccount()
    const { rsaKeys, setRSAKeys } = useContext(CryptoContext);
    const { data, error, isError, isLoading, isSuccess } = useGetCurrentKey(address);
    const { signMessage, encryptedPrivateRSAKey, decryptedPrivateRSAKey, publicRSAKey } = useDecryptKey(data?.publicRSAKey, data?.encryptedPrivateRSAKey, data?.iv)

    useEffect(() => {
        if (decryptedPrivateRSAKey) {
            setRSAKeys({ 
                decryptedPrivateRSAKey: decryptedPrivateRSAKey, 
                encryptedPrivateRSAKey: encryptedPrivateRSAKey, 
                publicRSAKey: publicRSAKey 
            });
        }
    }, [decryptedPrivateRSAKey, encryptedPrivateRSAKey, publicRSAKey]);

    const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);

    return (
        <div className="row" style={{ position: 'absolute', width: '100%', top: '35%' }}>
            <div className="col-4">
            </div>
            <div className="col-4">
                <div className="card">
                    {error?.message.toString().slice(74).startsWith("No keys found") &&
                        <div className="card-body">
                            <div className="card-title" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                No Keys Found
                            </div>
                            <div className="card-body" style={{ textAlign: 'center' }}>
                                Signed in as {address}
                            </div>           
                            <div className="card-body" style={{ textAlign: 'center' }}>
                                This application requires that you generate an Isness Key Pair. Upon pressing the below button, you will be prompted to generate and store key pair on the blockchain for this account.
                            </div>
                            <div className="card-body" style={{ textAlign: 'center' }}>
                                <Button onClick={() => { setShowCreateKeyModal(true) }} variant='outline' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '5px', width: '150px' }}>Generate Key Pair</Button>
                            </div>
                        </div>}
                    {isSuccess &&
                        <div className="card-body">
                             <div className="card-title" style={{ textAlign: 'center', marginBottom: '10px' }}>
                                Unlock Key
                            </div>
                            <div className="card-body" style={{ textAlign: 'center' }}>
                                Signed in as {address}
                            </div> 
                            <div className="card-body" style={{ textAlign: 'center' }}>
                                The following application requires that you sign in with your private key. Upon pressing the below button, you will be prompted to sign your key - to prove your identity.
                            </div>
                            <div className="card-body" style={{ textAlign: 'center' }}>
                                <Button onClick={async () => await signMessage.sign?.()} variant='outline-dark' style={{ textAlign: 'center' }}>Verify Identity</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Modal backdrop={'static'} show={showCreateKeyModal} onHide={() => setShowCreateKeyModal(false)} style={{ top: '30vh'}}>
                <CreateKey setShowCreateKeyModal={setShowCreateKeyModal} />
            </Modal>
        </div>
    )
}