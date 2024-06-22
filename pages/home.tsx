import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs-dist/build/pdf.worker.min.js';
import TabTitle from '../components/Head/Head';
import KeysCard from '../components/Keys/KeysCard/KeysCard';
import ViewKey from '../components/Keys/ViewKey/ViewKey';

export default function Home() {

  const [tab, setTab] = useState('');
  const [chosenKey, setChosenKey] = useState(null);

  return (
    <>
      <TabTitle title={"EthKeys | Key Manager"} />
      <Row style={{ width: '100vw', marginTop: '5vh' }}>
        <Col style={{height: 'inherit'}} md='1'>
        </Col>
        <Col md='5'>
          <KeysCard setTab={setTab} chosenKey={chosenKey} setChosenKey={setChosenKey} />
        </Col>
        <Col md='5'>
          {tab === 'ViewKey' && <ViewKey chosenKey={chosenKey} setTab={setTab} />}
        </Col>
      </Row>
    </>
  );
}






