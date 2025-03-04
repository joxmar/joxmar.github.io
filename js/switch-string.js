/**
 *  simulate a pull string thingy
 *  not self contained, so only does one on the page, but that could be updated
 */

// some settings
const BEAD_COUNT = 15;
const BEAD_SIZE = 2; // radius for beads
const BEAD_DIST = 90 / (BEAD_COUNT + 2); // how far apart beads should be. 400 is canvas size, so we're just dividing it
const INITIAL_X_MOMENTUM = -6; // x speed / second of bottom bead when the click happens
const GRAVITY = 12; // downward acceleration / second
const X_FRICTION = 0.01; // constant decrease in x acceleration / second
var img = new Image();

// helpers
function pythag(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
function getAngle(x1, y1, x2, y2) {
  return Math.atan((y2 - y1) / (x2 - x1));
}

// setup canvas
var canvas = stringCanvas;
var ctx = canvas.getContext('2d');
var running = true;
var lit = switchInp.checked;

// beads
class Bead {
  constructor(initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
    this.speedX = 0;
    this.speedY = 0;

    this.parent = {
      x: canvas.width / 2,
      y: 0,
    };
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - BEAD_SIZE);
    ctx.arc(this.x, this.y, BEAD_SIZE, 0, Math.PI * 2, false);

    var grd;
    if (lit) {
      ctx.fillStyle = '#FFFFFF';
      img.src = 'images/sun.svg';
    } else {
      ctx.fillStyle = '#11090b';
      img.src = 'images/moon.svg';
    }
    // add img at the end of the beads
    ctx.drawImage(
      img,
      beads[BEAD_COUNT - 1].x - 6,
      beads[BEAD_COUNT - 1].y + 2,
      20,
      20
    );

    ctx.fillStyle = 'FF0000';
    ctx.fill();
    ctx.restore();
  }

  drawLine() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.parent.x, this.parent.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  }

  setParent(parentBead) {
    this.parent = parentBead;
  }

  setSpeed(x, y) {
    this.speedX = x;
    this.speedY = y;
  }

  addMomentum(x, y) {
    this.speedX += x;
    this.speedY += y;
  }

  updateMomentum(deltaTime) {
    // gravity
    this.speedY += (GRAVITY * deltaTime) / 1000;
    if (Math.abs(this.speedX < this.speedX - (X_FRICTION * deltaTime) / 1000))
      this.speedX = 0;
    else
      this.speedX =
        this.speedX > 0
          ? this.speedX - (X_FRICTION * deltaTime) / 1000
          : this.speedX + (X_FRICTION * deltaTime) / 1000;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  positionBasedOnParent() {
    // check distance from parent
    if (this.parent) {
      let d = pythag(this.x, this.y, this.parent.x, this.parent.y);
      if (d > BEAD_DIST) {
        let a = getAngle(this.x, this.y, this.parent.x, this.parent.y);
        let dx = Math.cos(a) * (d - BEAD_DIST);
        let dy = Math.sin(a) * (d - BEAD_DIST);
        if (this.x > this.parent.x) {
          dx *= -1;
          dy *= -1;
        }
        //console.log(d, (a * 180 / Math.PI), dx, dy);

        if (this.parent instanceof Bead) {
          this.x += dx / 2;
          this.y += dy / 2;
          this.speedX += dx / 2;
          this.speedY += dy / 2;

          this.parent.x -= dx / 2;
          this.parent.y -= dy / 2;
          this.parent.speedX -= dx / 2;
          this.parent.speedY -= dy / 2;
        } else {
          this.x += dx;
          this.y += dy;
          this.speedX += dx;
          this.speedY += dy;
        }
      }
    }
  }
}
var beads = [];
for (let i = 0; i < BEAD_COUNT; i++) {
  beads.push(new Bead(canvas.width / 2, i * BEAD_DIST + BEAD_SIZE));
  if (i > 0) beads[i].setParent(beads[i - 1]);
}

// the loop for animation
function init() {
  var lastTime = new Date().getTime();
  (function loop() {
    let now = new Date().getTime();
    let deltaTime = now - lastTime;
    if (running) {
      // console.log('run');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (beads[0].parent.y !== 0) {
        ctx.strokeStyle = lit ? '#c2cdd1' : '#737777';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, beads[0].parent.y);
        ctx.stroke();
      }

      ctx.strokeStyle = lit ? '#baaf62' : '#3d392d';
      ctx.fillStyle = lit ? '#544f3f' : '#2c2a1e';

      // split into 2 so we can double down on positioning constraints
      beads.forEach(function (bead) {
        //console.log(bead);
        bead.updateMomentum(deltaTime);
        bead.move();
        bead.positionBasedOnParent();
      });
      for (let i = 0; i < 20; i++) {
        beads.forEach(function (bead) {
          bead.positionBasedOnParent();
        });
      }
      beads.forEach(function (bead) {
        bead.drawLine();
      });
      beads.forEach(function (bead) {
        bead.draw();
      });
    }

    lastTime = now;
    requestAnimationFrame(loop);
  })();
}

canvas.addEventListener('mouseup', function () {
  beads[BEAD_COUNT - 1].addMomentum(INITIAL_X_MOMENTUM, 0);
  //beads[0].addMomentum(0, GRAVITY * -4);
  beads[0].parent.y = 0;
  running = true;
});
canvas.addEventListener('mousedown', function () {
  beads[0].parent.y = BEAD_DIST * 2;
  running = true;
});

// turn off when document not visible
document.addEventListener('visibilitychange', function () {
  lastTime = new Date().getTime();
  running = !document.hidden;
});

// change lit state
switchInp.addEventListener('change', function (e) {
  lit = this.checked;
  if (lit) document.querySelector('body').classList.add('dark-mode');
  else document.querySelector('body').classList.remove('dark-mode');
});

init();
