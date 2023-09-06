const { Worker } = require("worker_threads");

async function doIt() {

  const items = Array.from({ length: 2000 }, (value, index) => index);

  const pool = new Set();
  const poolSize = 2000;

  const chunkSize = items.length / poolSize;

  for(let i = 0; i < poolSize; i++) {
    const worker = new Worker("./worker.js", { name: i.toString() });

    worker.postMessage(items.slice(i * chunkSize, i * chunkSize + chunkSize));

    worker.on("message", (message) => {
      //console.log(message);
    });

    worker.on("exit", (message) => {
      pool.delete(worker);

      if(pool.size === 0) {
        console.log("Finalizado");
      }
    });

    pool.add(worker);
  }
}

doIt();