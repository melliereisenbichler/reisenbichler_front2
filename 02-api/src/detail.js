import template from './templates/driver.hbs';
import $ from 'jquery';	

export default function(context){
    const $app = $('#app');
    const driver = context.params.driver;
    
    /*fetch(`http://ergast.com/api/f1/drivers/${driver}.json`)
        //.then(res => res.json())
        //.then(process)
        .then(res => (res.json()))
        //.then(function hello(res){
          //  console.log(res.MRData.DriverTable.Drivers[0]);
        //})
        .then(process)
		.then(data => template({driver: data}))
        .then(html => $app.html(html));  

    fetch(`http://ergast.com/api/f1/drivers/${driver}/constructors.json`)
        .then(res => (res.json()))
        .then(function hello(res){
            console.log(res.MRData.ConstructorTable.Constructors);
        .then(processCons)
		.then(data => template({constructor: data}))
        .then(html => $app.html(html)); */

        const driverStream = fetch(`http://ergast.com/api/f1/drivers/${driver}.json`)
        const constructorStream = fetch(`http://ergast.com/api/f1/drivers/${driver}/constructors.json`)
            
        Promise
            .all([driverStream, constructorStream])
            .then([driverStream, constructorStream]) => 
                return Promise.all([driverStream.json, constructorStream.json])
}

function process(data) {
    return data.MRData.DriverTable.Drivers[0];
    
}

function processCons(data) {
    return data.MRData.ConstructorTable.Constructors;  
}


