require('dotenv').config();

let fs = require('fs'),
    blessed = require('blessed'),
    contrib = require('blessed-contrib'), // not in use yet
    List = require('prompt-list'),
    // screen = blessed.screen(),
    env = process.env,
    path = './app/config/',
    conf;

fs.readFile(path + 'conf.json', (err, content) => {
  if (err) throw err;

  conf = JSON.parse(content);

  if (conf.first) {
    setup();
  } else {
    run();
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
  let Module = require(`./services/${conf.preferred}.js`);
  let Service = new Module;

  Service.auth(conf);
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
