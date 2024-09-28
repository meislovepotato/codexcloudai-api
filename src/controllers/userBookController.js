//userBookController.js
import Joi from "joi";
import {
  addCharacterAndBook as addBookService,
  getAllEntries as getAllEntriesService,
} from "../services/userBookService.js";
import { Sequelize } from "sequelize";

// Define the validation schema using Joi
const schema = Joi.object({
  title: Joi.string().required(), // Title is required
  author: Joi.string().required(), // Author is required
  genre: Joi.string().required(), // Genre is required
  character: Joi.string().allow(null, ""), // Character can be empty
});

// Add a new character and book to the same table
const addCharacterAndBook = async (req, res) => {
  // Validate the incoming request body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { title, author, genre, character } = req.body;
  const userId = req.user.userId; // Extract userId from the token

  try {
    const newEntry = await addBookService(
      userId,
      title,
      author,
      genre,
      character
    );
    res.status(201).json(newEntry);
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      res.status(400).json({ error: "Entry already exists." });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Fetch books
const getUserBooks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user.userId; // Get userId from the token

  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;

  try {
    const result = await getAllEntriesService(userId, pageNumber, pageSize); // Pass userId to service
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addCharacterAndBook, getUserBooks };
