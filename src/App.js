import React, { Component } from 'react';
import { zipSamples, MuseClient } from 'muse-js';
import { powerByBand, epoch, fft } from '@neurosity/pipes';

class App extends Component {
  state = {
    status: false,
    data: {}
  };

  subscribeToMuse = async () => {
    try {
      const client = new MuseClient();

      client.connectionStatus.subscribe(status => {
        this.setState({ status });
        console.log(status ? 'Connected!' : 'Disconnected');
      });

      await client.connect();
      await client.start();

      zipSamples(client.eegReadings)
        .pipe(
          epoch({ duration: 1024, interval: 100, samplingRate: 256 }),
          fft({ bins: 256 }),
          powerByBand()
        )
        .subscribe(data => {
          this.setState({ data });
        });
    } catch (err) {
      console.error('Connection failed', err);
    }
  };

  render() {
    const { status } = this.state;
    const statusText = status ? 'Connected' : 'Disconnected';

    return (
      <div>
        <button onClick={this.subscribeToMuse} disabled={status}>
          Connect
        </button>
        <div>Status: {statusText}</div>
      </div>
    );
  }
}

export default App;
