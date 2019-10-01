const dbProvider = require('../data/data');
const candyService = require('./candyService');

const offerService = () => {
    const getAllOffers = () => {
        const result = dbProvider.offers;

        result.forEach(item => {
            item.candies.forEach((candy, index) => {
                item.candies[index] = candyService.getCandyById(candy);
            });
        });
        return result;
    };

    return {
        getAllOffers
    };
};

module.exports = offerService();
