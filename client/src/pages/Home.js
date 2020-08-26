import React from 'react';
import { Card, Container, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Hero from '../components/Hero';

function Home() {

    return (
        <>
        <Hero title="Puppy Time" 
            // URL="https://placedog.net/640?random" 
            URL="https://placedog.net/640" 
            height={'75vh'} 
        />
        <Container className='mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm={8} className='mb-3'>
                    <Card>
                        <Card.Header as="h1">Features!</Card.Header>
                        {/* Can turn this into a nav with tabs <Nav variant='tabs'> */}
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Card.Title>Keep Track of your dogs</Card.Title>
                                    <Card.Text>
                                        Do you have multiple dogs that you want to have an online record for? Make an online profile to easily share your puppies with others!
                                        Enter your pets name, breed, age, sex, and any notes about them to save to your account!
                                    </Card.Text>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Card.Title>Dinner Time!!!</Card.Title>
                                    <Card.Text>
                                        With a busy life, do you forget if you have fed your dogs or how much you have fed them? Use this application in order to help with keeping track of at what time you fed your dogs today. 
                                    </Card.Text>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Card.Title>Track medical records</Card.Title>
                                    <Card.Text>
                                        If you are tired of having medical records scattered all over the house, this application will provide a secure location to keep the crucial information of these records.
                                        Unsure when your puppy recived their last vaccine? If you keep a record of them on this site, they will always be available.
                                    </Card.Text>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='mb-3'>
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