const dbProvider = require('../data/data');
const candyService = require('./candyService');
const globalTryCatch = require('../handlers/globalTryCatch');


// ATH virkar ekki rétt eftir fyrstu umferð
// Heldur áfram að beyta ID eins og göngin eyðileggjast
const offerService = () => {
    const getAllOffers = async () => {
        const result = dbProvider.offers;

        result.forEach(item => {
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
