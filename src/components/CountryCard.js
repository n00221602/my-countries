import { Card } from "react-bootstrap";

const CountryCard = (props) => {
    const {name, flag, region} = props;

    return (
        <Card className="m-2 p-2 text-center bg-dark">
            <Card.Img className='h-50 w-100' src={flag} variant='top'/>
            <Card.Body>
                <Card.Title>
                    <a href={`/country/${name}`} class="btn btn-info text-light fw-semibold btn-lg">{props.name}</a>
                </Card.Title>
                <p className="text-light">{region}</p>
            </Card.Body>
        </Card>
    )
}

export default CountryCard;
