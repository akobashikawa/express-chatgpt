const { Configuration, OpenAIApi } = require("openai");

const service = {
    history: null,
    openai: null,
    model: '',
    max_tokens: 0,

    create({model, max_tokens}) {
        const obj = Object.create(this);
        this.history = [];
        this.model = model || "text-davinci-002";
        this.max_tokens = max_tokens || 50;
        return obj;
    },

    setConfig(config) {
        console.log(config);
        this.model = config.model;
        this.max_tokens = config.max_tokens;
        const configuration = new Configuration({ 
            apiKey: config.apiKey
        });
        this.openai = new OpenAIApi(configuration);
        console.log(this.openai);
    },

    async processPrompt(prompt) {
        try {
            console.log({
                model: this.model,
                prompt,
                max_tokens: this.max_tokens,
            });
            const completion = await this.openai.createCompletion({
                model: this.model,
                prompt,
                max_tokens: this.max_tokens,
            });
            const response = completion.data.choices[0].text;
            console.log(response);
            this.history.push({
                prompt, response
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    getHistory() {
        return this.history;
    }
};

module.exports = service;