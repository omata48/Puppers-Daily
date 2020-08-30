import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Card, Tab, TabContainer, Nav, Modal, Form, ListGroup, Alert } from 'react-bootstrap';
import Hero from '../components/Hero'
import { useStoreContext } from '../utils/GlobalStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Food from '../utils/LocalStorage'
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment';

function Members() {
  const currentDay = moment().format('L');
  const [state] = useStoreContext();
  const [show, setShow] = useState(false);
  const [food, setFood] = useState([]);
  const [foodIndexDeleting, setFoodIndexDeleting] = useState('');
  const [foodError, setFoodError] = useState(false);
  const [foodAdded, setFoodAdded] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [date, setDate] = useState(currentDay);

  const foodnameRef = useRef();
  const sizeRef = useRef();

  useEffect(() => {
    setDate(currentDay);
    setFood(Food.getMealFed(date));
  }, [currentDay,date])

  useEffect(() => {
    
  })

  const handleClose = () => {
    setShow(false);
    setFoodAdded(false);
    setFoodError(false);
  }
  const handleConfirmClose = () => {
    setConfirm(false);
  }
  const handleShow = () => setShow(true)
  const handleConfirmShow = (event) => {
    setFoodIndexDeleting(event.target.id)
    setConfirm(true)
  }

  const handleFood = () => {
    try{
      if (foodnameRef.current.value.trim() === ''){
        // alert empty string and return no add
        setFoodError(true)
        return
      }
      setFoodError(false)
      var fedItem = {
        size: (sizeRef.current.value).toLowerCase(),
        food: foodnameRef.current.value,
        time: moment().format('LT')
      }
      var join = food.concat(fedItem)
      setFood(join);
      Food.setMealFed(date,join);
      setFoodAdded(true)
    }
    catch(err){
      console.log(err)
    }
  }

  const deleteFood = () => {
    var copyMeals = [...food];
    const newMeals = copyMeals.filter((meal,index) => {
      return index !== parseInt(foodIndexDeleting)
    })
    console.log(newMeals)
    Food.deleteMealFed(date,newMeals);
    setFood(Food.getMealFed(date));
    setConfirm(false);
  }

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
        {
          petInformation.length > 0 &&
          <Link to='/members/edit'>
            <Button className='mt-2' variant='outline-info' size='lg' block>
              Edit information
            </Button>
          </Link>
        }
      </Col>
      <Col md={5} className='mb-3'>
        <Card>
          <Card.Header as='h2' className="text-center"><Moment format='dddd, MMMM Do YYYY'></Moment></Card.Header>
          <ListGroup>
          {
            food.length > 0
            ?
            food.map((fed,key) =>
              <ListGroup.Item key={key} className='text-align center'>
                <span className='py-0 pl-0 pr-1 col-xs-8 col-sm-8 col-md-10 col-lg-10 col-xlg-10'>Fed {fed.size} of {fed.food} at {fed.time}</span>
                <button id={key} className='col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xlg-2 btn btn-danger float-right' as='button' onClick={handleConfirmShow}>
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
        <Alert style={{ "display": foodError ? "block" : "none" }} id="alert" className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span className="sr-only">Error:</span> <span className="msg">Name of food should not be empty</span>
        </Alert>
        <Alert style={{ "display": foodAdded ? "block" : "none" }} id="alert" className="alert alert-success" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span className="sr-only">Success:</span> <span className="msg">Added food successfully!</span>
        </Alert>
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
    <Modal id='confirmDelete' show={confirm} onHide={handleConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure you want to delete?</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmClose}>
            No
          </Button>
          <Button variant="danger" onClick={deleteFood}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
  </Container>
}

export default Members;