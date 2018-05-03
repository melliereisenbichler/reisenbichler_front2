import template from './templates/drivers.hbs';
import $ from 'jquery';

export default function(){
	const $app = $('#app');

    //fetch returned promise
    fetch('http://ergast.com/api/f1/drivers.json')
        .then(res => res.json())
		.then(process)
		.then(data => template({drivers: data}))
        .then(html => $app.html(html));    
}

function process(data) {
	return data.MRData.DriverTable.Drivers;
}
