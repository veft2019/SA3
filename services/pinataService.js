const dbProvider = require('../data/data');

const pinataService = () => {
    const getAllPinatas = () => {
        const result = dbProvider.pinatas;
        return result;
    }

    const getPinataById = (id) => {
        const result = dbProvider.Pinatas.find( item => item.id == id );
        return result;
    }

    const createPinata = (pinata) => {
        // id comes last in the new object
        // not sure how to fix
        const poormansId = dbProvider.pinatas.length + 1;
        pinata.id = poormansId;
        const result = dbProvider.pinatas.push(pinata);
        return pinata;
    }

    const hitPinata = (id) => {
        const result = dbProvider.Pinatas.find( item => item.id == id );

        result.currentHits++;

        if(result.currentHits == result.maximumHits) {
            //Use surprise property and check if its text or url
            //Add to text file (or create one if one doesnt exist)
            //or
            //Download image from url using request write stream

            //Return 200 along with the surprise (text or url, doesnt matter in the return function)
        }
        else if(result.currentHits > result.maximumHits) {
            //Return 423
        }
            
        //if we get here we must return 204
        return result;
    }

    return {
        getAllPinatas,
        getPinataById,
        createPinata,
        hitPinata
    };
};

module.exports = pinataService();
