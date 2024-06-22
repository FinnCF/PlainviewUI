import React, { useState } from 'react';
import { Dropdown, Row, Col, Table, Button, Modal, Card } from 'react-bootstrap';
import { Plus } from 'react-feather';
import useGetKeys from '../../../hooks/contracts/ERCKMS1/Read/useGetKeys';
import CreateKey from './CreateKey';
import { Key } from 'react-feather';
import useGetCurrentKey from '../../../hooks/contracts/ERCKMS1/Read/useGetCurrentKey';
import { CryptoContext } from '../../../pages/_app';
import { useContext } from 'react';
import { useAccount } from 'wagmi';

export default function KeysCard({ setTab, chosenKey, setChosenKey }) {

    const { decryptedPrivateRSAKey, publicRSAKey } = useContext(CryptoContext);
    const {address} = useAccount()

    const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
    const getKeys = useGetKeys()
    const currentKey = useGetCurrentKey(address)
    const keys = getKeys?.data

    return (
        <Card>
            <div style={{ height: '100%' }}>
                <div className='card-title d-flex justify-content-between' style={{ marginBottom: '5px', borderBottom: '1px solid lightgrey', boxShadow: '0px 3px 10px rgba(0,0,0,0.1)', width: '100%', textAlign: 'center', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
                    <div style={{ textAlign: 'left', marginLeft: '15px', marginTop: '7px' }}>
                        <span style={{ fontSize: '14px' }}><strong>EthKeys</strong>  Key Management System</span>
                    </div>
                    <Dropdown style={{ marginRight: '25px' }}>
                        <Dropdown.Toggle variant='outline-dark' id="dropdown-basic" style={{ marginBottom: '10px', marginTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                            <Plus style={{ height: '20px' }} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={() => { setShowCreateKeyModal(true) }} variant='outline' style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '5px', width: '150px' }}>Create New Key</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Row style={{ height: 'inherit', overflow: 'auto' }}>
                    <Col style={{ width: 'inherit', height: '61vh' }}>
                        <Table hover style={{ marginBottom: '0px', fontSize: '11px' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Public Key</th>
                                    <th>Encrypted Private Key</th>
                                    <th>Created</th>
                                    <th>Active</th>
                                </tr>
                            </thead>
                            <tbody style={{ overflow: 'auto' }}>
                                {keys?.map((key, index) => {
                                    return (
                                        <tr style={{ backgroundColor: key == chosenKey ? 'rgba(0,0,0,0.05)' : '' }} onClick={() => { setTab('ViewKey'); setChosenKey(key) }}>
                                            <td>{index + 1}</td>
                                            <td>{key.publicRSAKey.slice(0, 10)}...{key.publicRSAKey.slice(-15, -2)}</td>
                                            <td>{key.encryptedPrivateRSAKey.slice(0, 5)}...{key.encryptedPrivateRSAKey.slice(-15, -2)}</td>
                                            <td>{(new Date(Number(key.timestamp) * 1000)).toString().slice(0,25)}</td>
                                            <td>{currentKey?.data?.publicRSAKey == key.publicRSAKey && <Key style={{ height: '18px', marginBottom: '2px', marginLeft: '12px', textAlign: 'center' }} />}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal backdrop={'static'} show={showCreateKeyModal} onHide={() => setShowCreateKeyModal(false)} style={{ top: '30vh'}}>
                    <CreateKey setShowCreateKeyModal={setShowCreateKeyModal} />
                </Modal>
            </div>

        </Card>
    );
}


