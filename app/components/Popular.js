var React = require('react');
var PropTypes = require('prop-types');

function Language(props) {
  var languages = ['All', 'JavaScript', 'Java', 'Python', 'CSS', 'Ruby'];

  return(
    <div>
      <ul className='languages'>
        {
          languages.map(function(lang) {
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

class Popular extends React.Component {

  constructor() {
		super();
		this.state = {
			selectedLanguage : 'All'
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage : lang
			}
		});
	}

	render() {
		return (
			<div>
				<Language
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
			</div>
		)
	}
}

module.exports = Popular;
