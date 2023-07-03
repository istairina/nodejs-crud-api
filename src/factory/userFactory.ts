import UserRepository from "../repositories/userRepository.ts"
import UserService from "../services/userService.ts";

export const generateInstance = () => {
    const userRepository = new UserRepository();

    const userService = new UserService(userRepository);

    return userService;
}