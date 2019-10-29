const getCharacter = (scores) => {
  const maxScores = []
  const maxScore = scores
    .reduce((prev, curr) => {
      return prev > curr ? prev : curr
    })

  for(let i = 0; i < scores.length; i++){
    if(scores[i] === maxScore) maxScores.push(i)
    continue 
  }

  
  //2 8
  // 
   

  return maxScores[maxScores.length-1]
}


// test('제일 높은 점수의 유형이 나온다.', () => {
//   const character  = getCharacter([40, 20, 50, 36, 15 , 9, 21, 10, 4])
//   expect(character).toBe(2)
// })

test('제일 높은 점수의 유형이 중복된다.', () => {
  const character  = getCharacter([40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(character).toBe(5)
})