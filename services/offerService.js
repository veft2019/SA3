const dbProvider = require('../data/data');
const candyService = require('./candyService');
const globalTryCatch = require('../handlers/globalTryCatch');


// ATH virkar ekki rétt eftir fyrstu umferð
// Heldur áfram að beyta ID eins og göngin eyðileggjast
const offerService = () => {
    const getAllOffers = async () => {
        let result = [];
        dbProvider.offers.forEach(item => {
            result.push({
                id: item.id,
                name: item.name,
                candies: Array.from(item.candies)
            });
        });
        
        result.forEach( async item => {
            item.candies.forEach(async (candy, index) => {
                item.candies[index] = (await candyService.getCandyById(candy)).body;
            });
        });
        

        return { status: 200, body: result };
    };

    return {
        getAllOffers
    };
};

module.exports = offerService();
