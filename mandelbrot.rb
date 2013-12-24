$range = 2
$real = 0
$imaginary = 0

def zoom_in
  $range *= 2.0 / 3.0
end

def zoom_out
  $range /= 2.0 / 3.0
end

def move x, y
  $real += x * ($range.to_f / 4.0)
  $imaginary += y * ($range.to_f / 4.0)
end

loop do
  puts "node mandelbrot-color-shell.js #{$real}+#{$imaginary}i #{$range}"
  puts `node mandelbrot-color-shell.js #{$real}+#{$imaginary}i #{$range}`
  system('stty raw -echo')
  ch = STDIN.getc
  system('stty -raw echo')
  inp = if ch.kind_of? Integer then ch.chr else ch.chomp end
  case inp
  when 'w' then move(0, 1)
  when 's' then move(0, -1)
  when 'a' then move(-1, 0)
  when 'd' then move(1, 0)
  when 'z' then zoom_in
  when 'x' then zoom_out
  when 'q' then break
  end
end
