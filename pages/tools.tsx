import Head from 'next/head';
import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs-dist/build/pdf.worker.min.js';
import TabTitle from '../components/Head/Head';
import ToolsExplorer from '../components/Tools/ToolsExplorer/ToolsExplorer';
import Decrypt from '../components/Tools/Decrypt/Decrypt';
import Encrypt from '../components/Tools/Encrypt/Encrypt';

export default function Tools() {

    const [tab, setTab] = useState('');

    return (
        <>
            <TabTitle title={"EthKeys | Tools"} />
            <Row style={{ width: '100vw', height: '35vw', marginTop: '5vh' }}>
                <Col md='1'>
                </Col>
                <Col md='4'>
                    <Card style={{ height: '100%' }}>
                        <ToolsExplorer setTab={setTab} />
                    </Card>
                </Col>
                <Col md='6'>
                    {tab == 'Encrypt' && <Encrypt setTab={setTab} />}
                    {tab == 'Decrypt' && <Decrypt setTab={setTab} />}
                </Col>
            </Row>
        </>
    );
}








