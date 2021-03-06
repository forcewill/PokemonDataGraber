var cheerio = require('cheerio'),
    request = require('request');

class PokedexUrlGraber {
    getUrls(logger) {
        this.logger = logger;
        return new Promise((resolve, reject) => {
            request({
                uri: 'https://fevgames.net/pokedex'
            }, (error, response, body) => {
                if (error) {
                    reject(err); return;
                }

                let urls = [];
                let $ = cheerio.load(body);

                $(".pokedex-item").each((index, element) => {
                    var url = $(element).attr('href');
                    this.logger('| Found ' + url);
                    urls.push(url);
                });
                resolve(urls);
            });
        });

    }
}

module.exports = PokedexUrlGraber;