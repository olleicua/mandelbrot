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

var color = function(res, precision) {
  var i = Math.floor(precision - res);
  i = i > 23 ? 23 : i;
   return 232 + i;
}

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
var gradient = -5.5 * Math.log(range);
var precision = gradient + 20;

var mandelbrot = function(c, n, ch) {
  var res = iter(n, c);
  if (res === null) {
    return '[38;5;201m' + ch + '[0m';
  } else {
    return '[38;5;' + color(res, precision) + 'm' + ch + '[0m';
  }
};

for (var i = center[1] + range; i > center[1] - range; i -= step) {
  for (var r = center[0] - range; r < center[0] + range; r += step) {
    if (center[1] < i && center[0] < r &&
        Math.abs(center[1] - i) < step &&
        Math.abs(center[0] - r) < step) {
      process.stdout.write(mandelbrot([r, i], precision, '█'));
    } else {
      process.stdout.write(mandelbrot([r, i], precision, '▒'));
    }
  }
  process.stdout.write("\n");
}

