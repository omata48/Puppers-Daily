import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import { useStoreContext } from '../utils/GlobalStore';

function Navbar(props) {

    const [state] = useStoreContext();

    const {logout} = props

    return (
        <Nav>
            {!state.userLoggedIn ? (
                // if the user is Logged out
                <Nav.Item>
                    <b>Welcome Guest!</b> &nbsp;&nbsp;&nbsp;
                    <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
                </Nav.Item>
            ) : (
                    // If the user is Logged In
                    <Nav.Item>
                        <b>Welcome {state.email}!</b> &nbsp;&nbsp;&nbsp;
                        <Link to="/members">Members</Link> | <a onClick={() => logout()} href="/">Logout</a>
                    </Nav.Item>
                )
            }
            
        </Nav>
    )
}

export default Navbar;