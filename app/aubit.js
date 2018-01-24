require('dotenv').config();

let fs = require('fs'),
    blessed = require('blessed'),
    contrib = require('blessed-contrib'), // not in use yet
    axios = require('axios'),
    // screen = blessed.screen(),
    env = process.env,
    file = './app/conf.json',
    conf = {access:'', refresh:''},
    arg = process.argv.slice(2)[0],
    base = 'https://accounts.spotify.com/api';

if (arg) {
  auth(arg);
}

function auth(code) {
  axios.get(`${base}/token`, {
      params: {
        code: code,
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










// if (conf.user) {
//   run();
// } else {
//   console.log('visit http://www.example.com and grab the generated token. Paste that badboy in conf.json and re-run the app');
// }


// fs.writeFile(conf, JSON.stringify({access:'test', refresh:'test'}), 'utf8', function(err) {
//   if(err) throw err;
// });

// fs.readFile(conf, function(err, content) {
//   if(err) throw err;

//   let data = JSON.parse(content);

//   console.log(data.access);
// });


// screen.title = 'title of song I guess?';

// let box = blessed.box({
//   top: 'center',
//   left: 'center',
//   width: '100%',
//   height: '100%',
//   content: ascii,
//   tags: true,
//   align: 'center',
//   style: {
//     fg: 'white',
//   }
// });

// screen.append(box);

// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//   return process.exit(0);
// });

// box.focus();

// screen.render();

console.log('whattup, it\'s me, ya boy');
