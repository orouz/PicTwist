export default class Twist {
  constructor(el, options = {}) {

    if (!el instanceof Element || el.tagName !== 'IMG') 
      throw new Error(`PicTwist expects an <img> element, can't work like this man. come on..`)

    this.el = el
    const defaults = ['red', 'green', 'blue', 'alpha'].reduce((a, c) => { a[c] = x => x; return a}, {})
    this.setOptions(options, defaults)
    this.setCanvasPosition()
    this.loadImage()
  }
  get height() {
    return this.el.height
  }
  get width() {
    return this.el.width
  }
  setOptions(options, defaults) {

    this.options = Object.assign({}, defaults, options)
  }
  setCanvasPosition() {

    const canvas = document.createElement('canvas')
    const props = this.el.getClientRects()[0]
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas

    canvas.width = this.width
    canvas.height = this.height
    canvas.style.position = 'absolute'
    canvas.style.left = props.left + 'px'
    canvas.style.top = props.top + 'px'

    document.body.appendChild(canvas)
  }

  loadImage() {
    const img = new Image(this.width, this.height)
    img.crossOrigin = "Anonymous";
    img.src = this.el.getAttribute('src')
    img.onload = this.drawImage.bind(this)
    this.img = img
  }
  drawImage() {

    this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
    this.imgData = this.ctx.getImageData(0, 0, this.width, this.height)
    this.setColors()
  }

  setColors() {
    const {ctx, options} = this
    const data = this.imgData.data
    for (var i = 0; i < data.length; i += 4) {

      data[i] = options.red(data[i])
      data[i + 1] = options.green(data[i + 1])
      data[i + 2] = options.blue(data[i + 2])
      data[i + 3] = options.alpha(data[i + 3])

    }
    ctx.putImageData(this.imgData, 0, 0);
  }
  updateOptions(options) {
    this.setOptions(options, this.options)
    this.setColors()
  }
  destroy() {
    document.body.removeChild(this.canvas)
  }
}
