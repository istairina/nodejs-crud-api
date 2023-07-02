import User from "../entitites/user";
import UserRepository from "../repositories/userRepository.ts";

export default class UserService {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    find() {
        return this.userRepository.find();
    }

    create(data: User) {
        return this.userRepository.create(data);
    }
}