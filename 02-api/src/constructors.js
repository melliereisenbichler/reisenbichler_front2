import template from './templates/constructors.hbs';
import $ from 'jquery';

export default function(){
	const $app = $('#app');

    //fetch returned promise
    fetch('http://ergast.com/api/f1/constructors.json')
        .then(res => res.json())
		.then(process)
		.then(data => template({constructors: data}))
        .then(html => $app.html(html));
}

function process(data) {
	return data.MRData.ConstructorTable.Constructors;
}
