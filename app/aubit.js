let blessed = require('blessed'),
    contrib = require('blessed-contrib'), // not in use yet
    screen = blessed.screen();

let ascii = `
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdddmmmmmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmddmmmmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmddmmmmmmddmmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdysshmmmddmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmddmmmmh:::/mmmmddmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmdddmmdyosymmmmmddmmmmmmm
mmmmmmmmmmddddddddddmmmmmmmmddmmmmmddmmmmmddmmmmmm
mmmmmmmdddhysoooosyhhdddmmmmmddmmmmmddmmmmmddmmmmm
mmmmmddhy+:-..'''..-/ohddmmmmmmdmmmmmddmmmmmdmmmmm
mmmmddy+-.'''''''''''.:shddmmmmddmmmmmdmmmmmdmmmmm
mmmddy/.'''''''''''''''-ohdmmmmdhdmmmmdmmmmmddmmmm
mmmdh+.''''''''''''''''.:sddmmdooosmmmdmmmmmmdmmmm
mmddy/.'''''''''''''''''-shdmmdsooymmmddmmmmmdmmmm
mmmdh+.''''''''''''''''.:sddmmmmddmmmmdmmmmmmdmmmm
mmmdds:.'''''''''''''''-ohdmmmmmdmmmmmdmmmmmddmmmm
mmmmddy/.''''''''''''.-ohdmmmmmddmmmmddmmmmmdmmmmm
mmmmmddhs/-..'''''..:+yddmmmmmddmmmmmdmmmmmddmmmmm
mmmmmmmddhyso++++osyhdddmmmmmddmmmmmddmmmmmdmmmmmm
mmmmmmmmmdddddddddddmmmmmmmmddmmmmmddmmmmmddmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmdddmmmmdddmmmmmddmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmddmmmmmddmmmmmmddmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdddmmmdhyhdmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmddmmmmmssssdmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmddhhhmmmmmmmmmm
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdddmmmmmmmmmmmmmm
`

screen.title = 'title of song I guess?';

let box = blessed.box({
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  content: ascii,
  tags: true,
  align: 'center',
  style: {
    fg: 'white',
  }
});

screen.append(box);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

box.focus();

screen.render();

console.log('whattup, it\'s me, ya boy');
