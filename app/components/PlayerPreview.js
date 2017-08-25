var React = require('react');
var PropTypes = require('prop-types');

class PlayerPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='column'>
  			<img
  			 	className='avatar'
  				src={this.props.avatar}
  				alt={'Avatar for '+this.props.username}
  			/>
  			<h2>{'@'+this.props.username}</h2>
  			{this.props.children}
    </div>
    );
  }
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = PlayerPreview;
