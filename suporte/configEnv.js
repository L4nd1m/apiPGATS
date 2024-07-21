require('dotenv').config();

module.exports = {
    URLS: {
        ROTA_ENDPOINT: process.env.URL_BASE,
        ROTA_CONTEUDOS: process.env.URL_CONTEUDOS,
    },

    HEADERS: {
        API_TOKEN: { "token": "uiyeqwuiyeqiuy321" },
        CONTENT_TYPE: {"accept": "application/json"}
    }
};