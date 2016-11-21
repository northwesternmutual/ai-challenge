import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const algorithms = JSON.parse(fs.readFileSync(path.join(__dirname + '/data/algorithms.json')).toString());

let validCollections = [
	'my_collection'
]

export default function request(endpoint, callback) {

	let uri;

	uri = _.split(endpoint, '/');

	//check if collection exists
	if( validCollections.indexOf(uri[1]) === -1 ) {
		return callback(null, {
			statusCode: 204
		});
	}

	//check if algorithms exists
	if( _.find(algorithms, { _id: uri[2] }) ) {

		return callback(null, {
			statusCode: 200
		}, JSON.stringify(_.find(algorithms, { _id: uri[2] })));

	} else {
		return callback(null, {
			statusCode: 204
		});
	}
}