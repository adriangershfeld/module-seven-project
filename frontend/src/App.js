import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";

// Import components
import NavigationComponent from "./components/NavigationComponent";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <NavigationComponent />

        {/* Main Content Container */}
        <Container className="py-4 main-container">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Character List Page */}
            <Route path="/characters" element={<CharacterList />} />

            {/* Create New Character Page */}
            <Route path="/characters/new" element={<CharacterDetail isNew={true} />} />

            {/* Character Detail Page */}
            <Route path="/characters/:id" element={<CharacterDetail />} />

            {/* Edit Character Page */}
            <Route path="/characters/edit/:id" element={<CharacterDetail isEditing={true} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
