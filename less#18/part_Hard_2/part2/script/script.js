'use strict'


let elem = document.getElementById('cars'),
    startTime = null,
    endPos = 1000, // в пикселях
    duration = 5000; // в миллисекундах

function render(time) {
  if (time === undefined) {
    time = new Date().getTime();
  }
  if (startTime === null) {
    startTime = time;
  }

  elem.style.left = ((time - startTime) / duration * endPos % endPos) + 'px';
}

start.onclick = function() {
  (function animationLoop(){
    render();
    requestAnimationFrame(animationLoop, elem);
  })();
};



// let requestId = requestAnimationFrame(callback);

// cars.onclick = function () {

//   function requestId(x, timeFraction) {
//     return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
//   }
  // let start = Date.now();

  // let timer = setInterval(function () {
  //   let timePassed = Date.now() - start;

  //   cars.style.left = timePassed / 5 + 'px';

  //   if (timePassed > 4500) clearInterval(timer);

  // }, 20);
// };