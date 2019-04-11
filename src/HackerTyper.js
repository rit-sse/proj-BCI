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
    const { speed } = this.props ;

    this.setState(
      {
        text: text + fullText.slice(textIdx, textIdx + speed).join(''),
        textIdx: textIdx + speed
      },
      scroll.scrollToBottom({ duration: 0 })
    );

    document.title = `Speed: ${speed}`;
  };

  componentDidMount() {
    fetch(file)
      .then(r => r.text())
      .then(text => this.setState({ fullText: text.split('') }));
    // document.addEventListener('keypress', this.updateText, false);
    this.interval = setInterval(this.updateText, 100);
    document.body.style = 'background: black;';
  }

  componentWillUnmount() {
    // document.removeEventListener('keypress', this.updateText, false);
    clearInterval(this.interval);
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
