import React, { Component } from 'react';
import './rockPaperScissors.css';

let counter = 0;

const PlayerCard = ({color, symbol})=> {
    const style = {
        backgroundColor: color,
    }
    return(
        <div style = {style} className="player-card">
            {symbol}
        </div>
    )
}

class RockPaperScissors extends Component {
    constructor(props){
        super(props);
        this.symbols=['rock', 'paper', 'scissors']
        this.state={}
    }
    decideWinner = () => {
        const {player, computer} = this.state;
        if(player===computer) {
            return "It's a draw"
        }
        if((player==='paper' && computer==='rock') || 
        (player==='rock' && computer==='scissors') || 
        (player==='scissors' && computer==='paper')) {
            return "Player Wins!"
        }
        return "Computer Wins!"
    }
    getLargestWave = () => {
        const { alpha, delta, theta } = this.props;
        if (alpha >= delta && alpha >= theta) {
            return 0;
        }
        if (delta >= alpha && delta >= theta) {
            return 1;
        }
        if (theta >= alpha && theta >= delta) {
            return 2;
        }
    }

    componentDidMount() {
        this.runGame()
    }

    runGame = () => {
        this.interval = setInterval(() => {
            counter++;    
            this.setState({
                playerRed: this.symbols[this.getLargestWave],
                playerBlue: this.symbols[Math.floor(Math.random()*3)],
                winner:""
            })
        },40)
    }

    componentWillUnmount() {
        if (counter >40) {
            clearInterval(this.interval)
            this.setState({winner:this.decideWinner()})
        }
        console.log(counter)
    }

    render() {
        return (
            <div className="game">
                <PlayerCard
                    color="red"
                    symbol={this.state.player} />
                <PlayerCard
                    color="blue"
                    symbol={this.state.computer} />
                <p>{this.state.winner}</p>
                <button onClick={this.runGame}>Run Game</button>
            </div>
        );
    }
}

export default RockPaperScissors;