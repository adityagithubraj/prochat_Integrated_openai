const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send(" ProChat API");
});

app.post("/chat", async (req, res) => {
  const { chats } = req.body; // Assuming req.body is an object with "chats" property

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: chats,
      },
    ],
  });

  res.json({
    output: result.data.choices[0].message.content,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
