import React from 'react';
import './App.css';
import Board from "./components/Board.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tic-tac-toe board
      board: [['','',''],['','',''],['','','']],
      // current player
      turn: 'X',
      // has anyone won?
      won: false,
      // who won?
      wins: ''
    };
    // bind functions
    this.choice = this.choice.bind(this);
    this.restart = this.restart.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }
  // changes value at specific position of board
  choice(i, j) {
    // state variables
    const { board, turn, won } = this.state;
    // as long as position has not been played and no one has won...
    if (board[i][j] === '' && !won) {
      // update specific board position in array
      board[i][j] = turn;
      // set state for new board and swap turn
      this.setState({
        board: board,
        turn: turn === "X" ? 'O' : 'X'
      });
      // check for a winner
      this.checkWin(turn);
    }
  }
  // restarts the board to initial values
  restart() {
    this.setState({
      board: [['','',''],['','',''],['','','']],
      turn: 'X',
      won: false,
      wins: ''
    })
  }
  // checks to see if player has won
  checkWin(play) {
    // state variable
    const { board } = this.state;
    // loop through board layers
    for (let i = 0; i < board.length; i++) {
      // if there is a row or column that matches the current play...
      if (
        (board[i][0] === play && board[i][1] === play && board[i][2] === play)
        || (board[0][i] === play && board[1][i] === play && board[2][i] === play)
      ) {
        // update the state to display who won
        this.setState({
          won: true,
          wins: play
        });
      }
      // if a diagonal matches the current play...
      if (
        (board[0][0] === play && board[1][1] === play && board[2][2] === play)
        || (board[0][2] === play && board[1][1] === play && board[2][0] === play)
      ) {
        // update the state to display who won
        this.setState({
          won: true,
          wins: play
        })
      }
    }
  }
  render() {
    // state variable
    const { board, wins } = this.state;
    // make style constant if there is a winner
    const winStyle = wins === "X" ? {zIndex: 1, backgroundColor: 'rgba(255, 0, 0, .6)'} : wins === "O" ? {zIndex: 1, backgroundColor: 'rgba(0, 0, 255, .6)'} : {zIndex: -1} ;
    return (<div id="app">
      {/* restart button */}
      <button onClick={this.restart} className="restart">Restart</button>
      {/* container to hold board and absolute positioned winner element */}
      <div style={{position: 'relative'}}>
        {/* board component with board state and choice function as props */}
        <Board board={board} choice={this.choice} />
        {/* winner element shows up when there is a winner and has restart onclick */}
        <div style={winStyle} id="winner" onClick={this.restart}>{wins} WINS</div>
      </div>
    </div>);
  }
}

export default App;