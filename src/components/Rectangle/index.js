// library imports
// component imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from '../../components/button';

// Redux imports

// style imports
import './style.css';

const Rectangle = () => {
  return (
    <div className="background">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Products</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>
                <Button
                  className="btn"
                  type="primary"
                  id="btn"
                  size="lg"
                  placeholder="Import Bulk Products"
                />
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                <Button
                  className="btn"
                  type="primary"
                  id="btn"
                  size="lg"
                  placeholder="Add New"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Rectangle;
