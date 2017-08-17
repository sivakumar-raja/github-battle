var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {

		var value = event.target.value;

		this.setState(function() {
			return {
				username: value
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(
			this.props.id,
			this.state.username
		);
	}

	render() {
		return (
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username' >{this.props.label}</label>
				<input
					type='text'
					placeholder='github username'	
					value={this.state.username}
					onChange={this.handleInputChange}
				/>
				<button className='button' type="submit" disabled={!this.state.username}>Submit</button>
			</form>
		)
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}


class Battle extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/'+username+'.png?size=200';

			return newState;
		});
	}

	render () {
		return (
			<div className='row'>
				{!this.state.playerOneName &&
					<PlayerInput 
						id='playerOne'
						label='Player One'
						onSubmit={this.handleSubmit}
					/>
				}

				{!this.state.playerTwoName &&
					<PlayerInput 
						id='playerTwo'
						label='Player Two'
						onSubmit={this.handleSubmit}
					/>
				}
			</div>
		)
	}
}

module.exports = Battle;