import fs from 'fs';
import _ from 'lodash';

let validCollections = [
	'my_collection'
]

export default function request(endpoint, callback) {

	let uri;

	if(typeof endpoint === 'object') {

		uri = _.split(endpoint.uri, '?');
		let qs = uri[1];
		let params = _.split(qs, '&');
		let playerOneWins = _.split(params[3], '=')[1]/4;
		let playerTwoWins = _.split(params[3], '=')[1] - playerOneWins;

		return callback(null, {
			statusCode: 200
		}, JSON.stringify({
		  "playerOne": {
		    "wins": playerOneWins,
		    "losses": playerTwoWins,
		    "accuracy": 0,
		    "name": "my_name",
		    "id": _.split(params[0], '=')[1]
		  },
		  "playerTwo": {
		    "wins": playerTwoWins,
		    "losses": playerOneWins,
		    "accuracy": 0,
		    "name": "my_name",
		    "id": _.split(params[1], '=')[1]
		  }
		}));

	} else {
		uri = _.split(endpoint, '/');

		if(uri.length > 2) {
			return callback(new Error('well hello there. i\'m an error'));
		}

		if(uri.length > 1 && validCollections.indexOf(uri[1]) === -1) {
			return callback(null, {
				statusCode: 204
			});
		}

		return callback(null, {
			statusCode: 200
		}, fs.readFileSync(__dirname + '/data/algorithms.json').toString());
	}
}