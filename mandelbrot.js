var SIZE = 66;

var plus = function(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
};

var square = function(a) {
  return [(a[0] * a[0]) - (a[1] * a[1]), 2 * a[0] * a[1]];
};

var less_than_2 = function(a) {
  return ((a[0] * a[0]) + (a[1] * a[1])) <= 4;
};

var parse_z = function(z) {
  if (m = /(-?\d*\.?\d*)i *([+\-]) *(-?\d+\.?\d*)/.exec(z)) {
    return [parseFloat(m[3]) * (m[2] === '-' ? -1 : 1),
            parseFloat(m[1] || 1)];
  } else if (m = /(-?\d+\.?\d*) *([+\-]) *(-?\d*\.?\d*)i/.exec(z)) {
    return [parseFloat(m[1]),
            parseFloat(m[3] || 1) * (m[2] === '-' ? -1 : 1)];
  } else {
    throw '"' + z + '" is not a complex number';
  }
};

var p = function(z, c) {
  return plus(square(z), c);
};

var iter = function(n, c) {
  var i, z = [0, 0];
  for (i = 0; i < n; i++) {
    z = p(z, c);
    if (! less_than_2(z)) {
      return i;
    }
  }
  return null;
};

var center = parse_z(process.argv[2]);
var range = parseFloat(process.argv[3]);
var step = range * 2 / SIZE;
var gradient = -3.5 * Math.log(range);
var precision = gradient + 20;

var mandelbrot = function(c, n) {
  var res = iter(n, c);
  if (res === null) {
    return ' ';
  } else if (res < gradient + 10) {
    return '░';
  } else if (res < gradient + 14) {
    return '▒';
  } else if (res < gradient + 18) {
    return '▓';
  } else {
    return '█';
  }
};

for (var i = center[1] + range; i > center[1] - range; i -= step) {
  for (var r = center[0] - range; r < center[0] + range; r += step) {
    process.stdout.write(mandelbrot([r, i], precision));
  }
  process.stdout.write("\n");
}
