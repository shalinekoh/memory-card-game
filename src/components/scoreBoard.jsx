import '../styles/scoreBoard.css'

function ScoreBoard({ score, highScore }) {
    return (
        <div className="score-board">
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
      </div>
    )
}

export default ScoreBoard;
