const shallowValidate = function(data, callback) {
    if (data === undefined) {
        return callback(new Error('field is undefined'));
    } else if (data === null) {
        return callback(new Error('field is null'));
    } else if (data.length < 1) {
        return callback(new Error('field does not meet the minimum length requirement'));
    }
    return callback(null, data);
};

exports.id = function(id, callback) {
    return shallowValidate(id, function(err, result) {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

exports.algorithmOneID = function(algorithmOneID, callback) {
    return shallowValidate(algorithmOneID, function(err, result) {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

exports.algorithmTwoID = function(algorithmTwoID, callback) {
    return shallowValidate(algorithmTwoID, function(err, result) {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

exports.simulations = function(simulations, callback) {
    return shallowValidate(simulations, function(err, result) {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

exports.collection = function(collection, callback) {
    return shallowValidate(collection, function(err, result) {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}
