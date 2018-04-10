import React, { Component } from 'react';
import './App.css';
import './vendor/tachyons.css';

import WesleySunburst from './WesleySunburst';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: {}
    }
    
  }

  componentDidMount() {
    // this.service.getAllDurations().then((response) => {
    //   // console.log(response);
    //   this.setState({
    //     data: response
    //   })
    // });
  }

  render() {
    const burstData = this.state.data;
    return (
      <div className="App">
        {
          // JSON.stringify(durations)
          // durations.map((duration, i) => new Card(duration, i))
        }
        <WesleySunburst />
      </div>
    );
  }
}

const Card = (duration, i) => {
  return (
    <article key="i" className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
      <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{ duration.title }</h1>
      <div className="pa3 bt b--black-10">
        <ul className="center list pl0 ml0 mw5 ba b--light-silver br3">
          <li className="ph3 pv2 bb b--light-silver">{ duration.bundleId }</li>
          <li className="ph3 pv2 bb b--light-silver">{ new Date(duration.startedAt).toLocaleTimeString() }</li>
          <li className="ph3 pv2 bb b--light-silver">{ duration.milliseconds }</li>
        </ul>
      </div>
    </article>
  );
}

export default App;
