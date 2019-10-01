const dbProvider = require('../data/data');

const candyService = () => {
    const getAllCandies = () => {
        const result = dbProvider.candies;
        return result;
    }

    const getCandyById = (id) => {
        const result = dbProvider.candies.find( item => item.id == id );
        return result;
    }

    const createCandy = (candy) => {
        // id comes last in the new object
        // not sure how to fix
        const poormansId = dbProvider.candies.length + 1;
        candy.id = poormansId;
        const result = dbProvider.candies.push(candy);
        return candy;
    }

    return {
        getAllCandies,
        getCandyById,
        createCandy
    };
};

module.exports = candyService();
