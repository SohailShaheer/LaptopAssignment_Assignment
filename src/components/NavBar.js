import { Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Laptop from "../images/coverimage.jpg"


function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand to="/">Laptop System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Row>
                <Col>
                  <Link style={{color:"black", textDecoration: "none", marginTop:"1vw"}} to="/">Home &nbsp;&nbsp;&nbsp;</Link>
                  <Link style={{color:"black", textDecoration: "none" , marginTop:"1vw"}}  to="/company">Company&nbsp;&nbsp;&nbsp;</Link>
                  <Link style={{color:"black", textDecoration: "none", marginTop:"1vw"}}  to="/product">Type&nbsp;&nbsp;&nbsp;</Link>
                  <Link style={{color:"black", textDecoration: "none", marginTop:"1vw"}}  to="/screen">ScreenSize&nbsp;&nbsp;&nbsp;</Link>
                  <Link style={{color:"black", textDecoration: "none", marginTop:"1vw"}}  to="/ram">Ram&nbsp;&nbsp;&nbsp;</Link>
                  <Link style={{color:"black", textDecoration: "none", marginTop:"1vw"}}  to="/system">OS&nbsp;&nbsp;&nbsp;</Link>
                  <Link style={{color:"black", textDecoration: "none", marginTop:"1vw"}}  to="/price">Price&nbsp;&nbsp;&nbsp;</Link>
                  <Link style={{color:"black", textDecoration: "none", marginTop:"1vw"}}  to="/sort">Sort</Link>

                </Col>
              </Row>
            </Nav> 
          </Navbar.Collapse >
        </Container >
      </Navbar >
  );
  }    
 
  export default NavBar;