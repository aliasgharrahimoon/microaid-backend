const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cors')());

app.post('/generate-proposal', (req, res) => {
  const { projectType, clientName } = req.body;
  if (!projectType || !clientName) {
    return res.status(400).json({ error: 'Missing projectType or clientName' });
  }
  res.json({
    proposal: `Mock proposal for a ${projectType} project for ${clientName}. Includes introduction, scope of work, and timeline.`
  });
});

app.post('/polish-email', (req, res) => {
  const { emailText } = req.body;
  if (!emailText) {
    return res.status(400).json({ error: 'Missing emailText' });
  }
  res.json({
    polishedEmail: `Mock polished email: ${emailText}`
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));