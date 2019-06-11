
let dAppAddress = '3MuH3kFrWJmBpwFnUjURhKi2ST46KjjFWFu';
let dAppSeed = 'need easy jealous win wet boil barely catalog scale blast size idea';
let account1seed = 'miracle quick umbrella antique museum squirrel toward parade goddess horn inquiry example';
let account2seed = 'process rescue stereo battle defy trip picnic volume rich cotton knee hurt';
let account3seed = 'will coffee symbol manual marriage matter diesel shell strong lock exit spike';

let seeds = [account1seed, account2seed. account3seed];


let commits = ["G8ZMEiXEGefpEdgEFN5mYr6oEEABJrtcBBLkZf6Ujmcq",

"Bf2yysmAoroXAzVidK1wxuVYpRGLy1nWe6cNAGXBf5Hi",

"ACHSFMGY7bp3aHryCLYc499XvojeGrgBp59zSvwgLnkQ"]

let reveals = ["delisted", "featured", "featured"]

let salts = ["random1", "random2", "random3"]

let datajson = {
    "title":        "Waves Tshirt, Vote 1",
    "coupon_price": 10000000,
    "old_price":    1000000000,
    "new_price":    100000000,
    "address":      "Universe",
    "description":  "I want you to make love, not war, I know you've heard it before",
    "image":        "https://bit.ly/2EXTghg"
}

it('Add Item', async () =>  {
    let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "addItem",
            args: [
                {type: "string", value: datajson.title },
                {type: "integer", value: datajson.coupon_price},
                {type: "string", value: JSON.stringify(datajson)},
            ]
        },
        payment: []

    }, account1seed);
    let tx = await broadcast(ts);
    await waitForTx(tx.id);

});

it('Purchase item', async () =>  {
    let item = 'item_7tE8ze2JafoFn9Y9fU4qo4sfFRJhRZdKwDhjT15BQmkh';
    let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "purchase",
            args: [
                {type: "string", value: item },
            ]
        },
        payment: [
            {amount: datajson.coupon_price, asset: null, fee: 10000000}
        ]

    }, account1seed);
    let tx = await broadcast(ts);
    await waitForTx(tx.id);

});

it('Withdraw funds' , async () =>  {
let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "withdraw",
            args: []
        },
        payment: []

    }, account1seed);
    let tx = await broadcast(ts);
    await waitForTx(tx.id);
})

it('Vote Commit' , async () =>  {
    let item = 'item_7tE8ze2JafoFn9Y9fU4qo4sfFRJhRZdKwDhjT15BQmkh';
    let user = 2
    let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "voteCommit",
            args: [
                {type: "string", value: item },
                {type: "string", value: commits[user]}
            ]
        },
        payment: []
    }, account3seed);
    let tx = await broadcast(ts);
});

it('Vote Reveal', async () => {
    let item = 'item_7tE8ze2JafoFn9Y9fU4qo4sfFRJhRZdKwDhjT15BQmkh';
    let user = 2
    let ts = invokeScript({
        dApp: dAppAddress,
        call: {
            function: "voteReveal",
            args: [
                {type: "string", value: item },
                {type: "string", value: reveals[user]},
                {type: "string", value: salts[user]},
            ]
        },
        payment: []
    }, seeds[user]);
    let tx = await broadcast(ts);

})


it('Transfer 1 waves to account 2', async () => {
    let tx = await broadcast(transfer({
        amount: 100000000,
        recipient: '3N47XC9QJHkPhWpfZd2XnYoNBLGj2aZeAzU',
    }, account1seed))
    const res = await waitForTx(tx.id)
    console.log(res);
})