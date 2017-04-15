export default class PicTwist {
    constructor(el, options = {}) {

        if (!el instanceof Element || el.tagName !== 'IMG')
            throw new Error(`PicTwist expects an <img> element, can't work like this man. come on..`)


        const defaults = ['red','green','blue','alpah'].reduce((a,c) =>{a[c] = x => x; return a} ,{})
        this.options = Object.assign({}, defaults, options)
        this.el = el
        this.setCanvasPosition()
        this.loadImage()
    }

    setCanvasPosition() {
     
        const canvas = document.createElement('canvas')
        const props = this.el.getClientRects()[0]
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        
        canvas.width = this.el.width
        canvas.height = this.el.height
        canvas.style.position = 'absolute'
        canvas.style.left = props.left + 'px'
        canvas.style.top = props.top + 'px'

        document.body.appendChild(canvas)
    }

    loadImage() {
        const img = new Image()
        img.crossOrigin = "Anonymous";
        img.src = this.el.getAttribute('src')
        img.onload = this.draw.bind(this)
        this.img = img
    }
    draw() {

        const {ctx,img,options} = this
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, this.el.width, this.el.width)
        const data = imgData.data
        for (var i = 0; i < data.length; i += 4) {
            
            data[i]     = options.red(data[i])
            data[i + 1] = options.green(data[i + 1])
            data[i + 2] = options.blue(data[i + 2])
            data[i + 3] = options.alpah(data[i + 3])
        }
        ctx.putImageData(imgData, 0, 0);
    }
}



