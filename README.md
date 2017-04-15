# PicTwist 🖼️ 🔀 🌈 

### twist RGBA values of pixels in image elements


## Usage 
```
import Pictwist from 'pictwist' 

/* get img elements to play with */
const imgs = Array.from(document.querySelectorAll('img'))

/* 
set a transform function for each color property
that returns an integer between 0-256 
you get the current value as the only argument of the function 
 */
const options = {
        red: x => 256  // will set pixels to red  
        blue: x => Math.random() * 256, // will set pixels blueish 
        green: x => x // default, does nothing (optional) 
        alpah: x => x  // same 
}

/* run it  */
imgs.forEach(img => new Pictwist(img, options))

```

