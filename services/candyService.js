const dbProvider = require('../data/data');

const candyService = () => {
    const getAllCandies = async () => {
        const result = dbProvider.candies;
        return { status: 200, body: result };
    }

    const getCandyById = async (id) => {
        const result = dbProvider.candies.find( item => item.id == id );
        if(result == undefined || result == null) { return { status: 404, body: "Candy with this id was not found!" }; }
        return { status: 200, body: result };
    }

    const createCandy = async (candy) => {
        const newCandy = {
            id: dbProvider.candies[dbProvider.candies.length-1].id + 1,
            name: candy.name,
            description: candy.description
        }
        dbProvider.candies.push(newCandy);

        return { status: 201, body: newCandy };;
    }

    return {
        getAllCandies,
        getCandyById,
        createCandy
    };
};

module.exports = candyService();
