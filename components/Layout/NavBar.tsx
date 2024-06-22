import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import { useAccount, useNetwork, useBalance } from 'wagmi';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Nav, Card, Navbar, Row, Col, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import KeysCard from '../Keys/KeysCard/KeysCard';

export default function NavBar() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useBalance({ address: address, watch: true })
  const router = useRouter()

  // NEEDS CHECK FOR IF PUBLIC KEY LOADED IS NOT THE SAME AS SMART CONTRACTS PUBLIC KEY. 
  // IF SO - SET PUBLIC KEY TO SMART CONTRACTS PUBLIC KEY TO SMART CONTRACTS ONE - INFORM THAT PREVIOUS NOTICES WILL NOT BE DECRYPTED WITH THIS ONE. 
  // State to control the visibility of the "View Keys" modal
  const [showViewKeysModal, setShowViewKeysModal] = useState(false);

  return (
    <>
      <Row>
        <Col>
          <Card style={{ zIndex: 2, backgroundColor: 'rgba(0,0,0,0)', boxShadow: '2px 5px 5px 2px rgba(54, 74, 99, 0.00)' }}>
            <Card.Body>
              <Navbar variant="light" style={{ height: '7vh' }}>
                <Container style={{ marginLeft: '10px', marginRight: '10px', width: '100%' }} className="d-flex justify-content-start align-items-center">
                  <Navbar.Brand>
                    <a style={{cursor: 'pointer'}} onClick={() => router.push('/')}>
                      <Image style={{ 'top': '13px' }} src='/assets/images/ISDA.png' width={70} height={70} />
                    </a>
                  </Navbar.Brand>
                  <Nav className="mr-auto" >
                    <Link href="/" passHref>
                      <Nav.Link style={{ color: 'black', fontSize: '15px', fontWeight: 500 }}>Home</Nav.Link>
                    </Link>
                    <Link href="/tools" passHref>
                      <Nav.Link style={{ color: 'black', fontSize: '15px', fontWeight: 500 }}>Tools</Nav.Link>
                    </Link>
                  </Nav>
                </Container>
                <Container style={{ width: '100%' }} className="d-flex justify-content-end align-items-center">
                  <Navbar.Text>
                    <Card style={{ height: '100%', backgroundColor: 'rgba(255,255,255,1)', marginTop: '15px', marginBottom: '10px', boxShadow: '2px 5px 5px 2px rgba(0, 0, 0, 0.1)', borderRadius: '20px' }}>
                      <Card.Body className="d-flex align-items-center" style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                        <Navbar.Brand>
                          <div style={{
                            borderRadius: '50%',
                            overflow: 'hidden',
                            width: '45px',
                            height: '45px',
                            boxShadow: '0px 0px 15px 2px rgba(0,0,0,0.125)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '20px', // Adjust as needed
                            fontWeight: 500 // Adjust as needed
                          }}>
                            {address?.slice(2, 4)}
                          </div>
                        </Navbar.Brand>
                        <Navbar.Text className="ml-2 " style={{ marginLeft: '0px', padding: '0px' }}>
                          <div style={{ borderBottom: '1px solid lightgrey', marginBottom: '5px' }}>
                            Signed in: {address?.slice(0, 7) + '...' + address?.slice(36, 46)}
                          </div>
                          <div>
                            {chain && <>Connected to <strong style={{ fontWeight: 540 }}>{chain.name.toString()}</strong></>}
                          </div>
                        </Navbar.Text>
                      </Card.Body>
                    </Card>
                  </Navbar.Text>
                </Container>
              </Navbar>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
      </div>
      <Modal backdrop={'static'} show={showViewKeysModal} onHide={() => setShowViewKeysModal(false)} style={{ top: '20vh' }}>
        <KeysCard setShowViewKeysModal={setShowViewKeysModal} />
      </Modal>
    </>
  )
}
