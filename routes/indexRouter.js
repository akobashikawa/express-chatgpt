const express = require('express');
const router = express.Router();

const chatService = require('./chatService').create({
  // model: "text-davinci-002",
  // max_tokens: 50,
});


router.get('/', (req, res, next) => {
  res.send('<h1>Express ChatGPT API</h1>');
});

router.put('/config', (req, res, next) => {
  const apiKey = req.body.apikey;
  const model = req.body.model;
  const max_tokens = req.body.max_tokens;
  const config = {apiKey, model, max_tokens};
  chatService.setConfig(config);
  res.json({
    message: 'api actualizado con nueva configuración',
    model,
    max_tokens,
  });
});

router.post('/prompts', async (req, res, next) => {
  const prompt = req.body.prompt;
  try {
    const response = await chatService.processPrompt(prompt);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/history', async (req, res, next) => {
  try {
    const response = await chatService.getHistory();
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/history', async (req, res, next) => {
  try {
    const response = await chatService.clearHistory();
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
