import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        return await postRepository.create({ ...postData, user: user._id });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostsByUser(userId) {
        return await postRepository.findByUser(userId);
    }

    async getPostById(postId) {
        return await postRepository.findById(postId);
    }

    async updatePost(id, data) {
        return await postRepository.update(id, data);
    }

    async deletePost(id) {
        return await postRepository.delete(id);
    }
}

export default new PostService();
