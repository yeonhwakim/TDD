const getPrimeNumber = (arr) => {
  const numberOfCase = getNumberOfCase(arr)
  
  return numberOfCase.filter(number => checkPrimeNumer(number)).length
}

const getNumberOfCase = (arr) => {
  const numberOfCase = []

  for(let i = 0; i < arr.length - 2; i++){
    for(let j = i + 1; j < arr.length-1; j++){
      for(let k = j + 1; k < arr.length; k++){
        numberOfCase.push(arr[i] + arr[j] + arr[k])
      }
    }
  }

  return numberOfCase
}

const checkPrimeNumer = (number) => {
  for(let i = 2; i < number; i++){
    if(number%i === 0) {
      return false
    }
  }
  return true
}

test('getPrimeNumber', () => {
  expect(getPrimeNumber([1,2,3,4])).toBe(1)
})

test('getNumberOfCase', () => {
  expect(getNumberOfCase([1,2,3,4])).toEqual([6, 7, 8, 9])
}) 

test('checkPrimeNumer', () => {
  expect(checkPrimeNumer([3])).toBeTruthy()
  expect(checkPrimeNumer([4])).toBeFalsy()
}) 