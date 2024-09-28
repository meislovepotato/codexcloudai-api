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
export const getAllEntries = async (userId, pageNumber, pageSize) => {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const entries = await UserBook.findAll({
      where: { userId }, // Filter by userId
      limit: pageSize,
      offset: offset,
      include: [
        {
          model: Review, // Include reviews for each book
          required: false, // Set to false to allow books without reviews
        },
      ],
    });
    const totalEntries = await UserBook.count({ where: { userId } }); // Count entries for this user
    console.log(user);

    return {
      totalEntries,
      totalPages: Math.ceil(totalEntries / pageSize),
      currentPage: pageNumber,
      entries: entries.map((entry) => ({
        ...entry.toJSON(),
        review: entry.Reviews.length ? entry.Reviews : null, // Return null if no reviews
      })),
    };
  } catch (error) {
    throw error;
  }
};
