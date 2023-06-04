const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const userInput = decodeURIComponent(req.query.link);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `Responde cómo el resultado de un test de personalidad, estos con mis gustos: "${userInput}"` },
    ],
  });

  res.status(200).json(response.data);
}
