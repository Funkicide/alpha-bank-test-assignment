import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Button, Container, Col, Row, Navbar,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';

import routes from './routes';
import { picturesActions, fetchData } from './slices';

const App = () => {
  const [isFiltered, setFiltered] = useState(false);
  const dispatch = useDispatch();
  const allPictures = useSelector((state) => Object.values(state.picturesInfo.pictures));
  const likedPictures = useSelector((state) => Object.values(state.picturesInfo.likedPictures));
  const uiState = useSelector((state) => state.picturesInfo.ui);
  const pictures = isFiltered ? likedPictures : allPictures;

  useEffect(() => {
    dispatch(fetchData(20));
  }, [dispatch]);

  const handleFiltrationByLike = () => {
    setFiltered(!isFiltered);
  };

  const renderPictureCards = (pics) => pics.map(({ url, id }) => (
    <Col key={id.toString()}>
      <Card className="mb-4">
        <Card.Img variant="top" src={url} />
        <Card.Body className="d-flex justify-content-between">
          <Button
            variant="outline-danger"
            onClick={() => dispatch(picturesActions.deletePicture({ pictureId: id }))}
          >
            <i className="bi bi-trash" />
          </Button>
          <Button
            variant={uiState[id].isLiked ? 'danger' : 'outline-danger'}
            onClick={() => dispatch(picturesActions.changeLikedStatus({ pictureId: id }))}
          >
            {uiState[id].isLiked ? <i className="bi bi-heart-fill" /> : <i className="bi bi-heart" />}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <>
      <Navbar className="mb-3" sticky="top" bg="white">
        <Container>
          <Navbar.Brand href={routes.pages.rootPath()}>Shibe Pics</Navbar.Brand>
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
        <Row sm={1} md={3} lg={4} className="align-items-center">
          {renderPictureCards(pictures)}
        </Row>
      </Container>
    </>
  );
};

export default App;
