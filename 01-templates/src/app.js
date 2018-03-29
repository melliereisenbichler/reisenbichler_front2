import router from 'page';
import Handlebars from 'hbsfy/runtime';
import indexTpl from './templates/index.hbs'
import playersTpl from './templates/players.hbs';
import playerTpl from './templates/player.hbs';
import playersJson from './templates/players.json';
import notfoundTpl from './templates/404.hbs'
import contactTpl from './templates/contact.hbs'
import $ from 'jquery';

const $app = $('#app');

function index() {
    $app.html(indexTpl())
}

function players() {
    $app.html(playersTpl({player: playersJson.players}))
}

function player() {
    let curPlayer = ""



    $app.html(playerTpl({player: curPlayer}))
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