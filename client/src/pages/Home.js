import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Hero from '../components/Hero';

function Home() {

    return (
        <>
        <Hero title="Puppy Time" subtitle="Hello" URL="https://via.placeholder.com/400x300" />
        <Container>
            <Row className='justify-content-md-center'>
                <Col sm={8}>
                    <Card>
                        <Card.Header as="h1">Features!</Card.Header>
                        {/* Can turn this into a nav with tabs <Nav variant='tabs'> */}
                        <Card.Body>
                            <Card.Title>Track medical records</Card.Title>
                            <Card.Text>
                                If you are tired of having medical records scattered all over the house, this application will provide a secure location to keep the crucial information of these records.
                                Unsure when your puppy recived their last vaccine? If you keep a record of them on this site, they will always be available.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Button variant='secondary' size='lg' href='/signup' block>
                        Sign up now
                    </Button>
                    <Button variant='secondary' size='lg' href='/login' block>
                        Log in here
                    </Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;