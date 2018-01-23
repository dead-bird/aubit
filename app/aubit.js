require('dotenv').config();

let fs = require('fs'),
    blessed = require('blessed'),
    contrib = require('blessed-contrib'), // not in use yet
    screen = blessed.screen(),
    env = process.env,
    file = './app/conf.json',
    conf = {user:'', access:'', refresh:''},
    arg = process.argv.slice(2);

if (arg) {
  auth()
}

function auth() {
  console.log(`https://accounts.spotify.com/en/authorize?response_type=code&client_id=${env.CLIENT}&redirect_uri=${env.REDIRECT}&scope=${env.SCOPE}`);
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
