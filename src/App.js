import React, { Component } from 'react';
import { zipSamples, MuseClient } from 'muse-js';
import { powerByBand, epoch, fft } from '@neurosity/pipes';
import { Navbar, NavItem } from 'react-materialize';
import Visualization from './Visualization';
import HackerTyper from './HackerTyper';
import FidgetSpinner from './FidgetSpinner';

class App extends Component {
  state = {
    status: false,
    telemetry: {},
    data: {},
    showVisualization: true
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
      const focus = data.gamma.reduce((sum, x) => sum + x) / data.gamma.length
      return 5 - focus > 0 ? 5 - focus : 0;

    }

    return 0;
  };

  getAverageAlpha = _ => {
    const { data } = this.state;

    if (data.alpha) {
      return 1 / (data.alpha.reduce((sum, x) => sum + x) / data.alpha.length);
    }

    return 0;
  };

  renderVisualization = _ => {
    const { data } = this.state;
    document.body.style = 'background: white; color: black;';
    return (
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
    );
  };

  renderHackerTyper = _ => {
    const { data } = this.state;
    document.body.style = 'background: black; color: white;';
    return <HackerTyper data={data} speed={this.getAverageGamma()} />;
  };

  renderFidgetSpinner = _ => {
    const { data } = this.state;
    document.body.style = 'background: black;';
    return <FidgetSpinner data={data} speed={this.getAverageAlpha()} />;
  };

  renderDemoType = _ => {
    const { demoType } = this.state;
    switch (demoType) {
      case 'hackertyper':
        return this.renderHackerTyper();
      case 'fidgetspinner':
        return this.renderFidgetSpinner();
      default:
        return this.renderVisualization();
    }
  };

  handleDemoTypeChange = e => {
    this.setState({ demoType: e.target.value });
  };

  render() {
    const { status, telemetry } = this.state;

    const statusText = status ? 'Connected' : 'Disconnected';
    const batteryLevel = telemetry.batteryLevel || 0;

    return (
      <div>
        <button onClick={this.subscribeToMuse} disabled={status}>
          Connect
        </button>
        <div>Status: {statusText}</div>
        <p>Battery: {batteryLevel}%</p>
        <Navbar brand={<div></div>} alignlinks="left">
          <NavItem value="visualization" onClick={this.handleDemoTypeChange}>
            Visualization
          </NavItem>
          <NavItem value="hackertyper" onClick={this.handleDemoTypeChange}>
            Hacker Typer
          </NavItem>
          <NavItem value="fidgetspinner" onClick={this.handleDemoTypeChange}>
            Fidget Spinner
          </NavItem>
          <NavItem value="othergame" onClick={this.handleDemoTypeChange}>
            Other Game
          </NavItem>
        </Navbar>
        {this.renderDemoType()}
      </div>
    );
  }
}

export default App;
