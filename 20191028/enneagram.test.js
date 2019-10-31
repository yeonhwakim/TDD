const getCharacter = (scores) => {
  const maxindices = []
  const neighbors = []
  const maxScore = scores
    .reduce((prev, curr) => {
      return prev > curr ? prev : curr
    })

  for(let i = 0; i < scores.length; i++){
    if(scores[i] === maxScore) maxindices.push(i)
    continue 
  }
  
  if(maxindices.length === 1) return maxindices[0]

  for(let i = 0; i < maxindices.length; i++){
    const sumNeighbor = getSumNeighbor(maxindices[i], scores)
    neighbors.push(sumNeighbor)
  }

  const maxNeighbor = neighbors
    .reduce((prev, curr) => {
      return prev > curr ? prev : curr
    })

  // for(let i = 0; i < )
  return maxindices[neighbors.indexOf(maxNeighbor)]
}


const getSumNeighbor = (index, scores) =>{
  const right = (index - 1) < 0 ?  scores[scores.length - 1] : scores[index - 1]
  const left = (index + 1) > scores.length-1 ? scores[0] : scores[index + 1]

  return right + left  
}

test('제일 높은 점수의 유형이 나온다.', () => {
  const character  = getCharacter([40, 20, 50, 36, 15 , 9, 21, 10, 4])
  expect(character).toBe(2)
})

test('제일 높은 점수의 유형이 중복된다.', () => {
  // 제일 높은 점수의 index들 뽑기
  // index가 1개 이상

  // index가 2개 일때

  // 1단계에서 판별
  // 제일 높은 점수의 index들의 이웃한 값 더하기
  // 더한 이웃 값중 큰 값에 해당 하는 원래 index 값 return
  const character  = getCharacter([40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(character).toBe(5)

  // 2단계에서 판별
  // 제일 높은 점수의 index들의 이웃한 값 더하기
  // 더한 이웃 값들이 같음
  // 그럼 그다음 양옆의 값을 더함
  // 더한 값들중 큰값의 원래 index 값 return
  // const character  = getCharacter([40, 10, 50, 10, 40 , 10, 50, 10, 4])
  // expect(character).toBe(2)
})

test('유형이 여러개다.', () => {
  
})

test('제일 높은 점수들의 이웃한 값', () => {
  // index값이 그냥 중간값
  const sum1 = getSumNeighbor(5, [40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(sum1).toBe(61)

  // index값이 맨 끝 값인 경우
  // left 값이 처음으로
  const sum2 = getSumNeighbor(8, [40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(sum2).toBe(50)

  // index값이 처음 값인 경우
  // right 값이 맨끝으로
  const sum3 = getSumNeighbor(0, [40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(sum3).toBe(24)
})