import React, { useState, useRef } from "react"
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import API from '../utils/API';
import { useStoreContext } from "../utils/GlobalStore";

function EditPet(){
    const [state] =  useStoreContext();
    const [showError, setShowError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const { petInformation } = state;
    const [currentPet, setcurrentPet] = useState({index: '0',name: petInformation[0].name});
    
    const notesRef = useRef();

    const handleChange = event => {
        const nameChosen = event.target.value
        const idNow = petInformation.map(pet =>  {return pet.name}).indexOf(nameChosen);
        setcurrentPet({
            ...currentPet,
            index: idNow,
            name: nameChosen 
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const petId = petInformation[currentPet.index]
        const petData = {
            petInformation: notesRef.current.value
        };
        // console.log(petData);
        API.updatePet(petId,petData)
            .then(() => {
                window.location.assign('/members')
            })
            .catch(err => {
                setShowError(true);
                setErrorMessage(err);
            })
    }

    const handleDelete = (event) => {
        event.preventDefault();
        const petId = currentPet.index
        API.removePet(petId)
            .then(() => {
                window.location.assign('/members')
            })
            .catch(err => {
                setShowError(true);
                setErrorMessage(err);
            })
    }

    const test = (event) => {
        event.preventDefault();
        console.log(currentPet.name)
    }

    return <div>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className='pt-5'>
                    <h2>Update your doggo</h2>
                    <Form className="signup" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="exampleName">Choose which dog</Form.Label>
                            <Form.Control as='select' className="form-control" onChange={handleChange} >
                            {
                                petInformation.map((pet,key) => 
                                    <option key={key} >{pet.name}</option>
                                )
                            }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleAge">Breed</Form.Label>
                            <Form.Control id="breedInput" type="text" value={petInformation[currentPet.index].breed} disabled /> 
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleAge">Age</Form.Label>
                            <Form.Control id="ageInput" type="number" value={petInformation[currentPet.index].age} disabled /> 
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleSex">Sex</Form.Label>
                            <Form.Control as="select" disabled>
                                <option>{petInformation[currentPet.index].sex} </option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows="3" ref={notesRef} placeholder={petInformation[currentPet.index].vetRecords} />
                        </Form.Group>
                        {/* Alert for error */}
                        <Alert style={{ "display": showError ? "block" : "none" }} id="alert" className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span className="sr-only">Error:</span> <span className="msg">{errorMessage}</span>
                        </Alert>
                        <Button type="submit" variant='outline-primary'>Edit Dog</Button>
                        <Button variant='outline-danger' onClick={handleDelete}>Delete Dog</Button>
                        <Button as='div' variant='outline-warning' onClick={test}>Test</Button>
                    </Form>
                    <br />
                    <a href='/members'>
                        <Button variant='outline-info' size='sm'> {'<<'} Back to previous page</Button>
                    </a>
                </Col>
            </Row>
        </Container>
    </div>
}

export default EditPet;