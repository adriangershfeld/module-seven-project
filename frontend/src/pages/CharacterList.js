import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCharacters } from "../services/api";
import { Row, Col, Spinner, Alert, Card } from "react-bootstrap";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Get the query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const alignmentFilter = queryParams.get("alignment");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch characters. Please try again later.");
        console.error("Error fetching characters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Filter characters based on the alignment query parameter
  const filteredCharacters = alignmentFilter
    ? characters.filter((character) => character.alignment === alignmentFilter)
    : characters;

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading characters...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row>
      {filteredCharacters.map((character) => (
        <Col key={character.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={character.image_url} />
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {character.alias}
              </Card.Subtitle>
              <Card.Text style={{ color: "#ffffff" }}> {/* Set text color to white */}
                <strong>Alignment:</strong> {character.alignment}
              </Card.Text>
              <Card.Text style={{ color: "#ffffff" }}> {/* Set text color to white */}
                <strong>Powers:</strong> {character.powers}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CharacterList;