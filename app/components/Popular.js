var React = require('react');
var PropTypes = require('prop-types');
var Api = require('../utils/Api');
var Loading = require('./Loading');

function Language(props) {
  var languages = ['All', 'JavaScript', 'Java', 'Python', 'CSS', 'Ruby'];

  return(
    <div>
      <ul className='languages'>
        {
          languages.map((lang) => {
            return (
              <li
                style={props.selectedLanguage === lang? {color:'red'}: null}
                onClick={props.onSelect.bind(null, lang)}
                key={lang}>
                {lang}
              </li>
            );
        })
      }
      </ul>
    </div>
  )
}

Language.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}


function RepoGrid(props) {
  return (
    <ul className='popular-list'> {
      props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
                <li>
                  <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={'Avatar for ' + repo.owner.login}
                  />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
            </ul>
        </li>
        );
      })
    }
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {

  constructor() {
		super();
		this.state = {
			selectedLanguage : 'All',
      repos: null,
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage : lang,
        repos: null
			}
		});

    Api.fetchPopularRepos(lang)
    .then(function(response) {
      this.setState(function() {
  			return {
  				repos : response.items
  			}
  		});
    }.bind(this));
	}

	render() {
		return (
			<div>
				<Language
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <p><Loading /></p>
          : <RepoGrid repos={this.state.repos} />}
			</div>
		)
	}
}

module.exports = Popular;
