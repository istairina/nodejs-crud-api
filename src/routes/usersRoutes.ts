import { DEFAULT_HEADER } from "../util/util.ts";
import { once } from 'node:events';
import User from "../entitites/user.ts";
import UserService from "../services/userService.ts";
import { handlerProps } from "../handler.ts";

type RoutesProps = {
    userService: UserService,
}

export const routes = ({ userService }: RoutesProps) => ({
    '/users:get': async ({response}: handlerProps) => {
        response.writeHead(200, DEFAULT_HEADER);
        const users = await userService.find()
        response.write(JSON.stringify({results: users}));
        response.end();
    },
    '/users:post': async ({request, response}: handlerProps) => {
        const data = await once(request, 'data') as string[];
        const item = JSON.parse(data.join(''));
        const user = new User(item);

        const id = await userService.create(user);

        response.writeHead(201, DEFAULT_HEADER);
        response.write(JSON.stringify({
            success: 'User has been created.',
            id: id,
        }));
        return response.end();
    }
});
