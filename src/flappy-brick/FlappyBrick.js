import React from 'react';
import bgPng from './bg.png';
import birdPng from './rickyt.png';
import fgPng from './fg.png';
import pipeNorthPng from './pipeNorth.png';
import pipeSouthPng from './pipeSouth.png';
import flyMp3 from './fly.mp3';
import scoreMp3 from './score.mp3';

const flyAudio = new Audio(flyMp3);
const scoreAudio = new Audio(scoreMp3);
const bgImg = new Image();
bgImg.src = bgPng;
const birdImg = new Image();
birdImg.src = birdPng;
const fgImg = new Image();
fgImg.src = fgPng;
const pipeNorthImg = new Image();
pipeNorthImg.src = pipeNorthPng;
const pipeSouthImg = new Image();
pipeSouthImg.src = pipeSouthPng;
const verticalGap = 160;
const horizontalGap = 75;
const gravity = 1.5;
let pipe = [];
let constant = undefined;
let score = 0;

class FlappyBrick extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  state = {
    bX: 10,
    bY: 150
  };

  onFlap = () => {
    flyAudio.play();
  };

  onScore = () => {
    scoreAudio.play();
  };

  updateAnimationState = () => {
    const { bX, bY } = this.state;
    const canvas = this.canvasRef.current;
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    this.setState({ bY: bY + gravity });
    for (let i = 0; i < pipe.length; i += 1) {
      constant = pipeNorthImg.height + verticalGap;
      pipe[i].x -= 1;
      if (pipe[i].x === horizontalGap) {
        pipe.push({
          x: canvas.width,
          y:
            Math.floor(Math.random() * pipeNorthImg.height) -
            pipeNorthImg.height
        });
      }

      if (
        (bX + birdImg.width >= pipe[i].x &&
          bX <= pipe[i].x + pipeNorthImg.width &&
          (bY <= pipe[i].y + pipeNorthImg.height ||
            bY + birdImg.height >= pipe[i].y + constant)) ||
        bY + birdImg.height >= canvas.height
      ) {
        score = 0;
        pipe = [
          {
            x: this.canvasRef.current.width,
            y: 0
          }
        ];

        this.setState({ bY: 150 });
      } else if (pipe[i].x === 5) {
        score += 1;
        this.onScore();
      }
    }
  };

  moveUp = () => {
    this.setState({ bY: this.state.bY - 25 });
    this.onFlap();
  };

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(bgImg, 0, 0);
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    pipe[0] = {
      x: this.canvasRef.current.width,
      y: 0
    };
    document.addEventListener('keydown', this.moveUp, false);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
    document.removeEventListener('keydown', this.moveUp, false);
  }

  componentDidUpdate() {
    const { bX, bY } = this.state;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(bgImg, 0, 0);
    ctx.drawImage(fgImg, 0, height - fgImg.height);
    for (let i = 0; i < pipe.length; i += 1) {
      ctx.drawImage(pipeNorthImg, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeSouthImg, pipe[i].x, pipe[i].y + constant);
    }
    ctx.drawImage(birdImg, bX, bY);
    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Score : ' + score, 10, canvas.height - 20);
    ctx.restore();
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} width="288" height="512" />
      </div>
    );
  }
}

export default FlappyBrick;
