import './App.css'
import { useState } from 'react'

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true) // xIsNext : true
  // null로 채워져있는 length가 9인 배열 state 생성
  const [squares, setSquares] = useState(Array(9).fill(null)) // squares : [null, null, null, null, null, null, null, null, null]

  function handleClick(i) {
    // 이미 둔 자리이거나, 3개를 붙여서 놓으면 리턴시켜서 더이상 작동안되게 한다.
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    // slice() : 전체 복사해서 새로운 array를 만든다. slice(2, 5) : index 2 ~ 4까지만 잘라서 복사한다.
    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    // squares[i] = 'x'; : 바로 접근해서 변경이 안됨. 그래서 slice로 squares 배열을 새로운 배열 nextSquares에 복사해서 해당 index 자리에 'x' 표시후 그걸 setSquares에 저장해서 새복사본으로 교체하는거다.
    setSquares(nextSquares)
    // bool 값을 반대로 변경하기
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {/* When the square is clicked, the code after the => “arrow” will run, calling handleClick(0)*/}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
