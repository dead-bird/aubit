// requires
let request = require('request'),
    http    = require('http'),
    url     = require('url'),
    opn     = require('opn'),
    progress = require('cli-progress'),
    fs      = require('fs');


// vars
let scope    = encodeURIComponent('streaming user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing'),
    auth     = 'https://accounts.spotify.com',
    base     = 'https://api.spotify.com/v1',
    redirect = 'http://localhost:3102',
    env      = process.env,
    server;

let self = module.exports = {
  getNowPlaying: (conf, callback) => {
    let options = {
      url: `${base}/me/player/currently-playing`,
      headers: { 'Authorization': 'Bearer ' + conf.spotify.access },
      json: true
    };

    request.get(options, (err, res, body) => {
      switch(res.statusCode) {
        case 200:
          let song = {
            status:  body.is_playing ? 'playing' : 'paused',
            title:   body.item.name,
            album:   body.item.album.name,
            artist:  body.item.album.artists[0].name,
            artwork: body.item.album.images[0].url,
            current: body.progress_ms,
            length:   body.item.duration_ms,
          }

          // console.log(song);

          return callback(song);

          break

        case 204:
          console.log('nothing playing');
          break;
      }
    });
  },
  auth: (conf, callback) => {
    if (conf.spotify.code) {
      self.getRefresh(conf, callback);
    } else {
      self.getCode(conf, callback);
    }
  },
  getCode: (conf, callback) => {
    opn(`${auth}/authorize/?client_id=${env.CLIENT}&redirect_uri=${redirect}&scope=${scope}&response_type=code`);

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

    let options = {
      url: `${auth}/api/token`,
      form: {
        grant_type:   'authorization_code',
        redirect_uri: redirect,
        code:         conf.spotify.code,
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(env.CLIENT + ':' + env.SECRET).toString('base64'))
      },
      json: true
    };

    request.post(options, (err, res, body) => {
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
  getRefresh: (conf, callback) => {
    let options = {
      url: `${auth}/api/token`,
      form: {
        refresh_token: conf.spotify.refresh,
        grant_type:    'refresh_token',
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(env.CLIENT + ':' + env.SECRET).toString('base64'))
      },
      json: true
    };

    request.post(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        conf.spotify.access = body.access_token;

        callback(conf);
      }
      else {
        console.log(err);
      }
    });
  }
}
