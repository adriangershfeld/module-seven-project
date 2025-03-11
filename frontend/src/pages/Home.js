import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaSkull, FaPlus } from "react-icons/fa";

const Home = () => {
  const [improved, setImproved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImproved(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container}>
      <div className="hero-section text-center">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Marvel Character Database
          </motion.h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore your favorite Marvel heroes and villains
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              as={Link}
              to="/characters"
              variant="danger"
              size="lg"
              className="mt-3"
              style={{
                background: improved
                  ? "linear-gradient(45deg, #9c27b0, #d05ce3)"
                  : "#9c27b0",
                borderColor: "#6a0080",
                boxShadow: improved
                  ? "0 0 15px rgba(156, 39, 176, 0.5)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            >
              Explore Characters
            </Button>
          </motion.div>
        </div>
      </div>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <motion.div variants={item}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex align-items-center">
                  <FaShieldAlt
                    className="me-2"
                    style={{ color: "#4caf50" }}
                  />
                  Heroes
                </Card.Title>
                <Card.Text style={{ color: "#ffffff" }}>
                  Discover the mighty heroes of the Marvel universe. From
                  Spider-Man to Iron Man, explore their powers, origins, and
                  adventures.
                </Card.Text>
                <div className="mt-auto">
                  <Button
                    as={Link}
                    to="/characters?alignment=hero" // Add query parameter for heroes
                    variant="success"
                    style={{
                      background: improved
                        ? "linear-gradient(45deg, #4caf50, #2e7d32)"
                        : "#4caf50",
                      boxShadow: improved
                        ? "0 0 10px rgba(76, 175, 80, 0.4)"
                        : "none",
                    }}
                  >
                    View Heroes
                  </Button>
                </div>
              </Card.Body>
              {improved && (
                <div
                  className="position-absolute"
                  style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    background:
                      "linear-gradient(90deg, transparent, #4caf50, transparent)",
                  }}
                />
              )}
            </Card>
          </motion.div>
        </Col>

        <Col md={6} className="mb-4">
          <motion.div variants={item}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex align-items-center">
                  <FaSkull
                    className="me-2"
                    style={{ color: "#f44336" }}
                  />
                  Villains
                </Card.Title>
                <Card.Text style={{ color: "#ffffff" }}>
                  Encounter the most notorious villains of the Marvel universe. From Loki to Thanos,
                  learn about their sinister plans and formidable powers.
                </Card.Text>
                <div className="mt-auto">
                  <Button
                    as={Link}
                    to="/characters?alignment=villain" // Add query parameter for villains
                    variant="danger"
                    style={{
                      background: improved
                        ? "linear-gradient(45deg, #f44336, #b71c1c)"
                        : "#f44336",
                      boxShadow: improved
                        ? "0 0 10px rgba(244, 67, 54, 0.4)"
                        : "none",
                    }}
                  >
                    View Villains
                  </Button>
                </div>
              </Card.Body>
              {improved && (
                <div
                  className="position-absolute"
                  style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    background:
                      "linear-gradient(90deg, transparent, #f44336, transparent)",
                  }}
                />
              )}
            </Card>
          </motion.div>
        </Col>
      </Row>

      <motion.div variants={item}>
        <Row className="text-center mb-5">
          <Col>
            <Card>
              <Card.Body>
                <h2 className="mb-3"style={{ color: "#ffffff" }} >Create Your Own Character</h2>
                <p style={{ color: "#ffffff" }}>
                  Have a character idea? Add your own creation to our database!
                </p>
                <Button
                  as={Link}
                  to="/characters/new"
                  variant="primary"
                  size="lg"
                  className="d-inline-flex align-items-center"
                  style={{
                    background: improved
                      ? "linear-gradient(45deg, #9c27b0, #6a0080)"
                      : "#9c27b0",
                    boxShadow: improved
                      ? "0 0 15px rgba(156, 39, 176, 0.4)"
                      : "none",
                  }}
                >
                  <FaPlus className="me-2" />
                  Create Character
                </Button>
              </Card.Body>
              {improved && (
                <div
                  className="position-absolute"
                  style={{
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    background:
                      "linear-gradient(90deg, transparent, #9c27b0, transparent)",
                  }}
                />
              )}
            </Card>
          </Col>
        </Row>
      </motion.div>
    </motion.div>
  );
};

export default Home;