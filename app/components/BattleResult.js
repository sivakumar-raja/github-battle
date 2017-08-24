var React = require('react');
var Api = require('../utils/Api')
var queryString = require('query-string');

class BattleResult extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null
		}
	}

	componentDidMount() {
		var search = queryString.parse(location.search);
		var players = [];
		players.push(search.playerOneName);
		players.push(search.playerTwoName);


		Api.battle(players).then(function(respose){
			this.setState(function() {
				return {
					winner : respose[0],
					loser: respose[1]
				}
			});
		}.bind(this));
	}

	render() {
		return (
			<div className='row'>
				<div>
					<h2> Winner </h2>
					{this.state.winner !== null ? <h3> {this.state.winner.profile.name} </h3> : null}
				</div>
				<div>
					<h2> Loser </h2>
					{this.state.loser !== null ? <h3> {this.state.loser.profile.name} </h3> : null}
				</div>
			</div>
		)
	}
}

module.exports = BattleResult;