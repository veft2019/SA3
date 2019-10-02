const dbProvider = require('../data/data');
const request = require('request');
const fs = require('fs');

const pinataService = () => {
    const getAllPinatas = async () => {
        let results = [];
        dbProvider.pinatas.forEach(item => {
            results.push({
                id: item.id,
                name: item.name,
                maximumHits: item.maximumHits,
                currentHits: item.currentHits
            });
        });
        return { status: 200, body: results };
    }

    const getPinataById = async (id) => {
        const result = dbProvider.pinatas.find( item => item.id == id );
        if(result == undefined || result == null) { return { status: 404, body: "Pinata with this id was not found!" }; }

        const hiddenSurprise = {
            id: result.id,
            name: result.name,
            maximumHits: result.maximumHits,
            currentHits: result.currentHits
        };

        return { status: 200, body: hiddenSurprise };
    }

    const createPinata = async (pinata) => {
        var newPinata = {
            id: dbProvider.pinatas[dbProvider.pinatas.length-1].id + 1,
            name: pinata.name,
            surprise: pinata.surprise,
            maximumHits: pinata.maximumHits,
            currentHits: 0
        };
        dbProvider.pinatas.push(newPinata);

        return { status: 201, body: newPinata };
    }

    const hitPinata = async (id) => {
        const result = dbProvider.pinatas.find( item => item.id == id );
        if(result == undefined || result == null) { return { status: 404, body: "Pinata with this id was not found!" }; }

        result.currentHits++;

        if(result.currentHits == result.maximumHits) {
            if(typeof(result.surprise) != "string") { return { status: 500, body: "Something went horribly wrong with this pinatas surprise!" }; }

            if(result.surprise.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                var fileNameArray = result.surprise.split(".");
                var fileType = fileNameArray[fileNameArray.length-1];
                fs.mkdir('./images', { recursive: true }, function(err) {
                    if(err) { return {status: 500, body: "Something went wrong while creating a local folder for your surprise image!"}; }
                });
                request(result.surprise).pipe(fs.createWriteStream(`./images/${result.name}.${fileType}`));

            }
            else {
                fs.appendFile("surprises.txt", `${result.surprise}\n`, (err) => {
                    if(err) { return {status: 500, body: "Something went wrong while appending your new surprise to your local file!"}; }
                });
            }
            return { status: 200, body: result.surprise };
        }
        else if(result.currentHits > result.maximumHits) {
            return { status: 423, body: "This pinata has already been opened!" };
        }
            
        return { status: 204, body: "" };
    }

    return {
        getAllPinatas,
        getPinataById,
        createPinata,
        hitPinata
    };
};

module.exports = pinataService();
