const axios = require("axios");

class CharacterService {

    constructor(){
        this.axios = axios.create({
            baseURL: 'https://ih-crud-api.herokuapp.com'
        });
    }

    getCharactersList(){
        return this.axios.get("/characters");
    }
    getIndividualCharacter(id){
    return this.axios.get(`/characters/${id}`);
    }
    createCharacter(characterInfoObject){
        return this.axios.post('/characters', characterInfoObject);
    }
    
    editCharacter(id, characterInfoObject){
        return this.axios.put(`/characters/${id}`, characterInfoObject);
    }

}


module.exports = CharacterService;