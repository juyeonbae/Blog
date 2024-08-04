#### **Overview**

*   체감 난이도: ★★☆☆☆
*   문제 레벨: Lv.1
*   문제 유형: 구현?
*   풀이 상태: 답안참고 / 스스로 해결
*   추후: 다시 풀어보기 / 간단 복습 / 완벽 이해 

* * *

#### **\[문제\]**

**[https://school.programmers.co.kr/learn/courses/30/lessons/67256](https://school.programmers.co.kr/learn/courses/30/lessons/67256)**

 [프로그래머스

코드 중심의 개발자 채용. 스택 기반의 포지션 매칭. 프로그래머스의 개발자 맞춤형 프로필을 등록하고, 나와 기술 궁합이 잘 맞는 기업들을 매칭 받으세요.

programmers.co.kr](https://school.programmers.co.kr/learn/courses/30/lessons/67256)

#### **\[조건\]**

1\. 손가락은 상, 하, 좌, 우로 이동한다. 

2\. 왼손, 오른손 각각 초기 위치: \* #

3\. 1, 4, 7 (왼손) / 3, 6, 9 (오른손) / 2, 5, 8, 0 (왼손과 오른손 중 더 가까운 손 - 거리가 같다면 왼손잡이인지 오른손잡이인지 따져준다. )

#### **\[풀이 방법\]**

3번 조건 때문에 키패드의 위치를 표시할 수 있는 방법이 필요했다. 

나는 아래와 같이 배열을 통해 인덱스로 왼손과 오른손의 위치를 표현해주려고 했다. 

**i/j**

**0**

**1**

**2**

**0**

1

2

3

**1**

4

5

6

**2**

7

8

9

**3**

\*

0

#

> Q. 왼손과 오른손의 거리를 비교하기 위해 이전 위치 값을 어떻게 저장할 것인가?   
> A. 왼손과 오른손의 위치 값을 저장해줄 배열을 만든다. 

> \[전체 풀이 과정\]  
> 1\. 왼손과 오른손의 초기값은 \* , #  이므로 tl = \[\[3,0\]\], tr = \[3,2\]\]로 초기화해준다.   
> 2\. n이 \[1, 4, 7\] 이면 L 추가, \[3, 6, 9\] 이면 R 추가  
> 3\. n이 \[2, 5, 8, 0\] 이면, left(이전 위치 - 현재 위치) 와 right(이전 위치 - 현재 위치)를 구해준다.   
> 3-1.  left와 right 값을 비교해서 적은 쪽의 손을 움직여준다. (answer에 더 적은 값의 손을 (L, R)을 추가해준다.)  
> 3-2. 두 값이 같다면, hand 입력 값에서 왼손잡이인지 오른손잡이인지 확인해준다.   
> 4\. n 값을 확인하고, L 을 answer에 추가해주면, tl 배열에 현재 위치 값을 append해준다. (왼손 이동)  
>     n 값을 확인하고, R 을 answer에 추가해주면, tr 배열에 현재 위치 값을 append해준다. (오른손 이동)

_다른 사람들 풀이 중 키패드를 딕셔너리를 사용해서 푼 풀이가 있었다._ 

_딕셔너리를 사용하면 시간복잡도가 더 줄 것으로 예상된다._ 

#### **\[코드\]**

    def solution(numbers, hand):
        answer, tl, tr = '', [[3, 0]], [[3, 2]]
    
        # 키패드 배열
        arr = [[1,2,3],[4,5,6],[7,8,9],['*',0,'#']]
        # 왼손 키, 오른손 키
        left_key, right_key = [1,4,7], [3,6,9]
    
        for n in numbers:
            for i in range(4):
                for j in range(3):
                    if arr[i][j] == n:
                        if n in left_key:
                            answer += 'L'
                            tl.append([i, j])
                        elif n in right_key:
                            answer += 'R'
                            tr.append([i, j])
                        else:
                            left = abs(tl[-1][0] -i) + abs(tl[-1][1] - j)
                            right = abs(tr[-1][0] -i) + abs(tr[-1][1] - j)
    
                            if left > right:
                                answer += 'R'
                                tr.append([i, j])
                            elif left < right:
                                answer += 'L'
                                tl.append([i, j])
                            else:
                                if hand == 'right':
                                    answer += 'R'
                                    tr.append([i, j])
                                else:
                                    answer += 'L'
                                    tl.append([i, j])
    
        return answer

![](https://blog.kakaocdn.net/dn/U628c/btsISIoFeJC/Rjfwfpa9G80FIYlOFsVO00/img.png)

#### **\[딕셔너리로 푼 코드\]**

손을 이동할 때마다 현재 위치를 배열에 저장하지 않고,

딕셔너리에서 해당 값을 찾아 left\_pos, right\_pos 배열값을 업데이트해준다.

    def solution(numbers, hand):
        answer = ''
        left_pos, right_pos = [3, 0], [3, 2]
        keypad = {1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2],
                  7: [2, 0], 8: [2, 1], 9: [2, 2], '*': [3, 0], 0: [3, 1], '#': [3, 2]}
        
        left_keys, right_keys = {1, 4, 7}, {3, 6, 9}
        
        for number in numbers:
            pos = keypad[number]
            if number in left_keys:
                answer += 'L'
                left_pos = pos
            elif number in right_keys:
                answer += 'R'
                right_pos = pos
            else:
                left_dist = abs(left_pos[0] - pos[0]) + abs(left_pos[1] - pos[1])
                right_dist = abs(right_pos[0] - pos[0]) + abs(right_pos[1] - pos[1])
                
                if left_dist < right_dist:
                    answer += 'L'
                    left_pos = pos
                elif left_dist > right_dist:
                    answer += 'R'
                    right_pos = pos
                else:
                    if hand == 'right':
                        answer += 'R'
                        right_pos = pos
                    else:
                        answer += 'L'
                        left_pos = pos
                        
        return answer

![](https://blog.kakaocdn.net/dn/NljuA/btsIReBYq9j/xQiMZQU3iSfRqtA0DyaL70/img.png)

속도도 훨씬 빠르다...