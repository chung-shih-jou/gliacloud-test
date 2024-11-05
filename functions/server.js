const express = require("express");
const cors = require("cors");
const aiService = require("./service/ai-video");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/ai-video", async (req, res) => {
  try {
    const data = await aiService.createOne(req.body.file);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: `cannot create` });
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.get("/ping", (_, res) => {
  res.send("hello world");
});

module.exports = app;
