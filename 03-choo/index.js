const choo = require('choo');
const html = require('choo/html');
const emoji = require('node-emoji');
const css = require('sheetify');
const app = choo();

css('bootstrap');

const styles = css`
  h1 {
    color: blue;
  }
`;

const wagon = 'railway_car';
const loc = 'steam_locomotive';

// steam_locomotive
app.model({
  state: {
    locs: [loc, loc, loc, loc],
    wagons: [wagon, wagon, wagon, wagon, wagon, wagon, wagon, wagon, wagon, wagon],
    trackA: [],
    trackB: [],
    selected: false
  },
  reducers: {
    addWagon: (data, state) => {
      if(state.wagons.length < 11){
        state.wagons.push(wagon);
      }
    },
    moveWagonToA: (data, state) => {
      const add = [];

      if (state.wagons.length >= 1 && state.trackA.length < 5) {
        state.wagons.pop();
        add.push(wagon);
      }

      if (state.trackA.length === 0) {
        add.unshift(loc);
        state.locs.pop();
      }

      return Object.assign(state, {
        wagons: state.wagons,
        trackA: [...state.trackA, ...add]
      });
    },
    moveWagonToB: (data, state) => {
      const add = [];

      if (state.wagons.length >= 1 && state.trackB.length < 6) {
        state.wagons.pop();
        add.push(wagon);
      }

      if (state.trackB.length === 0) {
        add.unshift(loc);
        state.locs.pop();
      }

      return Object.assign(state, {
        wagons: state.wagons,
        trackB: [...state.trackB, ...add]
      });
    },
    dispatchTrain: (data, state) => {
      if(data.track == "A"){
        if(state.trackA.length == 5){
          console.log("train A dispatched.")
          return {
            trackA: []
          }
        }
      }else if(data.track == "B"){
        if(state.trackB.length == 6){
          console.log("train B dispatched.")
          return {
            trackB: []
          }
        }
      }

    },
    changeSelectedTrack: (data, state) => {
        return {selected: data.track}
     }
  }
});

const mainView = (state, prev, send) => html`
  <main class=${styles}>
    <h1>Rangierbahnhof</h1>
    <hr>
    <button onclick=${() =>
      send('addWagon')} class="btn btn-primary">Add Wagon</button>
    <button onclick=${() =>
      send('moveWagonToA')} class="btn btn-danger">Add to track A</button>
    <button onclick=${() =>
      send('moveWagonToB')} class="btn btn-danger">Add to track B</button>
    <div class="gleis">
      Locs: ${state.locs.map((v) => emoji.get(v))}
    </div>
    <div class="gleis">
      Wagons: ${state.wagons.map((v) => emoji.get(v))}
    </div>
    <div class="gleis">
      Track A: ${state.trackA.map((v) => emoji.get(v))}
    </div>
    <div class="gleis">
      Track B: ${state.trackB.map((v) => emoji.get(v))}
    </div>
    <div class="gleis">
    Select a track to schedule:
    <select id="selectTrack" onchange=${() => {
          var selTrack = document.getElementById("selectTrack").value;
          send('changeSelectedTrack', {track: selTrack})}
    } >
      <option value="A">Track A</option>
      <option value="B">Track B</option>
    </select>

    <button onclick=${() =>
      send('dispatchTrain', { track: state.selected })} class="btn btn-success">Schedule Train</button>
    </div>
  </main>
`;

app.router((route) => [route('/', mainView)]);

const tree = app.start();
document.body.appendChild(tree);
