const { parentPort } = require("worker_threads");

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

parentPort?.on("message", async (items) => {
  for (let i = 0; i < items.length; i++) {
    await sleep();
    parentPort?.postMessage(items[i]);
  }

  parentPort?.close();
});
