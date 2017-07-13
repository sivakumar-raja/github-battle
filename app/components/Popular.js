var React = require('react');

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
		var languages = ['All', 'JavaScript', 'Java', 'Python', 'CSS', 'Ruby'];

		return (
			<div>
				<ul className='languages'>
					{
						languages.map(function(lang) {
							return (
								<li
									style={this.state.selectedLanguage === lang? {color:'red'}: null}
									onClick={this.updateLanguage.bind(null, lang)}
									key={lang}>
									{lang}
								</li>
							);
					}, this)
				}
				</ul>
			</div>
		)
	}
}

module.exports = Popular;
