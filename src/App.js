import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Snake from './Components/snake.js';
import Food from './Components/food.js';
import Help from './Components/help.js';
import Heading from './Components/heading.js';

const getRandomCoordinates = () => {
	let min = 1;
	let max = 98;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y]
}

const initialState = {
	food: getRandomCoordinates(),
	speed: 150,
	direction: null,
	snakeDots: [
		[0, 0],
		[2, 0]
	]
}

class App extends React.Component {

	state = initialState;

	componentDidMount() {
		setInterval(this.moveSnake, this.state.speed);
		document.onkeydown = this.onKeyDown;
	}

	componentDidUpdate() {
		this.checkIfOutOfBorders();
		this.checkIfCollapsed();
		this.checkIfEat();
	}

	// ADDED THIS
	startGame = () => this.setState({ direction: 'RIGHT' })


	onKeyDown = (e) => {
		e = e || window.event;
		switch (e.keyCode) {
			case 38:
				this.setState({ direction: 'UP' })
				break;
			case 40:
				this.setState({ direction: 'DOWN' })
				break;
			case 37:
				this.setState({ direction: 'LEFT' })
				break;
			case 39:
				this.setState({ direction: 'RIGHT' })
				break;
		}
	}


	moveSnake = () => {
		let dots = [...this.state.snakeDots];
		let head = dots[dots.length - 1];

		switch (this.state.direction) {
			case 'RIGHT':
				head = [head[0] + 2, head[1]];
				break;
			case 'LEFT':
				head = [head[0] - 2, head[1]];
				break;
			case 'DOWN':
				head = [head[0], head[1] + 2];
				break;
			case 'UP':
				head = [head[0], head[1] - 2];
				break;
		}
		dots.push(head);
		dots.shift();
		this.setState({
			snakeDots: dots
		})
	}

	checkIfOutOfBorders() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
			this.onGameOver();
		}
	}

	checkIfCollapsed() {
		let snake = [...this.state.snakeDots];
		let head = snake[snake.length - 1];
		snake.pop();
		snake.forEach(dot => {
			if (head[0] == dot[0] && head[1] == dot[1]) {
				this.onGameOver();
			}
		})
	}

	checkIfEat() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		let food = this.state.food;
		if (head[0] == food[0] && head[1] == food[1]) {
			this.setState({
				food: getRandomCoordinates()
			})
			this.enlargeSnake();
			this.increaseSpeed();
		}
	}

	enlargeSnake() {
		let newSnake = [...this.state.snakeDots];
		newSnake.unshift([])
		this.setState({
			snakeDots: newSnake
		})
	}

	increaseSpeed() {
		if (this.state.speed > 10) {
			this.setState({
				speed: this.state.speed - 10
			})
		}
	}

	onGameOver() {
		this.setState(initialState)
	}

	scoreBoard = () => {
		return (<h1>The current length of your snake is: {this.state.snakeDots.length}</h1>)
	}



	render() {
		return (
			<div>
				{/* SENT THE START GAME METHOD DOWN AS PROPS */}
				<Heading startGame={this.startGame} score={this.scoreBoard} />
				<div className="game-container">
					<div className="game-area">
						<Snake snakeDots={this.state.snakeDots} />
						<Food dot={this.state.food} />
					</div>
					{this.scoreBoard()}
				</div>
			</div>
		)
	}
}

export default App;