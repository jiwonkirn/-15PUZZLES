// 퍼즐의 숫자를 저장하는 배열 선언
const boardState = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// 랜덤 박스 배치 및 게임 진행 가능 여부 판단을 위한 반전쌍 판별 함수
function randomBox(arr) {
  // 랜덤으로 박스 배치
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  arr.forEach((item, index) => {
    let random = Math.floor(Math.random() * numArr.length)
    arr[index] = numArr[random]
    numArr.splice(random, 1)
  })

  // 랜덤으로 배치된 박스에서 반전쌍의 갯수 구하기
  let reversalPair = 0;

  for (let i = 0; i < 16; i+=4) {
    for (let j = i; j < i + 4; j++) {
      for (let k = j + 1; k < i + 4; k++) {
        if (arr[j] > arr[k]) {
          reversalPair++
        }
      }
    }
  }

  console.log(`현재의 반전쌍은 ${reversalPair}개 입니다.`)

  // 0의 위치 구하기
  let zeroPosition = 0;

  arr.forEach((item, index) => {
    if (item === 0) {
      zeroPosition += Math.floor(index / 4) + 1
    }
  })

  console.log(`현재 반전쌍은 ${zeroPosition}개 입니다.`)

  // 조건에 부합하지 않을 경우 함수 재실행
  if (zeroPosition % 2 === 1 && reversalPair % 2 === 0) {
    return randomBox(arr);
  } else if (zeroPosition % 2 === 0 && reversalPair % 2 === 1) {
    return randomBox(arr);
  } else {
    return arr;
  }

}

// 보드의 현 상태를 그리는 함수
const gameBoard = document.querySelector('.game-board')
const moveEl = document.querySelector('.moveEl')
function drawBoard() {
  gameBoard.querySelectorAll('.col').forEach((colEl, colIndex) => {
      colEl.setAttribute('data-idx', boardState[colIndex])
  })
  moveEl.textContent = move
};

// 클릭했을 때 움직이도록 상태를 변화시키는 함수
const gameTable = gameBoard.querySelectorAll('.col')
// 움직임 횟수 체크를 위한 move 변수 선언
let move = 0;
gameTable.forEach((colEl, colIndex) => {
  colEl.addEventListener('click', e => {

    let dataIdx = parseInt(colEl.getAttribute('data-idx'))

    let thisItem = boardState.indexOf(dataIdx)

    let rightItem = boardState.indexOf(dataIdx + 1)
    let dbRightItem = boardState.indexOf(dataIdx + 2)
    let tpRightItem = boardState.indexOf(dataIdx + 3)

    let leftItem = boardState.indexOf(dataIdx - 1)
    let dbLeftItem = boardState.indexOf(dataIdx - 2)
    let tpLeftItem = boardState.indexOf(dataIdx - 3)

    let topItem = boardState.indexOf(dataIdx - 4)
    let dbTopItem = boardState.indexOf(dataIdx - 8)
    let tpTopItem = boardState.indexOf(dataIdx - 12)

    let bottomItem = boardState.indexOf(dataIdx + 4)
    let dbBottomItem = boardState.indexOf(dataIdx + 8)
    let tpBottomItem = boardState.indexOf(dataIdx + 12)

    if (rightItem === 15
      && dataIdx + 1 !== 0 && dataIdx + 1 !== 4 && dataIdx + 1 !== 8 && dataIdx + 1 !== 12
      ) {
      boardState.splice(thisItem, 1, dataIdx + 1)
      boardState.splice(rightItem, 1, dataIdx)
      move += 1
      drawBoard()
    } else if (
      dbRightItem === 15
      && dataIdx + 1 !== 0 && dataIdx + 1 !== 4 && dataIdx + 1 !== 8 && dataIdx + 1 !== 12
      && dataIdx + 2 !== 0 && dataIdx + 2 !== 4 && dataIdx + 2 !== 8 && dataIdx + 2 !== 12
      ) {
      boardState.splice(thisItem, 1, dataIdx + 1)
      boardState.splice(rightItem, 1, dataIdx + 2)
      boardState.splice(dbRightItem, 1, dataIdx)
      console.log(boardState)
      move += 2
      drawBoard()
    } else if (
      tpRightItem === 15
      && dataIdx + 1 !== 0 && dataIdx + 1 !== 4 && dataIdx + 1 !== 8 && dataIdx + 1 !== 12
      && dataIdx + 2 !== 0 && dataIdx + 2 !== 4 && dataIdx + 2 !== 8 && dataIdx + 2 !== 12
      && dataIdx + 3 !== 0 && dataIdx + 3 !== 4 && dataIdx + 3 !== 8 && dataIdx + 3 !== 12
      ) {
      boardState.splice(thisItem, 1, dataIdx + 1)
      boardState.splice(rightItem, 1, dataIdx + 2)
      boardState.splice(dbRightItem, 1, dataIdx + 3)
      boardState.splice(tpRightItem, 1, dataIdx)
      console.log(boardState)
      move += 3
      drawBoard()
    } else if (
      leftItem === 15
      && dataIdx - 1 !== 3 && dataIdx - 1 !== 7 && dataIdx - 1 !== 11 && dataIdx - 1 !== 15
      ) {
      boardState.splice(thisItem, 1, dataIdx - 1)
      boardState.splice(leftItem, 1, dataIdx)
      move += 1
      drawBoard()
    } else if (
      dbLeftItem === 15
      && dataIdx - 1 !== 3 && dataIdx - 1 !== 7 && dataIdx - 1 !== 11 && dataIdx - 1 !== 15
      && dataIdx - 2 !== 3 && dataIdx - 2 !== 7 && dataIdx - 2 !== 11 && dataIdx - 2 !== 15
      ) {
      boardState.splice(thisItem, 1, dataIdx - 1)
      boardState.splice(leftItem, 1, dataIdx - 2)
      boardState.splice(dbLeftItem, 1, dataIdx)
      move += 2
      drawBoard()
    } else if (tpLeftItem === 15
      && dataIdx - 1 !== 3 && dataIdx - 1 !== 7 && dataIdx - 1 !== 11 && dataIdx - 1 !== 15
      && dataIdx - 2 !== 3 && dataIdx - 2 !== 7 && dataIdx - 2 !== 11 && dataIdx - 2 !== 15
      && dataIdx - 3 !== 3 && dataIdx - 3 !== 7 && dataIdx - 3 !== 11 && dataIdx - 3 !== 15
      ) {
      boardState.splice(thisItem, 1, dataIdx - 1)
      boardState.splice(leftItem, 1, dataIdx - 2)
      boardState.splice(dbLeftItem, 1, dataIdx - 3)
      boardState.splice(tpLeftItem, 1, dataIdx)
      move += 3
      drawBoard()
    } else if (topItem === 15) {
      boardState.splice(thisItem, 1, dataIdx - 4)
      boardState.splice(topItem, 1, dataIdx)
      move += 1
      drawBoard()
    } else if (dbTopItem === 15) {
      boardState.splice(thisItem, 1, dataIdx - 4)
      boardState.splice(topItem, 1, dataIdx - 8)
      boardState.splice(dbTopItem, 1, dataIdx)
      move += 2
      drawBoard()
    } else if (tpTopItem === 15) {
      boardState.splice(thisItem, 1, dataIdx - 4)
      boardState.splice(topItem, 1, dataIdx - 8)
      boardState.splice(dbTopItem, 1, dataIdx - 12)
      boardState.splice(tpTopItem, 1, dataIdx)
      move += 3
      drawBoard()
    } else if (bottomItem === 15) {
      boardState.splice(thisItem, 1, dataIdx + 4)
      boardState.splice(bottomItem, 1, dataIdx)
      move += 1
      drawBoard()
    } else if (dbBottomItem === 15) {
      boardState.splice(thisItem, 1, dataIdx + 4)
      boardState.splice(bottomItem, 1, dataIdx + 8)
      boardState.splice(dbBottomItem, 1, dataIdx)
      move += 2
      drawBoard()
    } else if (tpBottomItem === 15) {
      boardState.splice(thisItem, 1, dataIdx + 4)
      boardState.splice(bottomItem, 1, dataIdx + 8)
      boardState.splice(dbBottomItem, 1, dataIdx + 12)
      boardState.splice(tpBottomItem, 1, dataIdx)
      move += 3
      drawBoard()
    }

    // 승리조건 판별
    // 승리조건 판별을 위한 score 변수 선언
    let score = 0;
    // 해당 index 위치에 index + 1 숫자가 위치하면 score가 1씩 증가한다.
    for (let i = 0; i < 15; i++) {
      if(parseInt(gameTable[i].getAttribute('data-idx')) + 1 === parseInt(gameTable[i].textContent)) {
        score++
      } else score = 0
    }
    // score가 15가 되면 모든 숫자가 1~15의 순서로 위치한다는 의미이므로 게임 승리하고 종료한다.
    if (score === 15) {
      document.querySelector('.win').classList.add('view')
      restart.textContent = '재시작'
    }

  })
})

// 타이머 기능
let timeUp
const timeEl = document.querySelector('.timeEl-bottom')
function setIntervalAndExcute() {
  // 타이머 값 초기화
  timeEl.textContent = `00:00:00`
  let sec = 0, min = 0, hour = 0
  // 1000밀리초마다 timer함수를 실행하는 timeUp 함수를 설정
  timeUp = setInterval(timer, 1000)

  // 타이머 값의 상태를 변화시키는 함수 정의
  function timer() {
    sec = parseInt(sec)
    min = parseInt(min)
    hour = parseInt(hour)
    sec += 1
    if(sec < 10) {
      sec = '0' + sec
    } else if(sec === 60) {
      min += 1
      sec = '0' + 0
    }
    if(min < 10) {
      min = '0' + min
    } else if(min === 60) {
      hour += 1
      min = '0' + 0
    }
    if(hour === 0 || hour < 10) {
      hour = '0' + hour
    }
    // 타이머 값의 상태를 화면에 그려준다.
    timeEl.textContent = `${hour}:${min}:${sec}`
  }
  return timeUp
}

// 재시작 버튼 동작
const restart = document.querySelector('.btn-restart')

restart.addEventListener('click', e => {
  restart.textContent = '재시작'
  document.querySelector('.win').classList.remove('view') // 승리 모달 제거
  move = 0; // 움직임 횟수 초기화
  clearInterval(timeUp) // 기존에 돌고 있던 타이머 인터벌 종료
  setIntervalAndExcute()  // 타이머 인터벌이 들어있는 함수 재실행
  randomBox(boardState)
  drawBoard()
})

// 최초 타이머 인터벌 실행 및 상태에 따른 화면 그리기 수행
setIntervalAndExcute()
drawBoard()


// // 상태로부터 화면을 그리는 함수
// function drawBoard() {
//   // 정답 판별
//   isAnswer()
//   // move 값 변화
//   const moveEl = document.querySelector('.moveEl')
//   moveEl.textContent = move

//   document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
//     rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
//       // blank의 좌표 알아내는 법
//       if (boardState[rowIndex][colIndex] === 0) {
//         x = colIndex
//         y = rowIndex
//       }
//       // 퍼즐판에 boardState의 숫자를 넣어줌
//       colEl.textContent = boardState[rowIndex][colIndex];
//       // 만약, colEl이 X라면 'blank'class를 넣어줌
//       // if (boardState[rowIndex][colIndex] === 0) {
//       //   colEl.classList.add("blank");
//       // } else {
//       //   colEl.classList.remove("blank");
//       // }
//     })


// 클릭할 때 일어나는 변화 (방법 1: 배열 이용)
// document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
//   rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
//     colEl.addEventListener('click', e => {
//       if (rowIndex === y) {
//         boardState[rowIndex].splice(x, 1);
//         boardState[rowIndex].splice(colIndex, 0, 0);
//         move += 1
//         drawBoard();
//       } else if (colIndex === x && rowIndex < y) {
//         for (let i = 0; i < y - rowIndex; i++) {
//           boardState[y - i].splice(colIndex, 1, boardState[y - 1 - i][colIndex]);
//         }
//         boardState[rowIndex].splice(colIndex, 1, 0);
//         move += 1
//         drawBoard();
//       } else if (colIndex === x && rowIndex > y) {
//         for (let i = 0; i < rowIndex - y; i++) {
//           boardState[y + i].splice(colIndex, 1, boardState[y + 1 + i][colIndex]);
//         }
//         boardState[rowIndex].splice(colIndex, 1, 0);
//         move += 1
//         drawBoard();
//       }
//     })
//   })
// })

// // 정답 판별 함수
// function isAnswer() {
//   let answer = true
//   const newArr = new Array()
//   //boardState의 값을 새로운 1차원 배열에 넣어준다.
//   for(let i=0; i < boardState.length; i++) {
//     for(let j=0; j < boardState[i].length; j++) {
//       newArr.push(boardState[i][j])
//     }
//   }
//   // 새로 만든 1차원 배열을 순회하면서 값이 1~15 순서대로 나오는지 확인한다.
//   // 순서대로 나오지 않으면 answer를 false로 변경
//   for(let k=0; k < newArr.length-1; k++) {
//     if(newArr[k] !== k+1) {
//       answer = false
//     }
//   }
//   // 만약 answer가 false로 변하지 않고 계속 true라면 정답화면 출력
//   if(answer) {
//     console.log('정답입니다!')
//   } else {
//     console.log('오답입니다ㅠㅠ')
//   }

//   // console.log(newArr)
// }

// // 재시작 버튼을 눌렀을 때
// const restart = document.querySelector('.btn-restart')
// restart.addEventListener('click', e => {
//   move = 0;
//   clearInterval(timeUp) // 기존에 돌고 있던 타이머 인터벌 종료
//   setIntervalAndExcute()  // 타이머 인터벌이 들어있는 함수 재실행
//   randomBox(boardState)
//   drawBoard()
// })



