import React from 'react';
import Scroll from 'react-scroll';
import file from './kernel.txt';
const scroll = Scroll.animateScroll;

class HackerTyper extends React.Component {
  state = {
    fullText: [],
    textIdx: 0,
    text: ''
  };

  updateText = e => {
    const { text, fullText, textIdx } = this.state;
    const { speed } = this.props;

    let currentText = text;
    let textLength = textIdx;

    if (text.substring(text.length - 1, text.length) === '|') {
      // if last char is the cursor
      currentText = text.substring(0, text.length - 1); // remove it
      textLength = textIdx - 1;
    }

    this.setState(
      {
        text:
          currentText + fullText.slice(textLength, textLength + speed).join(''),
        textIdx: textLength + speed
      },
      scroll.scrollToBottom({ duration: 0 })
    );

    document.title = `Speed: ${speed}`;
  };

  blinkCursor = e => {
    // blinking cursor
    // eslint-disable-next-line
    const { text, fullText, textIdx } = this.state; // get console
    let currentText = text;
    let textLength = textIdx;
    if (text.substring(text.length - 1, text.length) === '|') {
      // if last char is the cursor
      currentText = text.substring(0, text.length - 1); // remove it
      textLength = textIdx - 1;
    } else {
      currentText = text + '|'; // else write it
      textLength = textIdx + 1;
    }
    this.setState(
      {
        text: currentText,
        textIdx: textLength
      },
      scroll.scrollToBottom({ duration: 0 })
    );
  };

  componentDidMount() {
    fetch(file)
      .then(r => r.text())
      .then(text => this.setState({ fullText: text.split('') }));
    document.addEventListener('keypress', this.updateText, false);
    this.interval = setInterval(this.updateText, 100);
    this.cursor = setInterval(this.blinkCursor, 500);
    document.body.style = 'background: black;';
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.updateText, false);
    clearInterval(this.interval);
    clearInterval(this.cursor);
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <pre style={{ fontSize: 20, color: 'green' }}>{text}</pre>
      </div>
    );
  }
}

export default HackerTyper;
