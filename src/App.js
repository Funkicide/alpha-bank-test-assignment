import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Button, Container, Col, Row, Navbar,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';

import routes from './routes';
import { cardsActions, fetchData } from './slices';

const App = () => {
  const [isFiltered, setFiltered] = useState(false);
  const dispatch = useDispatch();
  const allCards = useSelector((state) => Object.values(state.cardsInfo.cards));
  const likedCards = useSelector((state) => Object.values(state.cardsInfo.likedCards));
  const uiState = useSelector((state) => state.cardsInfo.uiState);
  const cards = isFiltered ? likedCards : allCards;

  useEffect(() => {
    dispatch(fetchData(20));
  }, [dispatch]);

  const handleFiltrationByLike = () => {
    setFiltered(!isFiltered);
  };

  const renderCards = (pics) => pics.map(({ url, fact, id }) => (
    <Col key={id.toString()}>
      <Card className="mb-4">
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Text>
            {fact}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-danger"
              onClick={() => dispatch(cardsActions.deleteCard({ cardId: id }))}
            >
              <i className="bi bi-trash" />
            </Button>
            <Button
              variant={uiState[id].isLiked ? 'danger' : 'outline-danger'}
              onClick={() => dispatch(cardsActions.changeLikedStatus({ cardId: id }))}
            >
              {uiState[id].isLiked ? <i className="bi bi-heart-fill" /> : <i className="bi bi-heart" />}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <>
      <Navbar className="mb-3" sticky="top" bg="white">
        <Container>
          <Navbar.Brand href={routes.pages.rootPath()}>Shibe Pics and Cat Facts</Navbar.Brand>
          <Button
            size="lg"
            onClick={handleFiltrationByLike}
            variant={isFiltered ? 'primary' : 'outline-primary'}
          >
            {isFiltered ? <i className="bi bi-funnel-fill" /> : <i className="bi bi-funnel" />}
          </Button>
        </Container>
      </Navbar>
      <Container>
        <Row xs={1} md={3} lg={4} className="align-items-center">
          {renderCards(cards)}
        </Row>
      </Container>
    </>
  );
};

export default App;
