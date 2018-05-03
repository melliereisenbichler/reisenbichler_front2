import $ from 'jquery';
import router from 'page';
import Handlebars from 'hbsfy/runtime';

import indexTpl from './templates/index.hbs'
import notfoundTpl from './templates/404.hbs'

import drivers from './drivers'
import driver from './detail'
import constructors from './constructors'


const $app = $('#app');

function index() {
    $app.html(indexTpl())
}

function notfound() {
  $app.html(notfoundTpl())
}

//routen in driver ändern
router('/drivers/:driver', driver);
router('/drivers', drivers);
router('/constructors', constructors);
router('/', index);
router('*', notfound)

router();
