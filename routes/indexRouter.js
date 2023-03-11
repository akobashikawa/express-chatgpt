const express = require('express');
const router = express.Router();
const showdown  = require('showdown');
converter = new showdown.Converter();

const chatService = require('./chatService').create({
  // model: "text-davinci-002",
  // max_tokens: 50,
});

function getApiKey(req) {
  const authorization = req.headers.authorization;
  const authorizationParts = authorization.split(' ');
  const apiKey = authorizationParts.length ==  2 ? authorizationParts[1] : false;
  return apiKey;
}

function sendErrorMessage(res, error) {
  // const message = error.response || error.message || error;
  // const status = error.response ? error.response.status : 500;
  // return res.status(status).send(message);
  return res.status(500).send(error);
}

router.get('/', (req, res, next) => {
  res.send('<h1>Express ChatGPT API</h1>');
});

router.put('/config', (req, res, next) => {
  // console.log(req.body);
  const apiKey = req.body.apikey;
  const model = req.body.model;
  // const max_tokens = req.body.max_tokens;
  const holdHistory = req.body.holdHistory;
  // const config = {apiKey, model, max_tokens, holdHistory};
  const config = {apiKey, model, holdHistory};
  chatService.setConfig(config);
  res.json({
    message: 'apiKey actualizado',
    model,
    // max_tokens,
  });
});

router.post('/prompts', async (req, res, next) => {
  const apiKey = getApiKey(req);
  if (!apiKey) {
    return res.status(401).send('apiKey no especificado');
  }

  const prompt = req.body.prompt;
  try {
    const response = await chatService.processPrompt(prompt, apiKey);
    const responseHTML = converter.makeHtml(response);
    // console.log('/prompts', response);
    res.json(responseHTML);
  } catch (error) {
    sendErrorMessage(res, error);
  }
});

router.get('/history', async (req, res, next) => {
  const apiKey = getApiKey(req);
  try {
    const response = await chatService.getHistory(apiKey);
    res.json(response);
  } catch (error) {
    sendErrorMessage(res, error);
  }
});

router.delete('/history', async (req, res, next) => {
  const apiKey = getApiKey(req);
  try {
    const response = await chatService.clearHistory(apiKey);
    res.json(response);
  } catch (error) {
    sendErrorMessage(res, error);
  }
});

module.exports = router;
