const dbProvider = require('../data/data');
const globalTryCatch = require('../handlers/globalTryCatch');

const candyService = () => {
    const getAllCandies = async () => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.candies;
            if(result.length == 0) {
                return {
                    status: 404,
                    body: "No artists were found"
                }
            }
            return {
                status: 200,
                body: result
            };
        });
    }

    const getCandyById = async (id) => {
        return await globalTryCatch(async () => {
            const result = await dbProvider.candies.find( item => item.id == id );
            if(result == null) {
                return {
                    status: 404,
                    body: "No candy with that ID"
                };
            }
            return {
                status: 200,
                body: result
            };
        });
    }

    const createCandy = async (candy) => {
        // id comes last in the new object
        // not sure how to fix
        return await globalTryCatch(async () => {
            const poormansId = await dbProvider.candies.length + 1;
            candy.id = poormansId;
            const result = await dbProvider.candies.push(candy);
            return {
                status: 201,
                body: result
            }
        });
    }

    return {
        getAllCandies,
        getCandyById,
        createCandy
    };
};

module.exports = candyService();
