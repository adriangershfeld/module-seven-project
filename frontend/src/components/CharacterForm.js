import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createCharacter, updateCharacter } from "../services/api";

const CharacterForm = ({ character = null, isEditing = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: character?.name || "",
    alias: character?.alias || "",
    powers: character?.powers || "",
    alignment: character?.alignment || "hero",
    image_url: character?.image_url || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditing) {
        await updateCharacter(character.id, formData);
        navigate(`/characters/${character.id}`, {
          state: {
            notification: {
              type: "success",
              message: "Character updated successfully!",
            },
          },
        });
      } else {
        const newCharacter = await createCharacter(formData);
        navigate(`/characters/${newCharacter.id}`, {
          state: {
            notification: {
              type: "success",
              message: "Character created successfully!",
            },
          },
        });
      }
    } catch (err) {
      setError(
        isEditing
          ? "Failed to update character. Please try again."
          : "Failed to create character. Please try again."
      );
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="character-form">
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="characterName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter character name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a character name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="characterAlias">
            <Form.Label>Alias</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter character alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a character alias.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="characterAlignment">
            <Form.Label>Alignment</Form.Label>
            <Form.Select
              name="alignment"
              value={formData.alignment}
              onChange={handleChange}
              required
            >
              <option value="hero">Hero</option>
              <option value="villain">Villain</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="characterPowers">
            <Form.Label>Powers</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter character powers"
              name="powers"
              value={formData.powers}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide character powers.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="characterImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter image URL"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid image URL.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Provide a valid URL for the character's image.
            </Form.Text>
          </Form.Group>

          <div className="d-flex mt-4">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className="me-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditing ? "Update Character" : "Create Character"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CharacterForm;