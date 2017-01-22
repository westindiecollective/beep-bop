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
  }

  render() {
    return (
      <div className="keys">
        {whitekeys.map(({ note, pitch }) => (
          <button
            className={`key white ${note[0]}`}
            onMouseDown={() => this.sampler.triggerAttackRelease(pitch, '8n')}
          />
        ))}
        {blackkeys.map(({ note, pitch }) => (
          <button
            className={`key black ${note[0]}`}
            onMouseDown={() => this.sampler.triggerAttackRelease(pitch, '8n')}
          />
        ))}
      </div>
    );
  }
}

Keyboard.propTypes = propTypes;

export default Keyboard;
