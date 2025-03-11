import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all characters
export const getCharacters = async () => {
  try {
    const response = await api.get("/characters");
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error.response?.data || error.message);
    throw error;
  }
};

// Get a single character by ID
export const getCharacter = async (id) => {
  try {
    const response = await api.get(`/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Create a new character
export const createCharacter = async (characterData) => {
  try {
    const response = await api.post("/characters", characterData);
    return response.data;
  } catch (error) {
    console.error("Error creating character:", error.response?.data || error.message);
    throw error;
  }
};

// Update a character by ID
export const updateCharacter = async (id, characterData) => {
  try {
    const response = await api.put(`/characters/${id}`, characterData);
    return response.data;
  } catch (error) {
    console.error(`Error updating character ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a character by ID
export const deleteCharacter = async (id) => {
  try {
    const response = await api.delete(`/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting character ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
