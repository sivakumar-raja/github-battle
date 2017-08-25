var React = require('react');
var Api = require('../utils/Api')
var queryString = require('query-string');
var PlayerPreview = require('./PlayerPreview');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var Loading = require('./Loading');

function Profile (props) {
  var info = props.info;

  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

class BattleResult extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	componentDidMount() {
		var search = queryString.parse(location.search);
		var players = [];
		players.push(search.playerOneName);
		players.push(search.playerTwoName);


		Api.battle(players).then(function(respose){
			if (respose === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
          }
        });
      }

      this.setState(function () {
        return {
          error: null,
          winner: respose[0],
          loser: respose[1],
          loading: false,
        }
			});
		}.bind(this));
	}

	render() {

		if (this.state.loading === true) {
			return <p><Loading /></p>
		}

		if (this.state.error) {
			return (
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (
			<div className='row'>
				<div>
				 <h1 className='header'>{'Winner'}</h1>
				 <h3 style={{textAlign: 'center'}}>Score: {this.state.winner.score}</h3>
				 <Profile info={this.state.winner.profile} />
	 			</div>

				<div>
				 <h1 className='header'>{'Loser'}</h1>
				 <h3 style={{textAlign: 'center'}}>Score: {this.state.loser.score}</h3>
				 <Profile info={this.state.loser.profile} />
				</div>
			</div>
		)
	}
}

module.exports = BattleResult;
