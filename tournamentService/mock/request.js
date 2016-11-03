import fs from 'fs';
import _ from 'lodash';

let validCollections = [
	'my_collection'
]

export default function request(endpoint, callback) {
	let uri = _.split(endpoint, '/');

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