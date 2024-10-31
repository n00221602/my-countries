import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SingleCountry = () => {
    const { name } = useParams();

    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                console.log('Response:', res.data[0]);
                setCountry(res.data[0])
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])

    if (!country) {
        return <div>Loading...</div>
    }

    return (
        <Container className='bg-primary-subtle'>
            <Row className="text-center mb-4">

                {/*Country name and flag*/}

                <Col md={12} className="text-center pb-2">
                    <h1 className='display-1 fw-bold'>{country.name.common}</h1>
                    
                </Col>

                <Col md={12} className="text-center pb-5">
                    <Image src={country.flags.png} alt={`${country.name.common}'s flag`} style={{ height: "100%", width: "40%" }} />
                    <hr></hr>
                </Col>

                {/*Country information*/}

                <Col>
                    <h3>Official name</h3>
                    <p>{country.name.official}</p>
                </Col>

                <Col>
                    <h3>Region {country.region}</h3>
                    {country.subregion && <p>Sub-Region: {country.subregion}</p>}
                </Col>

                <Col>
                    <h3>Language</h3>
                    <p>
                        {
                            Object.values(country.languages).map((language) => {
                                return <li>{language}</li>
                            })
                        }
                    </p>
                </Col>

                <Col>
                    <h3>Population </h3>
                    <p>{country.population}</p>
                    {/* <p>Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</p> */}
                </Col>
            </Row>

            <MapContainer
                style={{ height: "600px", width: "80%", margin:"auto"}}
                center={[country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]]}
                zoom={10}
                scrollWheelZoom={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]]}>

                </Marker>

            </MapContainer>
        </Container>
    );
}

export default SingleCountry