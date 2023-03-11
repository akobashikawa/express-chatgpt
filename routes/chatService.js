// const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

const service = {
    history: null,
    openai: null,
    model: '',
    // max_tokens: 0,
    holdHistory: null,

    create({model, max_tokens}) {
        const obj = Object.create(this);
        this.history = {};
        // this.model = model || "text-davinci-003";
        this.model = model || "gpt-3.5-turbo";
        // this.max_tokens = max_tokens || 50;
        this.holdHistory = false;
        return obj;
    },

    setConfig(config) {
        this.model = config.model;
        // this.max_tokens = config.max_tokens;
        this.holdHistory = config.holdHistory;

        // const configuration = new Configuration({ 
        //     apiKey: config.apiKey
        // });

        // this.openai = new OpenAIApi(configuration);

        if (this.holdHistory) {
            this.history[config.apiKey] = [];
        }

    },

    async processPrompt(prompt, apiKey) {
        try {
            // const completion = await this.openai.createCompletion({
            //     model: this.model,
            //     prompt,
            //     // max_tokens: this.max_tokens,
            // });

            // const response = completion.data.choices[0].text;

            const url = 'https://api.openai.com/v1/chat/completions';
            const body = {
                "model": this.model,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            };
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            };

            const completionResponse = await axios.post(url, body, { headers });
            const response = completionResponse.data.choices[0].message.content;

            if (this.holdHistory) {
                this.history[apiKey].push({
                    prompt, response
                });
            }

            return response;
        } catch (error) {
            throw error;
        }
    },

    getHistory(apiKey) {
        // console.log(this.history[apiKey]);
        return this.history[apiKey];
    },

    clearHistory(apiKey) {
        this.history[apiKey] = [];
    },

};

module.exports = service;