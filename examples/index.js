const Amotion = require("../dist");
const fs = require("fs/promises");
const sfs = require("fs");

const app = new Amotion();

app.use((ctx) => {
  console.log(ctx);
  ctx.done();
});

app.get("/", async (ctx) => "<h1>Hello, world!</h1>");

app.get("/buffer", async (ctx) => {
  try {
    const buffer = await fs.readFile("./examples/example.png");
    ctx.send(buffer);
  } catch (e) {
    ctx.done(e);
  }
});

app.get("/stream", async (ctx) => {
  try {
    const stream = sfs.createReadStream("./examples/example.png");
    ctx.send(stream);
  } catch (e) {
    ctx.done(e);
  }
});

(async () => {
  await app.start(3000);
  console.log("App running... on http://localhost:3000");
})();
