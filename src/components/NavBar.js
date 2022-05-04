import { Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand to="/">Laptop System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <p>&nbsp;&nbsp;&nbsp;</p>
              <li><Link style={{textColor:"white"}} to="/">Home</Link></li>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <li><Link to="/view">View</Link></li>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <li><Link to="/sort">Sort</Link></li>
              {/* <li><Link to="/about">About</Link></li> */}
            </Nav> 
          </Navbar.Collapse >
        </Container >
      </Navbar >
  );
  }    
 
  export default NavBar;