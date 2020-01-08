const getCharacter = (scores) => {
  const maxIndices = getIndices(range(scores.length), scores);

  const step = (indices, turn) => {
    if (turn > scores.length / 2) {
      return false;
    }

    if (indices.length === 1) {
      return indices[0];
    }

    const points = maxIndices.map(i => getNeighbor(i, scores, turn));
    return step(getIndices(maxIndices, points), turn + 1);
  }

  return step(maxIndices, 0)
}

const getIndices = (indices, points) => {
  const maxPoint = Math.max(...points)
  return flatten(points.map((point, i) => point === maxPoint ? [indices[i]] : []));
}

const getNeighbor = (index, scores, turn) =>
  neighbor(scores, index, -turn) + neighbor(scores, index, turn);

const neighbor = (items, index, offset) =>
  items[(index + offset + items.length) % items.length];

const flatten = xs =>
  xs.reduce((acc, x) => [...acc, ...(isIterable(x) ? x : [x])], []);

const isIterable = x => x !== null && typeof x[Symbol.iterator] === 'function';

const range = n => [...Array(n)].map((_, i) => i);

test('제일 높은 점수의 유형이 나온다.', () => {
  const character  = getCharacter([40, 20, 50, 36, 15 , 9, 21, 10, 4])
  expect(character).toBe(2)
})

test('가장 높은 점수를 받은 게 여럿이면 양 옆의 점수를 더해서 활용한다', () => {
  expect(getCharacter([0, 2, 0, 2, 1])).toBe(3)
  expect(getCharacter([2, 1, 0, 2, 0])).toBe(0)
  expect(getCharacter([1, 0, 2, 0, 2])).toBe(4)
  expect(getCharacter([40, 20, 50, 10, 40 , 50, 21, 10, 4])).toBe(5)
});

test('가장 높은 점수의 양 옆에 있는 점수의 합이 같으면 그 옆도 활용한다', () => {
  expect(getCharacter([0, 0, 2, 0, 0, 2, 0, 1])).toBe(5)
  expect(getCharacter([40, 10, 50, 10, 50 , 10, 50, 10, 4])).toBe(4)
});

test('제일 높은 점수의 유형이 중복된다.', () => {
  return;
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

test('유형이 여러 개다.', () => {
  const character  = getCharacter([40, 40, 40, 40, 40 , 40, 40, 40, 40])
  expect(character).toBeFalsy()
})

test('가장 큰 점수 가지고 있는 인덱스', () => {
  const scores = [40, 20, 50, 10, 40 , 50, 21, 10, 4];
  expect(getIndices(range(scores.length), scores)).toEqual([2, 5])
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

test('neighbor', () => {
  const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(neighbor(scores, 0, -1)).toBe(9);
  expect(neighbor(scores, 0, 1)).toBe(2);
  expect(neighbor(scores, 0, -2)).toBe(8);
  expect(neighbor(scores, 0, 2)).toBe(3);
})

test('flatten', () => {
  expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  expect(flatten([1, [2], 3])).toEqual([1, 2, 3]);
  expect(flatten([[1], [2], [3]])).toEqual([1, 2, 3]);
})

test('isIterable', () => {
  expect(isIterable(1)).toBeFalsy();
  expect(isIterable([1])).toBeTruthy();
})

test('range', () => {
  expect(range(3)).toEqual([0, 1, 2])
})
