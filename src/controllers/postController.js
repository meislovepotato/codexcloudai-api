import {
  createPostService,
  getAllPostsService,
  getUserPostsService,
} from "../services/postService.js";

export const createPost = async (req, res) => {
  const userId = req.user.userId; // Assumes the user ID is in req.user
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const post = await createPostService(userId, content);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post: " + error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts: " + error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await getUserPostsService(userId);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user posts: " + error.message });
  }
};
