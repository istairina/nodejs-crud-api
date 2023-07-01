import { DEFAULT_HEADER } from "../util/util";
import { ServerResponse } from 'node:http';


export const routes = ({ userService }) => ({
    '/users:get': async (response: ServerResponse) => {
        response.writeHead(200, DEFAULT_HEADER);
        response.write('Your users\'re here');
        response.end();
    },
    '/users:post': async (response: ServerResponse) => {
        response.writeHead(200, DEFAULT_HEADER);
        response.write('Added here');
        response.end();
    }
});
