const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const wall_sound = new Audio('./sound/wallHitSound.wav')
const strik_sound = new Audio('./sound/hitSound.wav')
const game_sound = new Audio('./sound/POL-two-fat-gangsters-short.wav')


let net_width = 5

// paddle object 
let paddle = {
     y: 200,
     ph: 100,
     x: 10,
     score: 0
}







// ball object 
const ball = {
     x: canvas.width / 2,
     y: canvas.height / 2,
     radius: 10,
     dx: 11,
     dy: 11
}

// computer object
const comp = {
     y: 200,
     ch: 100,
     x: canvas.width - 20,
     score: 0,
     dy: 5
}




let speed = 8
let min_score = 10

const keys = {
     w: false,
     x: false,
     o: false,
     m: false
}

window.addEventListener('keyup', keyup)
window.addEventListener('keydown', keydown)

function keydown(e) {
     keys[e.key] = true
}
function keyup(e) {
     keys[e.key] = false

}


// net 
function draw_net() {
     c.beginPath()
     c.fillStyle = '#fff'
     c.fillRect(canvas.width / 2, 0, net_width, canvas.height)
     c.stroke()
}
// ball
function draw_ball() {
     c.beginPath()
     c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false)
     c.fillStyle = 'red'
     c.fill()
     c.stroke()
}
// paddle
function draw_paddle() {
     c.beginPath()
     c.fillStyle = 'yellow'
     c.fillRect(paddle.x, paddle.y, 10, paddle.ph)
     c.stroke()
}
function draw_comp() {
     c.beginPath()
     c.fillStyle = 'yellow'
     c.fillRect(comp.x, comp.y, 10, comp.ch)
     c.stroke()
}

function reset_ball() {
     ball.x = canvas.width / 2
     ball.y = canvas.height / 2
     ball.radius = 10
}

let player_s  = 0

function score1() {
     c.font = "30px Arial"
          c.fillText(`${comp.score}`,canvas.width/4+450,canvas.height/15)
}

function score2() {
     c.font = "30px Arial"
          c.fillText(`${paddle.score}`,canvas.width/4,canvas.height/15)
}

// functions 

function update() {
     draw_paddle()
     draw_ball()
     draw_net()
     draw_comp()
     score1()
     score2()
     if (keys.w) {
          if (paddle.y >= 0) {
               paddle.y -= speed
          }
     }
     if (keys.x) {
          if (paddle.y <= 400) {
               paddle.y += speed
          }
     }
     if (keys.o) {
          if (comp.y >= 0) {
               comp.y -= speed
          }
     }
     if (keys.m) {
          if (comp.y <= 400) {
               comp.y += speed
          }
     }


     if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
          ball.dy = -ball.dy
     }

     ball.x -= ball.dx
     ball.y += ball.dy


     if (ball.x - ball.radius <= paddle.x + 10 && (ball.y+ball.radius >= paddle.y && ball.y <= paddle.y+ball.radius + paddle.ph)) {
          ball.dx = -ball.dx
          strik_sound.play()
     }
     if (ball.x - ball.radius > comp.x - 20 && (ball.y+ball.radius >= comp.y && ball.y <= comp.y+ball.radius + paddle.ph)) {
          ball.dx = -ball.dx
          strik_sound.play()
     }


     if (ball.x < 0) {
          wall_sound.play()
          reset_ball()
          comp.score++
          c.font = "30px Arial"
          c.fillText(`${comp.score}`,canvas.width/4,canvas.height/15)
          if(comp.score == min_score){
               console.log("win")
              cancel()
          }
              
     }
     else if (ball.x >= canvas.width) {
          wall_sound.play()
          reset_ball()
          paddle.score++
          c.font = "30px Arial"
          c.fillText(`${paddle.score}`,canvas.width/4,canvas.height/15)
          if(paddle.score == min_score ){
               console.log("win")
               cancel()
          }
     }



}



function start() {
     game_sound.play()

     c.clearRect(0, 0, canvas.width, canvas.height)
     update();
     
    
     
    let  a =  window.requestAnimationFrame(start)
}

start()

console.log(a)



function cancel() {
     window.cancelAnimationFrame(a)
}























