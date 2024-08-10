import Posts from "../models/Posts.js";
import User from "../models/User.js";

export const getfriendPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("friends");
    const friendIds = user.friends.map((friend) => friend._id);
    const posts = await Posts.find({ user_Id: { $in: friendIds } })
      .populate("user_Id", "username")
      .populate({path:"comments.user_Id",
                select:"username"
      });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostWFriendsComments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("friends");
    const friendIds = user.friends.map((friend) => friend._id);

    const posts = await Posts.find({
      $or: [
        { user_Id: { $in: friendIds } },
        {
          "comments.user_Id": { $in: friendIds },
          user_Id: { $nin: friendIds.concat([userId]) },
        },
      ],
    })
     .populate("user_Id", "username")
      .populate({path:"comments.user_Id",
                select:"username"
      });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const newPost = new Posts({
      user_Id: userId,
      content,
    });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
    try {
      const { userId, content } = req.body; 
      const postId = req.params.postId;
      if (!userId || !content) {
        return res.status(400).json({ message: 'User ID and content are required' });
      }
  
      const post = await Posts.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const newComment = {
        user_Id: userId,
        content: content,
        created_at: new Date()
      };
  
      post.comments.push(newComment);
  
      await post.save();
  
      res.status(201).json({ message: 'Comment added successfully', post });
    } catch (err) {
      console.error("Error adding comment:", err);
      res.status(500).json({ message: err.message });
    }
  };
