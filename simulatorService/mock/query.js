export let goodQuery = {
    collection: 'my_collection',
    algorithmOneID: '123abc',
    algorithmTwoID: '456def',
    simulations: 10
};

export let badQueryOne = {
    collection: 'bad_collection',
    algorithmOneID: '123abc',
    algorithmTwoID: '456def',
    simulations: 10
};

export let badQueryTwo = {
    collection: 'my_collection',
    algorithmOneID: '123abc',
    algorithmTwoID: '789ghi',
    simulations: 10
};

export let invalidQuery = {
    algorithmOneID: '123abc',
    algorithmTwoID: '789ghi',
    simulations: 10
};
