import $ from 'jquery';
import router from 'page';
import Handlebars from 'hbsfy/runtime';

import indexTpl from './templates/index.hbs'
//import driversTpl from './templates/drivers.hbs';
//import driverTpl from './templates/driver.hbs';
//import notfoundTpl from './templates/404.hbs'
//import contactTpl from './templates/contact.hbs'
import drivers from './index'
import driver from './detail'

/*//age helper
Handlebars.registerHelper('age', function age(birthdate) {
    let birthday = new Date(birthdate);
    let today = new Date();
    return today.getFullYear() - birthday.getFullYear();
});*/

const $app = $('#app');

function index() {
    $app.html(indexTpl())
}

/*change to drivers, PROMISE
function drivers() {
    $app.html(driversTpl({player: playersJson.players}))
}*/

//Promise
/*function driver(context) {
    const path = context.params.driver;
    const driver = playersJson.drivers.find(function(elmt) {
        if(elmt.path === path) return elmt
    })

    $app.html(playerTpl({player: player})) 
}

/*function notfound() {
    $app.html(notfoundTpl())
}

function contact() {
    $app.html(contactTpl())
}*/

//routen in driver ändern
router('/drivers/:driver', driver);
router('/drivers', drivers);
router('/', index);
//router('/contact', contact);

//router('*', notfound)

router();