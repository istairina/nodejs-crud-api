import { createServer } from "node:http";
import { handler } from "./handler";
import dotenv from "dotenv";
import cluster from 'cluster';
import os from "node:os";

dotenv.config();

const numCPUs = os.cpus().length;

const hostname = "127.0.0.1";
const port = process.env.PORT;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running at http://${hostname}:${port}`);
  const pidToPort: { [key: number]: number } = {};
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork({ port: Number(port) + i + 1 });
    pidToPort[worker.process.pid] = Number(port) + i + 1;

  };
  console.log("pidToPort", pidToPort)
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  })

} else {
  const server = createServer(handler);

  server.listen(port, () => {
    console.log(`Worker is running at http://${hostname}:${port}`);
  });
}



export const server = createServer(handler);


