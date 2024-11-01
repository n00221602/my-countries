import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Image } from 'react-bootstrap';





const FoodCard = ({ country }) => {

    const [food, setFoodList] = useState([]);


    useEffect(() => {

        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
            .then(response => {
                console.log(response.data);
                setFoodList(response.data);
            })
            .catch(error => {
                console.error(error)
            });

    }, [country]);

    return (
        <Card>  
            <Row>
                <Col>
                {/* <Image src={food.meals.strMealsThumb}></Image> */}
            <h1>FOODCARD</h1>
            {console.log(food.meals[0])}
            </Col>
            </Row>

        </Card>
    )
};


export default FoodCard;