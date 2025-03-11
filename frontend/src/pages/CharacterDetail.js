import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Row, Col, Badge, Button, Alert, Spinner, Modal } from "react-bootstrap";
import { getCharacter, deleteCharacter } from "../services/api";
import CharacterForm from "../components/CharacterForm";
import Skeleton from "react-loading-skeleton";  // Add loading skeleton library

const CharacterDetail = ({ isNew = false, isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (isNew) return;
      
      try {
        setLoading(true);
        const data = await getCharacter(id);
        setCharacter(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch character details. Please try again later.");
        console.error("Error fetching character:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id, isNew]);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteCharacter(id);
      setShowDeleteModal(false);
      navigate("/characters", { 
        state: { 
          notification: {
            type: "success",
            message: "Character successfully deleted!"
          }
        }
      });
    } catch (err) {
      setDeleteError("Failed to delete character. Please try again.");
      console.error("Error deleting character:", err);
      setDeleteLoading(false);
    }
  };

  if (isNew) {
    return (
      <div className="character-form-container">
        <h1 className="mb-4">Create New Character</h1>
        <CharacterForm isNew={true} />
      </div>
    );
  }

  if (isEditing && character) {
    return (
      <div className="character-form-container">
        <h1 className="mb-4">Edit Character</h1>
        <CharacterForm character={character} isEditing={true} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading character details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!character) {
    return <Alert variant="warning">Character not found</Alert>;
  }

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Button as={Link} to="/characters" variant="outline-secondary">
            &larr; Back to Characters
          </Button>
        </Col>
      </Row>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="character-image-card">
            {loading ? (
              <Skeleton height={400} />
            ) : (
              <Card.Img
                variant="top"
                src={character.image_url || "https://via.placeholder.com/400x600?text=No+Image"}
                alt={character.name}
                className="character-detail-image"
              />
            )}
          </Card>
        </Col>
        <Col lg={8}>
          <Card className="character-info-card">
            <Card.Body>
              {loading ? (
                <>
                  <Skeleton width="50%" />
                  <Skeleton width="80%" />
                </>
              ) : (
                <>
                  <Card.Title className="display-5">{character.name}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted fs-4">
                    {character.alias}
                  </Card.Subtitle>
                  <Badge
                    bg={character.alignment === "hero" ? "success" : "danger"}
                    className="mb-3 fs-6"
                  >
                    {character.alignment.charAt(0).toUpperCase() + character.alignment.slice(1)}
                  </Badge>
                  <Card.Text className="fs-5 mt-3">
                    <strong>Powers:</strong>
                  </Card.Text>
                  <Card.Text className="mb-4">
                    {character.powers || "No powers available"}
                  </Card.Text>
                  <Card.Text className="fs-5">
                    <strong>Bio:</strong>
                  </Card.Text>
                  <Card.Text className="mb-4">
                    {character.bio || "No biography available"}
                  </Card.Text>
                </>
              )}
              <div className="d-flex mt-4">
                <Button
                  as={Link}
                  to={`/characters/edit/${character.id}`}
                  variant="primary"
                  className="me-2"
                >
                  Edit Character
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Character
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {character?.name}? This action cannot be undone.
          {deleteError && (
            <Alert variant="danger" className="mt-3">
              {deleteError}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete} 
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CharacterDetail;
