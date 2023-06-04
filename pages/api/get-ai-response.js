const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": `¿Podrías definir ${req.query.link} para mí?` },
      ],
    });
  
    res.status(200).json(response.data);
  }
  