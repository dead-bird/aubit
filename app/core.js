require('dotenv').config();

let List = require('prompt-list'),
    fs   = require('fs'),
    base = './app/config/',
    env  = process.env;

let self = module.exports = {
  save: (conf) => {
    fs.writeFile(self.path.config, JSON.stringify(conf), 'utf8', (err) => {
      if (err) throw err;

      return true;
    });
  },
  reset: (callback) => {
    fs.readFile(self.path.default, (err, content) => {
      if (err) throw err;

      fs.writeFile(self.path.config, content, 'utf8', (err) => {
        if (err) throw err;

        return self.setup(JSON.parse(content), callback);
      });
    });
  },
  getConfig: (callback) => {
    fs.readFile(self.path.config, (err, content) => {
      if (err) throw err;

      return callback(JSON.parse(content));
    });
  },
  checkConfig: () => {
    return fs.existsSync(self.path.config);
  },
  setup: (conf, callback) => {
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

      self.save(conf);

      callback(conf);
    });
  },
  path: {
    config: `${base}conf.json`,
    default: `${base}default.json`
  }
}
