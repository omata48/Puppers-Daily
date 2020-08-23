import React from "react";
import {Container, Row, Col, Button, Card } from 'react-bootstrap';
import Hero from '../components/Hero'
import { useStoreContext } from '../utils/GlobalStore';
import TimeBlock from "../components/TimeBlock";

function Members(){
    const [state] = useStoreContext();
    // Change to Username when updated
    const {email} = state;
    

    return <Container>
    <Row className='justify-content-md-center '>
      <Col md={9}>
        <Hero URL='https://via.placeholder.com/400' 
          title={'Welcome '+ email} 
          subtitle='Here is an overview of your puppy' 
        />
      </Col> 
    </Row>
    <Row className='justify-content-md-center'>
      <Col md={7}>
        <Button variant='outline-primary' size='lg' block>
          Dinner Time
        </Button>
        <Button variant='outline-secondary' size='lg' block>
          Add a dog
        </Button>
        <Button variant='outline-danger' size='lg' block>
          Edit information
        </Button>
      </Col>
      <Col md={5}>
        <Card className='p-2'>
          <Card.Header>CURRENT DAY</Card.Header>
          <Card.Text>Words in a Card asdfasdfasdfasdfa sdfas dfas fasd fasdfasdfasfasf</Card.Text>
          <TimeBlock hour={'1'} />
        </Card>
      </Col>
    </Row>
  </Container>
}

export default Members;