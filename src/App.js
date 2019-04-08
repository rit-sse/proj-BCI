import React, { Component } from 'react';
import { zipSamples, MuseClient } from 'muse-js';
import { powerByBand, epoch, fft } from '@neurosity/pipes';
import Visualization from './Visualization';

class App extends Component {
  state = {
    status: false,
    telemetry: {},
    data: {}
  };

  subscribeToMuse = async () => {
    try {
      const client = new MuseClient();

      client.enableAux = false;

      client.connectionStatus.subscribe(status => this.setState({ status }));

      await client.connect();
      await client.start();

      client.telemetryData.subscribe(telemetry => this.setState({ telemetry }));
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

  getAverageGamma = _ => {
    const { data } = this.state;

    if (data.gamma) {
      return data.gamma.reduce((sum, x) => sum + x) / data.gamma.length;
    }

    return 0;
  };

  render() {
    const { status, telemetry, data } = this.state;

    const statusText = status ? 'Connected' : 'Disconnected';
    const batteryLevel = telemetry.batteryLevel || 0;

    return (
      <div>
        <button onClick={this.subscribeToMuse} disabled={status}>
          Connect
        </button>
        <div>Status: {statusText}</div>
        <p>Battery: {batteryLevel}%</p>
        <div style={{ display: 'flex' }}>
          <Visualization
            data={data.gamma}
            labels={['Gamma']}
            backgroundColor="#BDD6EA"
          />
          <Visualization
            data={data.beta}
            labels={['Beta']}
            backgroundColor="#B4C493"
          />
          <Visualization
            data={data.alpha}
            labels={['Alpha']}
            backgroundColor="#F1C387"
          />
          <Visualization
            data={data.theta}
            labels={['Theta']}
            backgroundColor="#EFB180"
          />
          <Visualization
            data={data.delta}
            labels={['Delta']}
            backgroundColor="#E19271"
          />
        </div>
      </div>
    );
  }
}

export default App;
