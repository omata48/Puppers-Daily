import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Card, Tab, TabContainer, Nav, Modal, Form, ListGroup } from 'react-bootstrap';
import Hero from '../components/Hero'
import { useStoreContext } from '../utils/GlobalStore';
import TimeBlock from "../components/TimeBlock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment';

function Members() {
  const [state] = useStoreContext();
  const [show, setShow] = useState(false);
  const [food, setFood] = useState([]);

  const foodnameRef = useRef();
  const sizeRef = useRef();

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleFood = () => {
    try{
      var fedItem = {
        size: (sizeRef.current.value).toLowerCase(),
        food: foodnameRef.current.value,
        time: moment().format('LT')
      }
      var join = food.concat(fedItem)
      console.log(join)
      setFood(join)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {

  }, [food])

  const { petInformation } = state;

  return <Container className='mb-3'>
    <Row className='justify-content-md-center '>
      <Col md={12}>
        <Hero URL='/images/dog_attentive.jpeg'
          title={'Welcome to your page'}
          height={'50vh'}
          color='white'
        />
      </Col>
    </Row>
    <Row className='justify-content-md-center'>
      <Col md={7} className='mb-3'>
        {
          petInformation.length > 0 &&
          <Button variant='outline-primary' size='lg' onClick={handleShow} block>
            Dinner Time
          </Button>
        }
        <TabContainer id='list-group-tabs' defaultActiveKey='link0'>
          <Row className='my-4'>
            <Col sm={4}>
              <Nav variant='pills' className='flex-column' defaultActiveKey='link0'>
                {
                  petInformation.length > 0
                    ? petInformation.map((pet, key) =>
                      <Nav.Item key={key}>
                        <Nav.Link eventKey={'link' + key} key={pet.id}> {pet.name} </Nav.Link>
                      </Nav.Item>
                    )
                    : <Nav.Item key='0'>
                      <Nav.Link eventKey='link0' >No pet :(</Nav.Link>
                    </Nav.Item>
                }
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content className='p-2'>
                {
                  petInformation.length > 0
                    ? petInformation.map((pet, key) =>
                      <Tab.Pane eventKey={'link' + key} key={pet.id}>
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
      <Col md={5} className='mb-3'>
        <Card>
          <Card.Header as='h3' className="text-center"><Moment format='dddd, MMMM Do YYYY'></Moment></Card.Header>
          <ListGroup>
          {
            food.length > 0
            ?
            food.map((fed,key) =>
              <ListGroup.Item key={key} className='text-align center'>
                <p xs={9}>Fed {fed.size} of {fed.food} at {fed.time}</p>
                <button xs={2} as='button' className='btn btn-danger'>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </ListGroup.Item>
            )
            :
              <ListGroup.Item key='0' className='text-center'>Have not fed the puppers yet</ListGroup.Item>
          }
          </ListGroup>
        </Card>
      </Col>
    </Row>
    <Modal id='foodModal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Food time!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Meal or Snack?</Form.Label>
            <Form.Control as='select' ref={sizeRef}>
              <option>Meal</option>
              <option>Snack</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name of food:</Form.Label>
            <Form.Control type='text' className='form-control' placeholder='Food Name' ref={foodnameRef}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFood}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </Container>
}

export default Members;