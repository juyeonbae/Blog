#### **Overview**

*   체감 난이도: ☆☆☆☆☆
*   문제 레벨: Lv.1
*   문제 유형: 구현
*   풀이 상태: 답안참고 / 스스로 해결
*   추후: 다시 풀어보기 / 간단 복습 / 완벽 이해 

* * *

#### **\[문제\]**

[https://school.programmers.co.kr/learn/courses/30/lessons/176963](https://school.programmers.co.kr/learn/courses/30/lessons/176963)

 [프로그래머스

코드 중심의 개발자 채용. 스택 기반의 포지션 매칭. 프로그래머스의 개발자 맞춤형 프로필을 등록하고, 나와 기술 궁합이 잘 맞는 기업들을 매칭 받으세요.

programmers.co.kr](https://school.programmers.co.kr/learn/courses/30/lessons/176963)

#### **\[코드\]**

**딕셔너리를 사용해서 딕셔너리에 해당 이름이 있으면 values 값을 더해준다.**

    def solution(name, yearning, photo):
        answer, d = [], {}
    
        for i in range(len(name)):
            d[name[i]] = yearning[i]
    
        for p in photo:
            tmp = 0
            for i in p:
                if i in d:
                    tmp += d[i]
            answer.append(tmp)
    
        return answer

#### **\[배운 점\]**

    d = dict(zip(name, yearning))

zip(name, yearning)은 name 리스트와 yearning 리스트를 짝지어준다.

name이 \['Alice', 'Bob'\]이고 yearning이 \[10, 20\]이라면, zip(name, yearning)은 \[('Alice', 10), ('Bob', 20)\]을 생성한다.

dict() 함수를 사용하여 이 튜플 리스트를 딕셔너리로 변환한다.

결과적으로 d는 {'Alice': 10, 'Bob': 20} 된다. 

    return [sum(d.get(person, 0) for person in p) for p in photo]

d.get(person, 0)은 딕셔너리 d에서 person의 점수를 가져온다.

만약 person이 d에 없으면 기본값으로 0을 반환한다.

![](https://blog.kakaocdn.net/dn/DGxmB/btsIXlUrgVd/ymfQvzJHy27T8NKk86lN00/img.png)