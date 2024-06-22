import React, { useState } from 'react';
import { X } from 'react-feather';
import { Dropdown, Row, Col, Table, Button } from 'react-bootstrap';

export default function AddressSender({ setTabRight }) {

    return (
        <div style={{ height: '100%' }}>
            <div className='card-title d-flex justify-content-between' style={{ marginBottom: '5px', borderBottom: '1px solid lightgrey', boxShadow: '0px 3px 10px rgba(0,0,0,0.1)', width: '100%', textAlign: 'center', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
                <div style={{ textAlign: 'left', marginLeft: '15px', marginTop:'7px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px' }}><strong>EthKeys</strong>  Address Book</span>
                </div>
                <X style={{marginTop: '10px', marginRight: '10px', marginLeft: '10px'}} onClick={() => setTabRight('')}/>
            </div>
            <Row style={{ height: '50vh' }}>
                <Col >
                    <Table hover size="sm" style={{ marginBottom: '0px' }}>
                        <tbody>
                            {[].map((file) => (
                                <tr>
                                    <td>{file.title}</td>
                                    <td>{file.blockNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-center', justifyContent: 'flex-center' }}>
                        <Button>Hey</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
