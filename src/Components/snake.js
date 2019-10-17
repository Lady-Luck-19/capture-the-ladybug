import React from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
	return (
		<div>
			{props.snakeDots.map((dot, i) => {
				const style = {
					left: `${dot[0]}%`,
					top: `${dot[1]}%`
				}
				return (
					<div className="snake-dot" ket={i} style={style}></div>
					)
			})}
		</div>
		)
}