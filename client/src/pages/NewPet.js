import React, { useRef, useState, useEffect } from "react"
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import API from '../utils/API';
import useDebounce from "../utils/debounceHook";
import { useStoreContext } from "../utils/GlobalStore";
import { USER_PET } from "../utils/actions";


function NewPet(){
    const [state,dispatch] =  useStoreContext();
    const [showError, setShowError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [breeds, setBreeds] = useState([]);
    const [search, setSearch] = useState("");

    const nameRef = useRef();
    const ageRef = useRef();
    const sexRef = useRef();
    const breedRef = useRef();
    const recordsRef = useRef();

    const debounceSearchTerm = useDebounce(search,500);
    
    useEffect(() => {
        if (!debounceSearchTerm){
            return;
        }
        if (debounceSearchTerm) {
            API.getBreeds(debounceSearchTerm)
                .then(res => {
                    // console.log(res.data);
                    // set breeds
                    setBreeds(res.data);
                })
                .catch((err)=> {
                    setShowError(true);
                    setErrorMessage(err);
                });
        }
    }, [debounceSearchTerm]);

    const handleChange = event => {
        setSearch(event.target.value);
    }

    const handleSignup = (event) => {
        event.preventDefault();
        const petData = {
            name: nameRef.current.value,
            breed: breedRef.current.value,
            age: ageRef.current.value,
            sex: sexRef.current.value,
            vetRecords: recordsRef.current.value,
        };
        // console.log(petData);
        API.addPet(petData)
            .then((petAdded) => {
                console.log(petAdded)
                // concat new pet to previous array
                var joined = state.petInformation.concat(petAdded)
                dispatch({
                    type: USER_PET,
                    data: {
                        petInformation: joined
                    }
                })
            })
            .catch(err => {
                setShowError(true);
                setErrorMessage(err);
            })
        
        nameRef.current.value = '';
        breedRef.current.value = '';
        ageRef.current.value = '';
        sexRef.current.value = '';
        recordsRef.current.value ='';
    }

    return <div>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className='pt-5'>
                    <h2>Add your doggo</h2>
                    <Form className="signup" onSubmit={handleSignup}>
                        <Form.Group>
                            <Form.Label htmlFor="exampleName">Name</Form.Label>
                            <Form.Control type="text" className="form-control" placeholder="Name" ref={nameRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleUsername">Age</Form.Label>
                            <Form.Control id="ageInput" type="number" ref={ageRef} min='0' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleInputPassword1">Sex</Form.Label>
                            <Form.Control as="select" ref={sexRef}>
                                <option value={null}>N/a</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleInputPassword1">Breed</Form.Label>
                            <input list='breeds' type='text' onChange={handleChange} className='custom-select custom-select-sm' size={3} ref={breedRef} />
                            <datalist id='breeds' >
                                {breeds.map((breed,key) =>
                                    <option key={key} value={breed} />    
                                )}
                            </datalist>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Notes" ref={recordsRef} />
                        </Form.Group>
                        {/* Alert for error */}
                        <Alert style={{ "display": showError ? "block" : "none" }} id="alert" className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span className="sr-only">Error:</span> <span className="msg">{errorMessage}</span>
                        </Alert>
                        <Button type="submit" variant='outline-primary'>Add Dog</Button>
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

export default NewPet;