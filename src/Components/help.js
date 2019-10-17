
import React, {useState} from 'react';

const Help = () => {
	const [clicked, setClick] = useState(false)

	const onClick = () => {
		setClick(!clicked)
	}

	return(
		<>
		<button onClick={onClick}>
			Help
		</button>
		<div>
			{
				clicked ? (
					<div id="help">
						<h3>How to play Snake</h3>
						<p>Use the arrow keys UP (↑), DOWN (↓), LEFT (←) and RIGHT (→)
							to move the snake around to eat the food!</p>
						<p>The more food he eats, the longer he gets!</p>
						<h4>Be careful though!</h4>
						<p>If the snake runs into the border or accidently eats himself,
							the game is over and you'll need to start all over again!</p>
					</div>
				) : (
					null
				)	
			}
		</div>
		</>	
	)
}

export default Help;
