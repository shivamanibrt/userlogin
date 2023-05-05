import { signOut } from 'firebase/auth';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../Components/Firebase/firebaseConfig';
import { setUser } from '../Redux/userSlice';


const HeaderFile = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const handelOnLogout = () => {
        signOut(auth).then(() => {
            dispatch(setUser({}));
            toast.success('user loged out');
        });
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand href="/" className="text-warning fw-bolder">
                        <i className="fa-solid fa-money-bill-1-wave "></i> Mgmt
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto fs-4">
                            {user?.uid ? (
                                <>
                                    <Nav.Link as={Link} to="logout" onClick={handelOnLogout}>
                                        <i className='fa-solid fa-user-pen fs-5' title='User'> Logout </i>
                                    </Nav.Link>
                                </>) : (
                                <> <Nav.Link as={Link} to="/">
                                    <i className='fa-solid fa-right-to-bracket fs-5' title='Login'> Login </i>
                                </Nav.Link>
                                    <Nav.Link as={Link} to="register">
                                        <i className='fa-solid fa-user-pen fs-5' title='User'> Register </i>
                                    </Nav.Link>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div >
    )
}
export default HeaderFile;