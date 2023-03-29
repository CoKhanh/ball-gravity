import utils, { randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const gravity = 1
const friction = 0.99

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init(100)
})

const spawn = document.getElementById('spawn');
spawn.addEventListener('click', () => {
  const numberBall = document.getElementById('number-ball');
  const val = numberBall.value
  if (Number(val) > 0) {
    init(val)
  }
})

addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const numberBall = document.getElementById('number-ball');
    const val = numberBall.value
    if (Number(val) > 0) {
      init(val)
    } else {
      init(100)
    }
  }
})


// Objects
class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius
    this.red = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 1)`
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()

    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

// Implementation
let objects
function init(numberBall) {
  objects = []

  for (let i = 0; i < numberBall; i ++) {
    const radius = randomIntFromRange(2, 20);
    // sub canvas height to prevent ball spawned at the screen side
    const x = randomIntFromRange(0, canvas.width - radius);
    // sub canvas height to prevent ball spawned at the bottom
    const y = randomIntFromRange(0, canvas.height - 100);
    const dx =  randomIntFromRange(-2, 2)
    objects.push(
      new Ball(x, y, dx, 1, radius)
    )
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
   object.update()
  })
}

init(100)
animate()
