require('dotenv');

let fs = require('fs'),
    core = require('./core.js'),
    blessed = require('blessed'),
    contrib = require('blessed-contrib'), // not in use yet
    // screen = blessed.screen(),
    env = process.env;

if (core.checkConfig()) {
  core.getConfig(run)
} else {
  core.reset(run);
}

function run(conf) {
  let service = require(`./services/${conf.preferred}.js`);

  service.auth(conf, (conf) => {
    core.save(conf);
    
    service.getNowPlaying(conf);
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
