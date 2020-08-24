import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { useStoreContext } from '../utils/GlobalStore';
import { Nav } from 'react-bootstrap';

function NavbarMod(props) {

    const [state] = useStoreContext();

    const {logout} = props

    return (
        <Navbar  >
            {!state.userLoggedIn ? (
                // if the user is Logged out
                <>
                    <Navbar.Brand>
                        <b>Welcome Guest!</b> &nbsp;&nbsp;&nbsp;
                    </Navbar.Brand>
                    <Nav variant='pills' className='mr-auto' >
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
                </>
            ) : (
                // If the user is Logged In
                <>
                    <Navbar.Brand>
                        <b>Welcome {state.email}!</b> &nbsp;&nbsp;&nbsp;
                    </Navbar.Brand>
                    <Nav variant="pills" className='mr-auto'>
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
                </>
                )
            }
            
        </Navbar>
    )
}

export default NavbarMod;