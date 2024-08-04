#### **Overview**

*   체감 난이도: ★☆☆☆☆
*   문제 레벨: Lv.1
*   문제 유형: 구현
*   풀이 상태: 답안참고 / 스스로 해결
*   추후: 다시 풀어보기 / 간단 복습 / 완벽 이해 

* * *

#### **\[문제\]**

[https://school.programmers.co.kr/learn/courses/30/lessons/77484](https://school.programmers.co.kr/learn/courses/30/lessons/77484)

 [프로그래머스

코드 중심의 개발자 채용. 스택 기반의 포지션 매칭. 프로그래머스의 개발자 맞춤형 프로필을 등록하고, 나와 기술 궁합이 잘 맞는 기업들을 매칭 받으세요.

programmers.co.kr](https://school.programmers.co.kr/learn/courses/30/lessons/77484)

#### **\[코드\]**

**처음에 푼 코드 (매우 지저분함)**

**처음에도 count() 함수를 이용했으나, 시간복잡도가 O(N)이라서 이렇게 풀어도 상관없을거라 생각했다.** 

    def solution(lottos, win_nums):
        answer = [0, 6, 5, 4, 3, 2, 1]
    
        zero, cnt, arr = 0, 0, []
        for i in lottos:
            if i == 0:
                zero += 1
            else:
                arr.append(i)
    
        for i in arr:
            for j in win_nums:
                if i == j:
                    cnt += 1
    
        if zero == 0:
            if cnt == 0:
                return [6, 6]
            else:
                return [answer[cnt], answer[cnt]]
        else:
            if cnt == 0:
                return [answer[zero], answer[cnt+1]]
            else:
                return [answer[cnt + zero], answer[cnt]]

**굳이 0을 제외한 새로운 배열을 따로 만들어줄 필요가 없다. -> lottos 배열에 있는지 바로 확인해준다.** 

**경우의 수를 쪼개주는 대신 answer 배열 첫 원소를 6으로 설정한다.** 

**그러면 아래와 같이 간단하게 정리할 수 있다.**

    def solution(lottos, win_nums):
        answer = [6, 6, 5, 4, 3, 2, 1]
    
        zero = lottos.count(0)
        
        cnt = 0
        for i in win_nums:
            if i in lottos:
                cnt += 1
    
        return answer[zero + cnt], answer[cnt]

![](https://blog.kakaocdn.net/dn/9JEDv/btsIUzEkD7b/lvD0kLGIpDYsTVkd9EaOwk/img.png)