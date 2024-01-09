import { Card, CardImg, CardBody, CardTitle,CardText } from 'reactstrap';

const Flashcard = (props) => {
    return (<>
      <div className="row">
      <Card>
        <CardBody>
        <CardTitle tag="h5">{props.titulo}</CardTitle>
        <div className="col-md-8 col-lg-4">
          <CardImg width="50%" src={props.imagen} />
        </div>
        <CardText>{props.texto}</CardText>
        </CardBody>
      </Card>
      </div>
    </>);
  }
export default Flashcard;