
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import { SVG_NS, KEYS } from '../settings';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element); 
		// Other code goes here...
		this.board = new Board(this.width, this.height);

		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a, 
			KEYS.z,
			'player1'
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up, 
			KEYS.down,
			'player2'
		);

		this.ball = new Ball (8, this.width,	this.height);
		this.ball1 = new Ball (8, this.width,	this.height);
		this.ball2 = new Ball (6, this.width, this.height );


		document.addEventListener('keydown', event => {
			switch(event.key){
					case KEYS.spaceBar:
						this.pause = !this.pause;
					break;
			}//switch
	});//keydown event

	this.score1 = new Score(this.width / 2 -50, 30, 30);
	this.score2 = new Score(this.width / 2 +25, 30, 30);
	}//constructor

	render() {

		if(this.pause){
      return;
		}
	
		let p1w = document.getElementById('player1w');
		let p2w = document.getElementById('player2w');
					if (this.player1.score >= 25) {
						this.pause = 1,
						p1w.style.display = 'block';
		}else{p1w.style.display='none'}
		if(this.player2.score >=25){
						this.pause = 1,
						p2w.style.display='block';	
		}else{p2w.style.display='none'}
		
		this.gameElement.innerHTML = '';
		// More code goes here...
let svg = document.createElementNS(SVG_NS, 'svg');
svg.setAttributeNS(null, 'width', this.width);
svg.setAttributeNS(null, 'height', this.height);
svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

this.board.render(svg);

this.player1.render(svg);
this.player2.render(svg);

this.ball.render(svg, this.player1, this.player2);
this.ball1.render(svg, this.player1, this.player2);

if(this.player1.score >=7 || this.player2.score >= 7){
	this.ball2.render(svg, this.player1, this.player2);
}

this.score1.render(svg, this.player1.score);
this.score2.render(svg, this.player2.score);

this.gameElement.appendChild(svg);
	}

}