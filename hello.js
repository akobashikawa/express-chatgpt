console.log("ChatGPT Hello");

const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
const organizationID = process.env.OPENAI_ORGANIZATION_ID;

const configuration = new Configuration({
    apiKey,
});

async function getModels() {
    try {
        const url = 'https://api.openai.com/v1/models';
        const headers = {
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Organization': organizationID,
        };
        const response = await axios.get(url, {headers});
        console.log(JSON.stringify(response.data, null, 4));
    } catch (error) {
        throw error;
    }
}

async function getAiResponse(prompt) {
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
    });

    const response = completion.data.choices[0].text;

    console.log(response);
}

async function getAiResponse2(prompt) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const body = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    }

    const completion = await axios.post(url, body, {headers});
    // console.log(completion.data);
    const response = completion.data.choices[0].message;

    console.log(response);
}

try {
    // getModels();
    // getAiResponse("Hola");
    getAiResponse2("Hola");
} catch (error) {
    console.log(error.response);
}
