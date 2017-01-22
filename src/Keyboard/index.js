import React, { Component, PropTypes } from 'react';
import Tone from 'tone';

import './styles.css';

const whitekeys = [
  { note: 'C4', pitch: -10 },
  { note: 'D4', pitch: -8 },
  { note: 'E4', pitch: -6 },
  { note: 'F4', pitch: -4 },
  { note: 'G4', pitch: -2 },
  { note: 'A4', pitch: 0 },
  { note: 'B4', pitch: 2 },
];

const blackkeys = [
  { note: 'C#4', pitch: -9 },
  { note: 'D#4', pitch: -7 },
  { note: 'F#4', pitch: -3 },
  { note: 'G#4', pitch: -1 },
  { note: 'A#4', pitch: 1 },
];

const synth = new Tone.Synth().toMaster();

const propTypes = {
  url: PropTypes.string,
};

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.sampler = new Tone.Sampler({
      url: props.url,
      retrigger: true,
    }).toMaster();

    this.playNote = this.playSample.bind(this);
    this.record = this.record.bind(this);
    this.play = this.play.bind(this);

    this.events = [];

    this.state = {
      recording: false,
    };
  }

  playSample(pitch) {
    this.sampler.triggerAttackRelease(pitch, '8n');

    if (this.state.recording) {
      const time = Tone.Time(Tone.Transport.seconds);
      this.events.push({ time: time.toNotation(), pitch });
    }
  }

  record() {
    if (this.state.recording) {
      Tone.Transport.stop();
      this.setState({ recording: false });
      console.log(JSON.stringify(this.events));
    } else {
      Tone.Transport.start();
      this.setState({ recording: true });
    }
  }

  play() {
    if (!this.state.recording) {
      const part = new Tone.Part((time, event) => {
        this.sampler.triggerAttackRelease(event.pitch, '8n', time);
      }, this.events);
      part.start(0);
      Tone.Transport.start();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.record}>{this.state.recording ? 'stop' : 'record'}</button>
        <button onClick={this.play} disabled={this.state.recording}>play</button>
        <div className="keys">
          {whitekeys.map(({ note, pitch }) => (
            <button
              key={note}
              className={`key white ${note[0]}`}
              onMouseDown={() => this.playSample(pitch)}
            />
          ))}
          {blackkeys.map(({ note, pitch }) => (
            <button
              key={note}
              className={`key black ${note[0]}`}
              onMouseDown={() => this.playSample(pitch)}
            />
          ))}
        </div>
      </div>
    );
  }
}

Keyboard.propTypes = propTypes;

export default Keyboard;
