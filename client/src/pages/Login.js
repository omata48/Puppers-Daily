import React, { useRef, useState } from "react"
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from "../utils/API";
import { AUTH_SET_LOGGED_IN } from "../utils/actions";
import { useStoreContext } from '../utils/GlobalStore';

function Login() {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const usernameRef = useRef();
    const passwordRef = useRef();
    const [, dispatch] = useStoreContext();

    const handleLogin = (event) => {
        event.preventDefault();
        const loginData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        API.login(loginData).then(response => {
            setShowError(false);
            const { email, username } = response.data;
            console.log(response.data)
            dispatch({
                type: AUTH_SET_LOGGED_IN,
                data: {
                    email,
                    username
                }
            });
        }).catch(err => {
            setShowError(true);
            setErrorMessage("An error occurred during login");
        })
    }

    return <div>
        <Container>
            <Row>
                <Col md={{span: 6, offset:3}} className='pt-5'>
                    <h2>Login</h2>
                    <Form className="signup" onSubmit={handleLogin}>
                        <Form.Group>
                            <Form.Label htmlFor="exampleInputEmail1">Username</Form.Label>
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
                        <Button type="submit" variant='outline-primary'>Login</Button>
                    </Form>
                    <br />
                    <Link to='/signup'>
                        <Button variant='outline-secondary' className='mb-2' size='sm'>Or sign up here</Button>
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

export default Login;