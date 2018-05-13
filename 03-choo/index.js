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
    wagons: [],
    trackA: [],
    trackB: []
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
  </main>
`;

app.router((route) => [route('/', mainView)]);

const tree = app.start();
document.body.appendChild(tree);
