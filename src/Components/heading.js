import React from 'react';
import Help from './help'

export default class Heading extends React.Component {
	render() {
		return(
		<div className="heading-h4">
			<h2>Capture the ladybug!</h2>
			{/* ADDING THE METHOD TO THIS BUTTON */}
			<button onClick={this.props.startGame}>
				Start
			</button>
			<Help />
		</div>
		)
	}
}