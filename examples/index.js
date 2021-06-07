const Amotion = require("../dist");

const app = new Amotion();

(async () => {
  await app.start(3000);
})();
