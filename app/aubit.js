require('dotenv');

let fs       = require('fs'),
    blessed  = require('blessed'),
    core     = require('./core.js'),
    progress = require('cli-progress'),
    asciify  = require('asciify-image'),
    contrib  = require('blessed-contrib'), // not in use yet
    env      = process.env;

if (core.checkConfig()) {
  core.getConfig(run)
} else {
  core.reset(run);
}

function run(conf) {
  let service = require(`./services/${conf.preferred}.js`);

  service.auth(conf, (conf) => {
    core.save(conf);
    
    service.getNowPlaying(conf, (song) => {
      let options = {
        fit:    'box',
        width:  40,
        height: 40
      }

      asciify(song.artwork, options).then((ascii) => {
        let bar;

        screen = blessed.screen(),
        screen.title = `${song.status}: ${song.title} - ${song.album} - ${song.artist}`;

        let art = blessed.box({
          top: 'top',
          left: 'center',
          width: '100%',
          height: '95%',
          content: ascii,
          tags: true,
          align: 'center',
          style: {
            fg: 'white',
          }
        });

        let info = blessed.box({
          bottom: 0,
          left: 'center',
          width: '100%',
          height: '5%',
          // content: bar,
          content: `${song.title} - ${song.album} - ${song.artist}`,
          tags: true,
          align: 'center',
          style: {
            fg: 'white',
          }
        });

        screen.append(art);
        screen.append(info);

        screen.key(['escape', 'q', 'C-c'], function(ch, key) {
          return process.exit(0);
        });

        art.focus();

        screen.render();

        bar = new progress.Bar({
          barCompleteChar: '#',
          format: '{value}' + ' [{bar}] ' + '{eta_formatted}',
        }, progress.Presets.legacy);

        let length = Math.floor((song.length / 1000));
        let current = Math.floor((song.current / 1000));

        bar.start(length, current);

        let timer = setInterval(() => {
          current++;

          bar.update(current);

          if (current >= bar.getTotal()){
            clearInterval(timer);

            bar.stop();
          }
        }, 1000);
      });
    });
  });
}
