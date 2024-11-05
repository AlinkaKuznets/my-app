function Board(props) {
    return (
        <div className="general">
            <h1>Tic-Tak-Toe with BiMo</h1>
            <img className="frog1" src="../image/frog1.png" alt="frog" />
            <img className="bimo" src="../image/BiMo.png" alt="bimo" />
            <div className="board" {...props} />
        </div>
    )
}

export default Board;