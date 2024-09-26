//userBookController.js
import Joi from "joi";
import {
  addCharacterAndBook as addBookService,
  getAllEntries as getAllEntriesService,
} from "../services/userBookService.js";

// Define the validation schema using Joi
const schema = Joi.object({
  character: Joi.string().min(3).required(), // character must be a string with a minimum length of 3
  book_name: Joi.string().required(), // book_name must be a string and is required
});

// Add a new character and book to the same table
const addCharacterAndBook = async (req, res) => {
  // Validate the incoming request body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { character, book_name } = req.body;
  try {
    const newEntry = await addBookService(character, book_name);
    res.status(201).json(newEntry);
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      res.status(400).json({ error: "Entry already exists." });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Fetch all entries from the table
const getAllEntries = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  // Convert page and limit to numbers
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;

  try {
    const result = await getAllEntriesService(pageNumber, pageSize);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addCharacterAndBook, getAllEntries };
