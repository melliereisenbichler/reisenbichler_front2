import template from './templates/driver.hbs';
import $ from 'jquery';
import capitalize from 'lodash/capitalize'
import pluralize from 'pluralize'

//Refactorn
const BASE_URL = "https://ergast.com/api/f1";

function resource(name, id = undefined, config = {}) {
  const {limit = 10, include, map} = config;
  const idPart = id ? `/${id}` : '';
  return fetch(`${BASE_URL}/${name}${idPart}.json?limit=${limit}`)
    /*.then(res => {
      if (res.statusCode >= 200 && res.statusCode < 300){
        return res
      } else {
        throw new Error("Network Error");
      }
    })*/
    .then(res => res.json())
    .then(data => {
      const resourceName = config.map ? config.map : name;
      const table = `${capitalize(pluralize.singular(resourceName))}Table`;
      const list = capitalize(pluralize(resourceName));
      const resources = data.MRData[table][list];

      if (include){
        return Promise
          .all(resources.map(r => {
            const id = r[`${singularize(resourceName)}Id`];
            return resource(`${name}/${id}/${include}`);
          }))
          .then(includes => {
            return resources.map((r, i) =>{
              r.includes[include] = includes[i];
              return r;
            });
          })
      }
      return resources;
    })
}

export default function(context){
    const $app = $('#app');
    const driver = context.params.driver;
    const driverId = context.params.id;

    Promise
      .all([resource('drivers', driverId), resource('constructors')])
      .then(([driver, constructors]) => template({driver, constructors}))
      .then(function(result) {
        console.log(driver)
      })
      .then(html => $app.html(html))
      .catch(error => console.error('Driver Detail Error:', error))
}
