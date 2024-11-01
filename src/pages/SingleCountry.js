import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SingleCountry = () => {
    const { name } = useParams();

    const [country, setCountry] = useState(null)
    const [weather, setWeather] = useState(null)

    //Country API
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

    //Weather API

    const weatherApiKey = "01ffb37d3a1b120c02672fbadad107f4"

    useEffect(() => {
        if (country) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weatherApiKey}
`)
                .then((res) => {
                    console.log('Response:', res.data);
                    setWeather(res.data)
                })
                .catch((e) => {
                    console.error(e)
                })
        }
    }, [country])

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
                    <h3>Official name:</h3>
                    <h5 className="fw-normal">{country.name.official}</h5>
                </Col>

                <Col>
                    <h3>Regions:</h3>
                    <h5 className="fw-normal">Main Region: {country.region}</h5>
                    {country.subregion && <h5 className="fw-normal">Sub-Region: {country.subregion}</h5>}
                </Col>

                <Col>
                    <h3>Language:</h3>
                    <h5 className="fw-normal">
                        {
                            Object.values(country.languages).map((language) => {
                                return <li>{language}</li>
                            })
                        }
                    </h5>
                </Col>

                <Col>
                    <h3>Population:</h3>
                    <h5 className="fw-normal">{country.population}</h5>
                    {/* <h5 className="fw-normal">Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</h5> */}
                </Col>

            </Row>
            <hr></hr>

            {/* Displays the map */}

            <MapContainer
                className="mb-4"
                style={{ height: "600px", width: "80%", margin: "auto" }}
                center={[country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]]}
                zoom={10}
                scrollWheelZoom={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]]}>

                </Marker>

            </MapContainer>
            <hr></hr>


            {/* Code runs once weather is defined */}
            {weather && (
                <>
                    
                    <Row className="text-center pb-4">

                        {/*Weather heading*/}

                        <Col md={12} className="mb-2">
                            <h2 className="text-center">Weather in {country.name.official}</h2>
                        </Col>

                        {/*Weather information*/}

                        <Col>
                            <h4>Description:</h4>
                            <h5 className="fw-normal">{weather.weather[0].description}</h5>
                        </Col>

                        <Col>
                            <h4>Temperature:</h4>
                            <h5 className="fw-normal">{Math.round(weather.main.temp - 273.15)} °C</h5>
                        </Col>

                        <Col>
                            <h4>Humidity:</h4>
                            <h5 className="fw-normal">{weather.main.humidity} %</h5>
                        </Col>

                        <Col>
                            <h4>Wind Speed:</h4>
                            <h5 className="fw-normal">{weather.wind.speed}</h5>
                        </Col>
                        
                    </Row>
                    <hr></hr>
                </>

            )}
            <hr></hr>
        </Container>
    );
}

export default SingleCountry;