/**
 * Clusters of Node.js processes can be used to run multiple instances of Node.js 
 * that can distribute workloads among their application threads. When process 
 * isolation is not needed, use the worker_threads module instead, which allows 
 * running multiple application threads within a single Node.js instance.
 * The cluster module allows easy creation of child processes that all share server ports.
 * @documentation https://nodejs.org/api/cluster.html#cluster
 */
const dotenv = require("dotenv");
const cluster = require("node:cluster");
const http = require("node:http");
const numCPUs = require("node:os").cpus().length;
const process = require("node:process");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = require('./app')

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker, code, signal) =>
    console.log(`worker ${worker.process.pid} died`)
  );
} else {
  http
    .createServer(app)
    .listen(PORT, err => {
        if(err) throw new Error(err);
        console.log(`Server Running => http://localhost:${PORT}`);
    });

  console.log(`\nWorker ${process.pid} started`);
}