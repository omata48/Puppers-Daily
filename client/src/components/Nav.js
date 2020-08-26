import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { useStoreContext } from '../utils/GlobalStore';
import { Nav } from 'react-bootstrap';

function NavbarMod(props) {

    const [state] = useStoreContext();

    const {logout} = props

    return (
        <Navbar 
        bg='dark' expand='sm' variant='dark' className='pb-3'
        >
            <Navbar.Brand>
                <b>Welcome {!state.userLoggedIn ?'Guest!' :state.username+'!'}</b> &nbsp;&nbsp;&nbsp;
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            {!state.userLoggedIn ? (
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto' >
                        <Nav.Item >
                            <Link to="/login">
                                <Nav.Link as="div">Login</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Link to="/signup">
                                <Nav.Link as="div">Signup</Nav.Link>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            ) : (
                // If the user is Logged In
                <Navbar.Collapse>
                    <Nav >
                        <Nav.Item >
                            <Link to="/home">
                                <Nav.Link as="div">Home</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Link to="/members">
                                <Nav.Link as="div">Members</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Link onClick={() => logout()} to="/">
                                <Nav.Link as="div">Logout</Nav.Link>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                )
            }
            
        </Navbar>
    )
}

export default NavbarMod;