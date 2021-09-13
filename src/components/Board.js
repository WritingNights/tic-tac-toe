import React from "react";

export default function Board(props) {
    // prop variable
    const board = props.board;
    // map rows in board
    const boardMap = board.map((obj, i, array) => {
        // map squares in row
        const boardRow = array[i].map((obj, j, array) => {
            // update style of square depending on turn
            const style = array[j] === "X" ? {
                backgroundColor: 'rgb(255, 70, 70)',
                color: 'white',
                border: '6px solid red'
            } : array[j] === "O" ? {
                backgroundColor: 'rgb(70, 70, 255)',
                color: 'white',
                border: '6px solid blue'
            } : {};
            // return square element with a choice onclick that updates with mapped values
            return (<div className="square" style={style} onClick={() => props.choice(i, j)}>{array[j] === "X" ? 'X' : array[j] === "O" ? 'O' : ''}</div>);
        });
        // return row of squares
        return (<div className="row">{boardRow}</div>);
    });
    // return the board
    return (
        <section id="board">
            {boardMap}
        </section>
    );
}