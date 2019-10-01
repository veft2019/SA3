const dbProvider = require('../data/data');
const request = require('request');

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
            if(result.surprise.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                //Gotta find what type the img is and add that to the end of the file name
                //Just some string formatt stuff
                request(result.surprise).pipe(fs.createWriteStream('test.jpg'));

            }
            else {
                //Append to txt file
            }
            //Return 200 along with the surprise (text or url, doesnt matter in the return function)
        }
        else if(result.currentHits > result.maximumHits) {
            //Return 423
        }
            
        //if we get here we must return 204 with no body
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
