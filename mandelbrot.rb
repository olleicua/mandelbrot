require 'terminfo'

$range = 2
$real = 0
$imaginary = 0

def zoom_in scale
  $range *= scale
end

def zoom_out scale
  $range /= scale
end

def move x, y
  $real += x * ($range.to_f / 6.0)
  $imaginary += y * ($range.to_f / 6.0)
end

loop do
  h, w = TermInfo.screen_size
  w -= 2
  h -= 7
  puts "WIDTH=#{w} HEIGHT=#{h} node mandelbrot-color-shell.js #{$real}+#{$imaginary}i #{$range}"
  puts `WIDTH=#{w} HEIGHT=#{h} node mandelbrot-color-shell.js #{$real}+#{$imaginary}i #{$range}`
  puts '(controls):'
  puts ' w,a,s,d: move; W,A,S,D: move faster'
  puts ' z,x: zoom in/out; Z,X: zoom in/out faster'
  puts ' q: quit'
  system('stty raw -echo')
  ch = STDIN.getc
  system('stty -raw echo')
  inp = if ch.kind_of? Integer then ch.chr else ch.chomp end
  case inp
  when 'w' then move(0, 1)
  when 's' then move(0, -1)
  when 'a' then move(-1, 0)
  when 'd' then move(1, 0)
  when 'z' then zoom_in(3.0 / 4.0)
  when 'x' then zoom_out(3.0 / 4.0)
  when 'W' then move(0, 2)
  when 'S' then move(0, -2)
  when 'A' then move(-2, 0)
  when 'D' then move(2, 0)
  when 'Z' then zoom_in(1.0 / 2.0)
  when 'X' then zoom_out(1.0 / 2.0)
  when 'q' then break
  end
end
