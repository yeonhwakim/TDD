const getCharacter = (scores) => {
  const maxIndices = getIndices(scores)
    
  if(maxIndices.length === 1) return maxIndices[0]

  for(let i = 0; i < parseInt((scores.length - 1)/2); i++){
    const neighbors = []

    for(let j = 0; j < maxIndices.length; j++){
      const sumNeighbor = getNeighbor(maxIndices[j], scores, (i + 1))
      neighbors.push(sumNeighbor)
    }

    const neighborsIndices = getIndices(neighbors)
  
    if(neighborsIndices.length === 1) return maxIndices[neighborsIndices]
  }
  
  return false
}

const getMax = (scores) => {
  return scores.reduce((prev, curr) => {
    return prev > curr ? prev : curr    
  })
}

const getIndices = (scores) => {
  const max = getMax(scores)
  let indices = []
  for(let i = 0; i < scores.length; i++){
    if(scores[i] === max) indices.push(i)
    continue 
  }

  return indices
}

const getNeighbor = (index, scores, turn) =>{
  const right = (index - turn) < 0 ?  scores[scores.length - turn] : scores[index - turn]
  const left = (index + turn) > scores.length - turn ? scores[0] : scores[index + turn]

  return right + left  
}

test('제일 높은 점수의 유형이 나온다.', () => {
  const character  = getCharacter([40, 20, 50, 36, 15 , 9, 21, 10, 4])
  expect(character).toBe(2)
})

test('제일 높은 점수의 유형이 중복된다.', () => {
  // 제일 높은 점수의 index들 뽑기
  // index가 1개 이상

  // 1단계에서 판별
  // 제일 높은 점수의 index들의 이웃한 값 더하기
  // 더한 이웃 값 중 큰 값에 해당 하는 원래 index 값 return
  const character  = getCharacter([40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(character).toBe(5)

  // 2단계에서 판별
  // 제일 높은 점수의 index들의 이웃한 값 더하기
  // 더한 이웃 값들이 같음
  // 그럼 그다음 양옆의 값을 더함
  // 더한 값들 중 큰 값의 원래 index 값 return
  const character2  = getCharacter([40, 10, 50, 10, 40 , 10, 50, 10, 4])
  expect(character2).toBe(2)

  const character3  = getCharacter([40, 10, 50, 10, 50 , 10, 50, 10, 4])
  expect(character3).toBe(4)
})

test('유형이 여러개다.', () => {
  const character  = getCharacter([40, 40, 40, 40, 40 , 40, 40, 40, 40])
  expect(character).toBeFalsy()

})


test('제일 높은 점수 얻기', () => {
  const maxSores = getMax([40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(maxSores).toBe(50)
})

test('가장 큰 점수 가지고 있는 인덱스', () => {
  const maxSores = getMax([40, 20, 50, 10, 40 , 50, 21, 10, 4])
  const SameScoreIdex = getIndices([40, 20, 50, 10, 40 , 50, 21, 10, 4])
  expect(SameScoreIdex).toEqual([2, 5])
})

test('제일 높은 점수들의 이웃한 값의 합', () => {
  // index값이 그냥 중간값
  const sum1 = getNeighbor(5, [40, 20, 50, 10, 40 , 50, 21, 10, 4], 1)
  expect(sum1).toBe(61)

  // index값이 맨 끝 값인 경우
  // left 값이 처음으로
  const sum2 = getNeighbor(8, [40, 20, 50, 10, 40 , 50, 21, 10, 4], 1)
  expect(sum2).toBe(50)

  // index값이 처음 값인 경우
  // right 값이 맨끝으로
  const sum3 = getNeighbor(0, [40, 20, 50, 10, 40 , 50, 21, 10, 4], 1)
  expect(sum3).toBe(24)

  // 2칸 neighbor
  const sum4 = getNeighbor(0, [40, 20, 50, 10, 40 , 50, 21, 10, 4], 2)
  expect(sum4).toBe(60)
})
