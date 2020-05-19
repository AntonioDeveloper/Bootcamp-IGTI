window.addEventListener('load', start);

var caixaR = document.querySelector('#redNum');

var caixaG = document.querySelector('#greenNum');

var caixaB = document.querySelector('#blueNum');

var sheets = document.styleSheets[0];

function start() {
  console.log('ok');

  var initialValueR = 0;
  caixaR.value = initialValueR;

  var initialValueG = 0;
  caixaG.value = initialValueG;

  var initialValueB = 0;
  caixaB.value = initialValueB;

  /*
    var b = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
    document.documentElement.style.setProperty('--background-color', 'pink');
    console.log(b); */
}

window.addEventListener('change', update);

function update() {
  var barraR = document.querySelector('#red').value;
  console.log(barraR);
  caixaR.value = barraR;

  var barraG = document.querySelector('#green').value;
  console.log(barraG);
  caixaG.value = barraG;

  var barraB = document.querySelector('#blue').value;
  console.log(barraB);
  caixaB.value = barraB;

  var numR = barraR.toString();
  var numG = barraG.toString();
  var numB = barraB.toString();

  var todos = numR + numG + numB;

  var hex = '#' + parseInt(todos);

  console.log(todos);
  console.log(hex);

  // sheets.addRule('.blocoCor', '--background-color;');
  getComputedStyle(document.documentElement).getPropertyValue('background-color');
  document.documentElement.style.setProperty('--color', 'rgb(' + barraR + ',' + barraG + ',' + barraB + ')');
}





