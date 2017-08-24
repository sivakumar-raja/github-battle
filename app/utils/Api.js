var axios = require('axios');


function getProfile(username) {
	var profileUri = 'https://api.github.com/users/'+username;
	return axios.get(profileUri)
		.then(function(response) {
			return response.data;
		});
}

function getRepos(username) {
	var repoUri = 'https://api.github.com/users/'+username+'/repos';
	return axios.get(repoUri)
		.then(function(response) {
			return response;
		});	
}

function calculateStarCount(repos) {
	return repos.data.reduce(function(count, repo) {
		return repo.stargazers_count + count;
	}, 0)
}

function calculateScore(profile, repos) {
	var followers = profile.followers;
	var totalStars = calculateStarCount(repos);

	return (followers * 3) + totalStars;
}

function handleError(error) {
	console.warn(error);
	return null;
}


function getUserData(player) {
	return axios.all([
			getProfile(player),
			getRepos(player)
		]).then(function (response) {
			var profile = response[0];
			var repos = response[1];

			return {
				profile : profile,
				score : calculateScore(profile, repos)	
			}
		}); 
}

function sortPlayers (players) {
   return players.sort(function (a,b) {
     	return b.score - a.score;
   });
 }

module.exports = {	

	battle: function(players) {
		return axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError);
	},

   fetchPopularRepos: function(language) {
       var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+
       language +'&sort=stars&order=desc&type=Repositories');

       return axios.get(encodedURI).then(function(response) {
         return response.data;
       });
  }
}
