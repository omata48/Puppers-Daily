import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Hero from '../components/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBone } from '@fortawesome/free-solid-svg-icons'


function Home() {

    return (
        <>
        <Hero title="Your Daily Dose of Dogs" 
            // URL="https://placedog.net/640?random" 
            URL="https://placedog.net/640" 
            height={'75vh'} 
        />
        <Container className='mb-3'>
            <Row className='justify-content-md-center'>
                <Col sm={9} className='mb-3'>
                    <Card>
                        <Card.Header className='text-center' as="h1"><FontAwesomeIcon icon={faBone} /> Features <FontAwesomeIcon icon={faBone} /></Card.Header>
                        {/* Can turn this into a nav with tabs <Nav variant='tabs'> */}
                        <Card.Body>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Card.Title as='h2'>Keep track of your dogs</Card.Title>
                                    <Card.Text>
                                        Do you have multiple dogs? Make each puppy an online profile to easily have all your dogs information in one place!
                                        Information you can store are the:
                                        {<ul>
                                            <li>Name</li>
                                            <li>Breed</li>
                                            <li>Age</li>
                                            <li>Sex</li>
                                            <li>And any notes</li>
                                        </ul>} All of this information will be saved to your personal account!
                                    </Card.Text>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Card.Title as='h2'>Dinner Time!!!</Card.Title>
                                    <Card.Text>
                                        {<p>With a busy life, do you forget at what time you last fed your dogs? Is it time for a treat or a full dinner?</p>} 
                                        {<p> Use this application in order to help with keeping track of at what time you fed your dogs today.  
                                        Keep track of food given to them without worrying about having to remove meals given every day.</p>}  
                                        {<p>If you add a meal by accident, you can always remove the food given to them with the click of a button.</p>}
                                    </Card.Text>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3}>
                    <Link to='/signup' style={{textDecoration:'none'}}>
                        <Button className='mb-3' variant='secondary' size='lg' block>
                            Sign up now
                        </Button>
                    </Link>
                    <Link to='/login' style={{textDecoration:'none'}}>
                        <Button className='mb-3' variant='secondary' size='lg' block>
                            Log in here
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;