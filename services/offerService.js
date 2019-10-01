const dbProvider = require('../data/data');
const candyService = require('./candyService');
const globalTryCatch = require('../handlers/globalTryCatch');


// ATH virkar ekki rétt eftir fyrstu umferð
const offerService = () => {
    const getAllOffers = async () => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.offers;

            /*result.forEach(item => {
                item.candies.forEach((candy, index) => {
                    item.candies[index] = candyService.getCandyById(candy);
                });
            });*/

            // Works the first when the routes is activated
            // the second time all cand id change to -1
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result[i].candies.length; j++) {
                    result[i].candies[j] = await candyService.getCandyById(result[i].candies[j]);
                }
            }
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No offers were found"
                }
            }
            return {
                status: 200,
                body: result
            };
        });
    };

    return {
        getAllOffers
    };
};

module.exports = offerService();
