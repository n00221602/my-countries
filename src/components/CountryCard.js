import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CountryCard = (props) => {
    const {name, flag, region} = props;

    return (
        <Card className="my-2">
            <Card.Img className='h-50 w-100 border' src={flag} variant='top'/>
            <Card.Body>
                <Card.Title>
                    <Link to={`/country/${name}`}>{props.name}</Link>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default CountryCard;
