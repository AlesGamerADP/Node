import User from "../models/User.js";

class UserRepository {
    async create(user) {
        return await User.create(user);
    }

    async findAll() {
        return await User.find();
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }
}

export default new UserRepository();
