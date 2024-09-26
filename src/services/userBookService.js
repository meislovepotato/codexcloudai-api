//userBookService.js
import UserBook from "../models/userBook.js";

// Add a new character and book to the table
export const addCharacterAndBook = async (character, book_name) => {
  try {
    const newEntry = await UserBook.create({ character, book_name });
    return newEntry;
  } catch (err) {
    throw err; // Throw the error for the controller to handle
  }
};

// Fetch all entries from the table with pagination
export const getAllEntries = async (pageNumber, pageSize) => {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const entries = await UserBook.findAll({
      limit: pageSize,
      offset: offset,
    });
    const totalEntries = await UserBook.count();

    return {
      totalEntries,
      totalPages: Math.ceil(totalEntries / pageSize),
      currentPage: pageNumber,
      entries,
    };
  } catch (error) {
    throw error;
  }
};
