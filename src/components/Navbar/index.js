// library imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// component imports
import Bell from '../../assets/Bell.svg'
// Redux imports
import { logout } from '../../redux/slices/authSlice';
// style imports
import { Navbar, Container, Image, NavDropdown, Nav, Button } from 'react-bootstrap';
import Img from '../../assets/naveed.jpg';

const CustomNavbar = ({ name = 'Naveed ', changeState }) => {
  // const token = false;
  // const token = useSelector((state) => state.authReducer.token)
  const [showNavbar, setShowNavbar] = useState(true);
  //
  //
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (

    showNavbar && <Navbar style={{ position: 'fixed', zIndex: '10' }} className="bg-body-tertiary w-100">
      <Container>
        <Navbar.Brand href="#home">E-commerce</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link>
            {
              <img src={Bell} />
            }
          </Nav.Link>
          <Navbar.Text style={{ marginLeft: '10px' }}>{localStorage.getItem('token') ? `${name}` : <Button style={{ height: '30px', width: '60px', padding: '3px 0px 3px 0px', background: '#fff', color: '#007BFF', border: 'none' }} onClick={() => { nav('/login'); setShowNavbar(false) }}>Login</Button>}</Navbar.Text>
          {localStorage.getItem('token') && <NavDropdown id="basic-nav-dropdown" style={{ marginLeft: '10px' }}>
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
              dispatch(logout());
              nav('/');
            }}>Logout</NavDropdown.Item>
          </NavDropdown>}
          <span>
            {localStorage.getItem('token') && <Image
              src={Img}
              style={{ width: '46px', height: '31px', borderRadius: '50%', marginLeft: '10px' }}
            />}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
