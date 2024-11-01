import { Row, Col, Container, Button} from 'react-bootstrap';
import MapChart from '../components/MapChart'

const Welcome = () => {
    return(
        <Container >
        <Row className='py-3'>

                    <Col md={5} className='d-flex align-content-center flex-wrap'>
                        <h1 className='display-1 ps-1 fw-bold text-info mb-5'>Welcome to Countries.</h1>
                        
                        <Button href="/home" size='lg'>Go to home</Button>
                    </Col>
                    <Col></Col>
                    <Col md={5}>
                        <MapChart/>
                    </Col>
                </Row>
        </Container>
    )
}

export default Welcome