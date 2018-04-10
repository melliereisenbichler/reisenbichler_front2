import template from './templates/drivers.hbs';
import $ from 'jquery';

export default function(){
	const $app = $('#app');

	/*const driverStream = fetch('')
	const constructorsS = fetch('')
	Promise
		.all(driverStream)
		.then(driverStream) =>
			return Promise.all(driverS.json())
		.then([]) => {
			return process(drivers, constructor)
		}*/
    
    //fetch returned promise
    fetch('http://ergast.com/api/f1/drivers.json')
        .then(res => res.json())
		.then(process)
		.then(data => template({drivers: data}))
        .then(html => $app.html(html));
        
        /*fetch('http://ergast.com/api/f1/drivers.json')
        .then(res => (res.json()))
        .then(function hello(res){
            console.log(res.MRData.DriverTable.Drivers);
        })*/
}

function process(data) {
	return data.MRData.DriverTable.Drivers;	
}
