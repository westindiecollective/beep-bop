import React, { Component, PropTypes } from 'react';
import Tone from 'tone';

import './styles.css';

const keys = [
  { note: 'E4', pitch: -12 },
  { note: 'E#4', pitch: -10 },
  { note: 'F4', pitch: -8 },
  { note: 'F#4', pitch: -6 },
  { note: 'G4', pitch: -4 },
  { note: 'G#4', pitch: -2 },
  { note: 'A4', pitch: 0 },
  { note: 'A#4', pitch: 2 },
  { note: 'B4', pitch: 4 },
  { note: 'B#4', pitch: 6 },
  { note: 'C4', pitch: 8 },
  { note: 'C#4', pitch: 10 },
  { note: 'D4', pitch: 12 },
];

const synth = new Tone.Synth().toMaster();

const propTypes = {
  url: PropTypes.string,
  recording: PropTypes.bool,
  sendRecording: PropTypes.func,
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

    if (props.recording) {
      Tone.Transport.start();
    }
  }

  playSample(pitch) {
    this.sampler.triggerAttackRelease(pitch, '8n');

    if (this.props.recording) {
      const time = Tone.Time(Tone.Transport.seconds);
      this.events.push({ time: time.toNotation(), pitch });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recording && !nextProps.recording) {
      this.props.sendRecording(this.events);
    }
  }

  render() {
    return (
      <div>
        <div className="keys">
          {keys.map(({ note, pitch }) => (
            <button
              key={note}
              className={`key white ${note[0]}`}
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
