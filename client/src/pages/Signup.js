import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import API from "../utils/API";
import { AUTH_SET_LOGGED_IN } from "../utils/actions";
import { useStoreContext } from '../utils/GlobalStore';

function Signup() {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const [, dispatch] = useStoreContext();

    const handleSignup = (event) => {
        event.preventDefault();
        const signupData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value
        };
        API.signup(signupData).then(response => {
            const { email, username } = response.data;
            dispatch({
                type: AUTH_SET_LOGGED_IN,
                data: {
                    email,
                    username
                }
            });
        }).catch(() => {
            setShowError(true);
            setErrorMessage("An error occurred while signing up");
        })
    }

    return <div>
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className='pt-5'>
                    <h2>Sign Up Form</h2>
                    <Form className="signup" onSubmit={handleSignup}>
                        <Form.Group>
                            <Form.Label htmlFor="exampleInputEmail1">Email address</Form.Label>
                            <Form.Control type="email" className="form-control" placeholder="Email" ref={emailRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleUsername">Username</Form.Label>
                            <Form.Control type="text" className="form-control" placeholder="Username" ref={usernameRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="exampleInputPassword1">Password</Form.Label>
                            <Form.Control type="password" className="form-control" placeholder="Password" ref={passwordRef} />
                        </Form.Group>
                        <Alert style={{ "display": showError ? "block" : "none" }} id="alert" className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span className="sr-only">Error:</span> <span className="msg">{errorMessage}</span>
                        </Alert>
                        <Button type="submit" variant='outline-primary'>Sign Up</Button>
                    </Form>
                    <br />
                    <Link to='/login'>
                        <Button variant='outline-secondary' className='mb-2' size='sm'>Or log in here</Button>
                    </Link>
                    <br />
                    <Link to='/home'>
                        <Button variant='outline-info' size='sm'> {'<<'} Back to main page</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    </div>
}

export default Signup;