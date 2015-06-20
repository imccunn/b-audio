'use strict';

var baudio = require('baudio');
var tau = 2 * Math.PI;

var melody = [0, 5/4, 12/11, -3/2, 0, -1/3, 5/4, 5/2]
              .map(function(x) { return Math.pow(2, x)});

var b = baudio(function(t) {
  var f = 100 + (t % 5 === 0 ?  Math.sin(400 * (t % 1)) : Math.sin(500 * (t % 4))); 
  var m = melody[Math.floor(t * 2 % melody.length)];
  
  return ( 0.15 * sin(400 * m) + square(300 * m) + sin(f)) 
      
  / 3 * (
    t % 5 > 2 
      ? (square(2) + square(6))
      : (sin(1) + square(3))
    ) / 2 + (t % 2 < 1/2 ? 
            (t % 1/2 < 1/24 ? Math.random() : 0)
            : (t % 1/2 < 1/13 ? Math.random() : 0)); 

  function sin(freq) {
    return Math.sin(tau * t * freq);
  }

  function square(freq) {
    return Math.sin(tau * t * freq) < 0 ? -1 : 1;
  }


});

b.play();
