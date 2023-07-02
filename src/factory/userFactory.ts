import UserRepository from "../repositories/userRepository.ts"
import UserService from "../services/userService.ts";

export const generateInstance = (filePath: string) => {
    const userRepository = new UserRepository({file: filePath});

    const userService = new UserService(userRepository);

    return userService;
}