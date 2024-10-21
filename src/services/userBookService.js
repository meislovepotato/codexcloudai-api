//userBookService.js
import UserBook from "../models/userBook.js";

// Add a new character and book to the table
export const addCharacterAndBook = async (
  userId,
  title,
  author,
  genre,
  character
) => {
  try {
    const newEntry = await UserBook.create({
      userId,
      title,
      author,
      genre,
      character,
    });
    return newEntry;
  } catch (err) {
    throw err; // Throw the error for the controller to handle
  }
};

// Fetch all entries from the table with pagination
export const getAllEntries = async (userId) => {
 
  try {
    const allBooks = await UserBook.findAll({
      where: {id: userId}
    })

    return {
      
    };
  } catch (error) {
    throw error;
  }
};
