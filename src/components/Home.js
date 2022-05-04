import { Container, Row, Col } from "react-bootstrap"
import LaptopIcon from "../images/coverimage.jpg"

function Home() {
    return (
        <Container style={{backgroundColor:"black"}}>
            <Row className="text-center">
                <Col>
                    <p><b style={{textColor:"red"}}>Laptop Management System for students</b></p>
                    <img style={{width:"400px", height:"300px"}} src={LaptopIcon} />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;