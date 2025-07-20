const express = require('express');
const { pipeline } = require('@xenova/transformers');
const app = express();

app.use(express.json());

let generator;
(async () => {
  try {
    generator = await pipeline('text-generation', 'Xenova/distilgpt2');
    console.log('AI model loaded successfully');
  } catch (error) {
    console.error('Error loading AI model:', error);
  }
})();

app.post('/generate-proposal', async (req, res) => {
  try {
    const { projectType, clientName } = req.body;
    if (!projectType || !clientName) {
      return res.status(400).json({ error: 'Missing projectType or clientName' });
    }
    const prompt = `Write a professional proposal for a ${projectType} project for ${clientName}. Include an introduction, scope of work, and timeline.`;
    const result = await generator(prompt, { max_length: 200 });
    res.json({ proposal: result[0].generated_text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate proposal' });
  }
});

app.post('/polish-email', async (req, res) => {
  try {
    const { emailText } = req.body;
    if (!emailText) {
      return res.status(400).json({ error: 'Missing emailText' });
    }
    const prompt = `Polish this email to sound professional and concise: ${emailText}`;
    const result = await generator(prompt, { max_length: 150 });
    res.json({ polishedEmail: result[0].generated_text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to polish email' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));