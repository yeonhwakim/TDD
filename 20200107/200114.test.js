// skill = "abk"
// skillTrees = ["acb", "bsek", "aebrk"]
// 1. 주어진 skill의 경우의 수를 구한다. ["a", "ab", "abk"]  
// 2. skillTrees 각각의 skillTree에서 해당 skill 요소들을 구한다. ["ab", "bk", "abk"]  
// 3. 2를 돌면서 1에 인덱스가 있는지 확인하며 개수를 구한다.  

const getNumberOfCases = (skill) =>{
  const numberOfCases = [];
  [...skill].forEach((s, i) => numberOfCases.push((i ? numberOfCases[i - 1] : '') + s));

  return numberOfCases;
};

const getFilteredSkillTrees = (skill, skillTrees) => {
  return skillTrees.map(skillTree => 
    [...skillTree].filter(s => skill.includes(s)).join('')
  );
}

const getCorrectSkillTreesCount = (skill, skillTrees) => {
  const numberOfcases = getNumberOfCases(skill);
  const filteredSkillTrees = getFilteredSkillTrees(skill, skillTrees);

  return filteredSkillTrees.filter(f => numberOfcases.indexOf(f) !== -1 || f === '').length;
};

test('getFilteredSkillTrees', () =>{
  expect(getFilteredSkillTrees("CBD", ["BACDE", "CBADF", "AECB", "BDA"])).toEqual(["BCD", "CBD", "CB", "BD"]);
});

test('getNumberOfCases', () =>{
  expect(getNumberOfCases("CBD")).toEqual(['C', 'CB', 'CBD']);
});

test('getCorrectSkillTreesCount', () => {
  expect(getCorrectSkillTreesCount("CBD", ["BACDE", "CBADF", "AECB", "BDA", "B", "D", "C", "CC", "CBDCBD", "QQ", "cbd", "CCB"])).toBe(5);
}) 