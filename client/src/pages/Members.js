import React from "react";
import {Container, Row, Col, Button, Card, Tab, TabContainer, Nav } from 'react-bootstrap';
import Hero from '../components/Hero'
import { useStoreContext } from '../utils/GlobalStore';
import TimeBlock from "../components/TimeBlock";
import { Link } from "react-router-dom";

function Members(){
    const [state] = useStoreContext();
    const {username, petInformation } = state;

    return <Container className='mb-3'>
    <Row className='justify-content-md-center '>
      <Col md={12}>
        <Hero URL='/images/dog_attentive.jpeg' 
          title={'Welcome '+ username} 
          height={'50vh'}
          color='white'
        />
      </Col> 
    </Row>
    <Row className='justify-content-md-center'>
      <Col md={7}>
        <Button variant='outline-primary' size='lg' block>
          Dinner Time
        </Button>
        <TabContainer id='list-group-tabs' defaultActiveKey='link0'>
          <Row className='my-4'>
            <Col sm={4}>
              <Nav variant='pills'>
                  {
                    petInformation.length > 0
                      ? petInformation.map((pet, key) =>
                      <Nav.Item key={key}>
                        <Nav.Link eventKey={'link'+key}> {pet.name} </Nav.Link>
                      </Nav.Item>
                      )
                      : <Nav.Item key='0'>
                        <Nav.Link eventKey='link0' >No pets currently listed! You should add your puppers</Nav.Link>
                      </Nav.Item>
                  }
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content className='p-2'>
                  {
                    petInformation.length > 0
                      ? petInformation.map((pet, key) =>
                        <Tab.Pane eventKey={'link'+key} key={key}>
                            <h2>{pet.name}</h2>
                            <hr />
                            <p><b>Breed:</b> {pet.breed}</p>
                            <p><b>Age:</b> {pet.age}</p>
                            <p><b>Sex:</b> {pet.sex}</p>
                            <p><b>Notes:</b> {pet.vetRecords}</p>
                        </Tab.Pane>
                      )
                      : <Tab.Pane eventKey='link0' key='0'>No pets currently listed! You should add your puppers</Tab.Pane>
                  }
              </Tab.Content>
            </Col>
          </Row>
        </TabContainer>
        <Link to='/members/add'>
          <Button variant='outline-secondary' size='lg' block>
            Add a dog
          </Button>
        </Link>
        <Button variant='outline-danger' size='lg' block>
          Edit information
        </Button>
      </Col>
      <Col md={5}>
        <Card >
          <Card.Header>CURRENT DAY</Card.Header>
          <TimeBlock hour={'1'} />
          <TimeBlock hour={'2'} />
          <TimeBlock hour={'3'} />
          <TimeBlock hour={'4'} />
          <TimeBlock hour={'5'} />
          <TimeBlock hour={'6'} />
        </Card>
      </Col>
    </Row>
  </Container>
}

export default Members;