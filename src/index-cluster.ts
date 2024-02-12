import cluster from "cluster";
import { cpus } from "os";
import dotenv from "dotenv";
import { server } from "./server"; // Import your server setup

dotenv.config();

const numCPUs = cpus().length;
const port = Number(process.env.PORT) || 3000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running on port ${port}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const newPort = port + cluster.worker.id;
  server.listen(newPort, () => {
    console.log(`Worker ${process.pid} started on port ${newPort}`);
  });
}
