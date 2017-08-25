var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

function Player(props) {
	return (
		<PlayerPreview username={props.username} avatar={props.avatar}>
			<button
				className='reset'
				onClick={props.onReset.bind(null, props.id)}
			>
			Reset
			</button>
		</PlayerPreview>
	)
}

Player.propTypes = {
	id: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired
}

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
		this.handleReset = this.handleReset.bind(this);
	}

	handleReset(id) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = null;

			return newState;
		});
	}

	handleSubmit(id, username) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/'+username+'.png?size=200'

			return newState;
		});
	}

	render () {
		return (
			<div>
				<div className='row'>
					{!this.state.playerOneName ?
						<PlayerInput
							id='playerOne'
							label='Player One'
							onSubmit={this.handleSubmit}
						/>
						: <Player
							id='playerOne'
							username={this.state.playerOneName}
							avatar={this.state.playerOneImage}
							onReset={this.handleReset}
						  />
					}

					{!this.state.playerTwoName ?
						<PlayerInput
							id='playerTwo'
							label='Player Two'
							onSubmit={this.handleSubmit}
						/>
						: <Player
							id='playerTwo'
							username={this.state.playerTwoName}
							avatar={this.state.playerTwoImage}
							onReset={this.handleReset}
						  />
					}
				</div>
				<div>
					{this.state.playerOneName && this.state.playerTwoName &&
					<Link
						className='button'
						to={this.props.match.path +'/result?playerOneName='+this.state.playerOneName+'&playerTwoName='+this.state.playerTwoName}>
						Battle
					</Link>
					}
				</div>
			</div>
		)
	}
}

module.exports = Battle;
