const router = require("express").Router();
const axios = require("axios");

const MyCharacterService = require('../services/characters.service');
const myCharacterService = new MyCharacterService();

/* GET home page */
router.get("/characters", (req, res, next) => {
    myCharacterService.getCharactersList()
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters.hbs", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character.hbs')
})

router.get('/characters/edit/:id', (req, res, next) => {

    const myCharacterId = req.params.id

    myCharacterService.getIndividualCharacter(myCharacterId)
        .then(responseFromAPI => {
            res.render('characters/edit-character.hbs', { character: responseFromAPI.data})
        })
        .catch(err => console.log(err))
    });


router.get("/characters/:id", (req, res, next) => {
    myCharacterService.getIndividualCharacter(req.params.id)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.post('/characters/create', (req, res, next) => {
    
    const { occupation, weapon, name } = req.body;

    const debt = Boolean(req.body.debt);

    myCharacterService
    .createCharacter({
        name,
        occupation,
        weapon,
        debt
    })
     .then(responseFromAPI => {
        console.log(responseFromAPI.data)
        res.redirect('/characters')
    })
    .catch(err => console.error(err))
}) 

router.put('/characters/edit/:id', (req, res, next) => {
    
    const myCharacterId = req.params.id;

    const { occupation, weapon, name } = req.body;

    const debt = Boolean(req.body.debt);

    myCharacterService
    .editCharacter(myCharacterId, {
        name,
        occupation,
        weapon,
        debt
    })
     .then(responseFromAPI => {
        console.log(responseFromAPI.data)
        res.redirect('/characters')
    })
    .catch(err => console.error(err))
}) 

// router.post('/characters/:id/update', (req, res) => {
//     const characterId = req.params.id;
//     const characterInfo = req.body;
    
//     apiService.
// })
// https://ih-crud-api.herokuapp.com/characters

module.exports = router;