var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var BattleResult = require('./BattleResult');
var Switch = ReactRouter.Switch;
var NotFound = require('./NotFound');

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/battle' component={Battle} />
						<Route path='/battle/result' component={BattleResult} />
						<Route path='/popular' component={Popular} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		)
	}
}

module.exports = App;
