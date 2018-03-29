import $ from 'jquery';
import router from 'page';
import Handlebars from 'hbsfy/runtime';

import indexTpl from './templates/index.hbs'
import playersTpl from './templates/players.hbs';
import playerTpl from './templates/player.hbs';
import notfoundTpl from './templates/404.hbs'
import contactTpl from './templates/contact.hbs'

import playersJson from './templates/players.json';

//age helper
Handlebars.registerHelper('age', function age(birthdate) {
    let birthday = new Date(birthdate);
    let today = new Date();
    return today.getFullYear() - birthday.getFullYear();
});

const $app = $('#app');

function index() {
    $app.html(indexTpl())
}

function players() {
    $app.html(playersTpl({player: playersJson.players}))
}

function player() {
    let curPlayer = ""

    //extract path for player
    let urlpath = location.href.substr(location.href.lastIndexOf('/') + 1);
   
        for(let i = 0; i < playersJson.players.length; i++){
            if(urlpath == playersJson.players[i].path){
                curPlayer = playersJson.players[i]
            }
        } 

        $app.html(playerTpl({player: curPlayer})) 
    /*else {
        router.redirect('*')
    }*/
}

function notfound() {
    $app.html(notfoundTpl())
}

function contact() {
    $app.html(contactTpl())
}


router('/players/:player', player);
router('/players', players);
router('/', index);
router('/contact', contact);

router('*', notfound)

router();