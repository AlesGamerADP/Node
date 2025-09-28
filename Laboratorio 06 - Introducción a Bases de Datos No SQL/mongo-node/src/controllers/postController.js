import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
  async create(req, res) {
    try {
      const { userId } = req.body;
      const post = await postService.createPost(userId, req.body);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  

  async createForm(req, res) {
    try {
      const users = await userRepository.findAll(); 
      const { userId } = req.params;
  
      res.render("postsCreate", { post: null, userId, users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const posts = await postService.getPosts();
      const userId = "66fbb2b6e34c32a60d0e4f21";
      res.render("posts", { posts, userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async editForm(req, res) {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(id);
      if (!post) return res.status(404).send("Post no encontrado");
  
      const users = await userRepository.findAll();
  
      res.render("postsCreate", { post, userId: post.user._id, users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const updatedPost = await postService.updatePost(id, req.body);

      if (!updatedPost) {
        return res.status(404).send("Post no encontrado");
      }

      res.redirect("/posts");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await postService.deletePost(id);
      res.redirect("/posts");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PostController();
