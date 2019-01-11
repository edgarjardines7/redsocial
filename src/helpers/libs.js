const helpers = {};

helpers.randomNumber = () => {
    console.log("random")
    const possible = 'abcdfghijklmnopqrstuvwxyz0123456789';
    let randomNumber = '';
    for (let i = 0; i < 6; i++) {
        randomNumber+=possible.charAt(Math.floor(Math.random() * possible.length))    
    }
    return randomNumber;
};

module.exports = helpers;