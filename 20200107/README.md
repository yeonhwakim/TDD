# 20200107 2020년 첫 코딩도장

[문제 프로그래머스 > 코딩테스트 연습 > 서머코딩/윈터코딩(~2018) > 스킬트리](https://programmers.co.kr/learn/courses/30/lessons/49993)  
[코딩도장 짝프로그래밍 PR](https://github.com/dal-lab/coding-dojo/pull/48)

## 이해
  선수과목으로 이해

  주어진 skill에 알맞게 이수한 skillTrees 개수를 구하라

  * 입력값: 스킬트리, 사용자들이 배우려고하는 스킬순서들
    출력값: 주어진 스킬트리에 순서에 맞게 배울 스킬을 나열한 사람의 수

## 계획
  ```skill = "abk"```
  ```skillTrees = ["acb", "bsek", "aebrk"]```
  1. 주어진 skill의 경우의 수를 구한다. ["a", "ab", "abk"]
  2. skillTrees 각각의 skillTree에서 해당 skill 요소들을 구한다. ["ab", "bk", "abk"]
  3. 2를 돌면서 1에 인덱스가 있는지 확인하며 개수를 구한다.

## 실행

## 회고



