const canvasEl = document.querySelector('#jsCanvas')
const ctx = canvasEl.getContext('2d')
const colorEl = document.querySelectorAll('.controls__color')
const brush = document.querySelector('#jsRange')
const mode = document.querySelector('#jsMode')
const saveBtn = document.querySelector('#jsSave')

const CANVAS_SIZE = 700
const DEFAULT_COLOR = "#2c2c2c"

canvasEl.width = CANVAS_SIZE
canvasEl.height = CANVAS_SIZE

ctx.fillStyle ="white"
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
ctx.strokeStyle = DEFAULT_COLOR
ctx.fillStyle = DEFAULT_COLOR
ctx.lineWidth = 2.5

let painting = false
let filling = false

function onMouseMove(e){
  const x = e.offsetX
  const y = e.offsetY
  if(!painting){       
    ctx.beginPath()     
    ctx.moveTo(x,y)     
  }else{                
    ctx.lineTo(x,y)
    ctx.stroke()
  }
}

function onMouseDown(e){
  painting = true
}

function startPainting(){
  painting = true
}

function stopPainting(){
  painting = false
}

function changeColor(e){
  const color = e.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

colorEl.forEach(color => {
  color.addEventListener('click',changeColor)
})

function handleRangeChange(e){
  ctx.lineWidth = e.target.value
}

function handleModeChange(e){
  if(filling === true){
    filling =false
    mode.innerText = "Fill"
  }else{
    filling = true
    mode.innerText = "Paint"
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
  }
}

function handleCM(e){
  e.preventDefault()
}

function handleSaveClick(){
  const image = canvasEl.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = "PaintImg"
  link.click()
}

if(canvasEl){
  canvasEl.addEventListener('mousemove',onMouseMove)
  canvasEl.addEventListener('mousedown',startPainting)
  canvasEl.addEventListener('mouseup',stopPainting)
  canvasEl.addEventListener('mouseleave',stopPainting)  
  canvasEl.addEventListener('click', handleCanvasClick)
  canvasEl.addEventListener('contextmenu',handleCM)
}

if(brush){
  brush.addEventListener('input',handleRangeChange)
}

if(mode){
  mode.addEventListener('click',handleModeChange)
}

if(saveBtn){
  saveBtn.addEventListener('click',handleSaveClick)
}