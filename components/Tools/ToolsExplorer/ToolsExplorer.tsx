import React from 'react';
import { Plus } from 'react-feather';
import { Dropdown, Row, Col, Table } from 'react-bootstrap';

export default function ToolsExplorer({ setTab }) {
    const tools = [
        { name: 'Encrypt', description: 'Converts plain text into a non-readable form called ciphertext using a specific algorithm and key.' },
        { name: 'Decrypt', description: 'Converts ciphertext back into readable plain text using the corresponding key and algorithm.' },
    ];

    return (
        <div style={{ height: '100%' }}>
            <div className='card-title d-flex justify-content-between' style={{ marginBottom: '10px', borderBottom: '1px solid lightgrey', boxShadow: '0px 3px 10px rgba(0,0,0,0.1)', width: '100%', textAlign: 'center', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', paddingBottom: '10px' }}>
                <div style={{ textAlign: 'left', marginLeft: '15px', marginTop: '7px' }}>
                    <span style={{ fontSize: '14px' }}><strong>EthKeys</strong> Cryptography Tools</span>
                </div>
            </div>
            <Row style={{ height: '50vh' }}>
                <Col style={{ paddingLeft: '10px' }}>
                    <Table hover size="sm" style={{ marginBottom: '0px', fontSize: '11px' }}>
                        <tbody>
                            {tools.map((tool, index) => (
                                <tr key={index} onClick={() => {setTab(tool.name)}}>
                                    <td>{tool.name}</td>
                                    <td>{tool.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
}
