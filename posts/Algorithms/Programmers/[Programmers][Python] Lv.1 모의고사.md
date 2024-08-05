#### **Overview**

*   체감 난이도: ★☆☆☆☆
*   문제 레벨: Lv.1 
*   문제 유형: 완전탐색
*   풀이 상태: 답안참고 / 스스로 해결
*   추후: 다시 풀어보기 / 간단 복습 / 완벽 이해 

* * *

#### **\[문제\]**

[https://school.programmers.co.kr/learn/courses/30/lessons/42840](https://school.programmers.co.kr/learn/courses/30/lessons/42840)

 [프로그래머스

코드 중심의 개발자 채용. 스택 기반의 포지션 매칭. 프로그래머스의 개발자 맞춤형 프로필을 등록하고, 나와 기술 궁합이 잘 맞는 기업들을 매칭 받으세요.

programmers.co.kr](https://school.programmers.co.kr/learn/courses/30/lessons/42840)

#### **\[코드\]**

덱을 사용해서 rotate하면서 one, two, three 를 answer 와 비교해준다. 

    from collections import deque
    
    def solution(answers):
        answer = []
    
        one = deque([1,2,3,4,5])
        two = deque([2,1,2,3,2,4,2,5])
        three = deque([3,3,1,1,2,2,4,4,5,5])
    
        cnt1, cnt2, cnt3 = 0, 0, 0
        for i in range(len(answers)):
            if answers[i] == one[0]:
                cnt1 += 1
            one.rotate(-1)
    
            if answers[i] == two[0]:
                cnt2 += 1
            two.rotate(-1)
    
            if answers[i] == three[0]:
                cnt3 += 1
            three.rotate(-1)
    
        # 비교를 어떻게 하지?
        arr = [0, cnt1, cnt2, cnt3]
    
        max_cnt = max(arr)
        for i in range(1, len(arr)):
            if max_cnt == arr[i]:
                answer.append(i)
    
        return answer

![](https://blog.kakaocdn.net/dn/bcQ38Q/btsIUwILKv4/xkeVodzZ9vbHe15PUpuhk1/img.png)

#### **\[배운 점\]**

    from itertools import cycle

itertools.cycle() 함수로 무한히 반복하는 이터레이터를 만들고 next()를 호출하여 다음 값을 계속 요청한다. 

> next() 함수는 파이썬 내장 함수로, 이터레이터의 다음 요소를 반환하는 함수

_**\* cycle() 함수와 next() 함수로 구현한 코드**_

    from itertools import cycle
    
    def solution(answers):
        patterns = [
            cycle([1, 2, 3, 4, 5]),
            cycle([2, 1, 2, 3, 2, 4, 2, 5]),
            cycle([3, 3, 1, 1, 2, 2, 4, 4, 5, 5])
        ]
        
        scores = [0, 0, 0]
    
        for ans in answers:
            for i, pattern in enumerate(patterns):
                if ans == next(pattern):
                    scores[i] += 1
    
        max_score = max(scores)
        return [i + 1 for i, score in enumerate(scores) if score == max_score]

![](https://blog.kakaocdn.net/dn/YfDm4/btsIWeNG8bM/kWUyunaIqOkD5DLZHT2f91/img.png)

[https://docs.python.org/3/library/itertools.html#itertools.cycle](https://docs.python.org/3/library/itertools.html#itertools.cycle "참고자료")

 [itertools — Functions creating iterators for efficient looping

This module implements a number of iterator building blocks inspired by constructs from APL, Haskell, and SML. Each has been recast in a form suitable for Python. The module standardizes a core set...

docs.python.org](https://docs.python.org/3/library/itertools.html#itertools.cycle)

[https://wikidocs.net/108925](https://wikidocs.net/108925 "itertools.cycle()")

 [023 상담원을 순서대로 배정하려면? ― itertools.cycle

itertools.cycle(iterable)은 반복 가능한 객체(iterable)를 순서대로 무한히 반복하는 이터레이터를 생성하는 함수이다. > 이터레이터란 next() 함수…

wikidocs.net](https://wikidocs.net/108925)