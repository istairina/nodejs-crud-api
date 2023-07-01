import {createServer} from 'node:http';
import { handler } from './handler';

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = createServer(handler);

server.listen(port, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});