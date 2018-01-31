// requires
let request = require('request'),
    http  = require('http'),
    url   = require('url'),
    opn   = require('opn'),
    fs    = require('fs');

// vars
let scope    = encodeURIComponent('streaming user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing'),
    base     = 'https://accounts.spotify.com',
    redirect = 'http://localhost:3102',
    env      = process.env,
    server;

let self = module.exports = {
  auth: (conf, callback) => {
    if (conf.spotify.code) {
      self.getRefresh();
    } else {
      self.getCode(conf, callback);
    }
  },
  getCode: (conf, callback) => {
    opn(`${base}/authorize/?client_id=${env.CLIENT}&redirect_uri=${redirect}&scope=${scope}&response_type=code`);

    server = http.createServer((req, res) => {
      fs.readFile('./app/callback/callback.html', (err, data) => {
        if (err) throw err;

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);

        let query = url.parse(req.url, true).query;

        if (query.code) {
          conf.spotify.code = query.code;
          self.getAccess(conf, callback);
        }

        res.end();
      });
    }).listen(3102);
  },
  getAccess: (conf, callback) => {
    server.close(() => { process.exit() });

    let auth = {
      url: `${base}/api/token`,
      form: {
        code: conf.spotify.code,
        redirect_uri: redirect,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(env.CLIENT + ':' + env.SECRET).toString('base64'))
      },
      json: true
    };

    request.post(auth, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        conf.spotify.access = body.access_token;
        conf.spotify.refresh = body.refresh_token;

        callback(conf);
      }
      else {
        console.log(err);
      }
    });
  },
  getRefresh: () => {
    console.log('refresh')
  }
}
