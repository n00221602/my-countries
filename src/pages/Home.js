import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { Row, Col, Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropDownMenu from '../components/Dropdown';
import FoodCard from '../components/FoodCard';

import MapChart from '../components/MapChart'

const Home = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(null)

    useEffect(() => {
        if (!searchTerm) {
            axios.get('https://restcountries.com/v3.1/all')
                .then(response => {
                    setCountriesList(response.data);
                })
                .catch(error => {
                    console.error(error)
                });
        }

        setCountriesList(countriesList.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) || country.region.toLowerCase().includes(searchTerm.toLowerCase())
        ));

       

    }, [searchTerm]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // let filteredCountriesList = countriesList.map((country) => country.demonyms)
    // console.log(JSON.stringify(filteredCountriesList))

    let countryCards = countriesList.map((country, index) => {
        return (

            <CountryCard
                key={country.ccn3}
                flag={country.flags.png}
                name={country.name.common}
                region={country.region}
            />
        );
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
          });
      } else {
        console.log("Geolocation not supported");
      }

    return (
        <div>
            <Container className="p-0 bg-primary-subtle">

                

                <Row className='py-3'>
                    <Col md={12} className='text-center'>
                        <h1 className='display-1 fw-bold'>Welcome to Countries.</h1>
                    </Col>
                    <Col></Col>
                    <Col md={5}>
                        <MapChart />
                    </Col>
                    <Col></Col>
                </Row>

                {/* <Row className='py-3'>

                    <Col md={5} className='d-flex align-items-center'>
                        <h1 className='display-1 ps-1 fw-bold text-info'>Welcome to Countries.</h1>
                    </Col>
                    <Col></Col>
                    <Col md={5}>
                        <MapChart />
                    </Col>
                </Row> */}

                <Row md={12} className='text-center'>
                    <input placeholder='Search' onChange={handleChange}></input>
                    <h2>All Countries</h2>
                </Row>

                <Row md={5} xs={1}>
                    {countryCards}
                </Row>

                <Row className="text-center">
                    <h2>Showing {countriesList.length} result{countriesList.length !== 1 && 's'}</h2>
                </Row>
            </Container>

        </div>
    );
};

export default Home;
