let axios = require('axios'),
    http = require('http'),
    url = require('url'),
    opn = require('opn'),
    fs = require('fs'),
    base = 'https://accounts.spotify.com/api',
    env = process.env,
    server,
    conf;

module.exports = class Spotify {
  auth(config) {
    conf = config;

    if (conf.spotify.code) {
      this.getRefresh();
    } else {
      this.getCode();
    }
  }

  getCode() {
    opn('http://localhost:8080/?code=12345678');

    server = http.createServer((req, res) => {
      fs.readFile('./app/callback/callback.html', (err, data) => {
        if (err) throw err;

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);

        let query = url.parse(req.url, true).query;

        if (query.code) {
          conf.spotify.code = query.code;
          this.getAccess();
        }

        res.end();
      });
    }).listen(8080);
  }

  getAccess() {
    server.close(() => { process.exit() });

    axios.get(`${base}/token`, {
      params: {
        code: conf.spotify.code,
        redirect_uri: env.REDIRECT,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(`${env.CLIENT}:${env.SECRET}`).toString('base64'))
      },
    })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  getRefresh() {
    console.log('refresh')
  }
}


function auth(code) {
}