require('dotenv').config();

let fs = require('fs'),
    blessed = require('blessed'),
    contrib = require('blessed-contrib'), // not in use yet
    axios = require('axios'),
    List = require('prompt-list'),
    // screen = blessed.screen(),
    env = process.env,
    path = './app/config/',
    base = 'https://accounts.spotify.com/api',
    conf;

fs.readFile(path + 'conf.json', (err, content) => {
  if(err) throw err;

  conf = JSON.parse(content);

  if (conf.first) {
    setup();
  } else {
    reset();
  }
});

function setup() {
  let list = new List({
    name: 'service',
    message: 'What service would you like to use?',
    choices: [
      'spotify',
      'apple-music',
      'google-play'
    ]
  });

  list.ask((answer) => {
    conf.first = false;
    conf.preferred = answer;
    save();

    run();
  });
}

function run() {
  let module = require(`./services/${conf.preferred}.js`)
  let service = new module;

  service.init();
}

function save() {
  fs.writeFile(path + 'conf.json', JSON.stringify(conf), 'utf8', (err) => {
    if(err) throw err;
  });
}

function reset() {
  fs.readFile(path + 'default.json', (err, content) => {
    if(err) throw err;

    fs.writeFile(path + 'conf.json', content, 'utf8', (err) => {
      if(err) throw err;
    });
  });
}


// if (arg) {
//   auth(arg);
// }

// function auth(code) {
//   axios.get(`${base}/token`, {
//       params: {
//         code: code,
//         redirect_uri: env.REDIRECT,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(`${env.CLIENT}:${env.SECRET}`).toString('base64'))
//       },
//     })
//     .then(function(res) {
//       console.log(res);
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
// }










// if (conf.user) {
//   run();
// } else {
//   console.log('visit http://www.example.com and grab the generated token. Paste that badboy in conf.json and re-run the app');
// }


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
