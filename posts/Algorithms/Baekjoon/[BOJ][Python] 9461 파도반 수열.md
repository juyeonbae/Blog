#### **Overview**

*   체감 난이도: ★★☆☆☆
*   문제 레벨: 실버 3
*   문제 유형: DP
*   풀이 상태: 답안참고 / 스스로 해결
*   추후: 다시 풀어보기 / 간단 복습 / 완벽 이해 

* * *

#### **\[문제\]**

[https://www.acmicpc.net/problem/9461](https://www.acmicpc.net/problem/9461)

![](https://blog.kakaocdn.net/dn/wBZrr/btsIRmeYJDr/yEphtnEocPavwYmbToDEA0/img.png)

#### **\[코드\]**

1\. 점화식을 구한다. n = (n - 2) + (n - 3)

2\. 메모이제이션 기법으로 계산 값을 저장해놓고 해당 값이 호출되면 그 값을 더해준다. 

    # S3_9461_파도반 수열.py
    
    def padovan(n):
        if memo[n] != -1:
            return memo[n]
        if n <= 3:
            memo[n] = 1
        else:
            memo[n] = padovan(n - 2) + padovan(n - 3)
    
        return memo[n]
    
    
    T = int(input())  # testcase
    for tc in range(T):
        n = int(input())
        memo = [-1 for _ in range(n+1)]
        print(padovan(n))

![](https://blog.kakaocdn.net/dn/y3nSN/btsIRU3rdyl/Rd9LukB2vdHablGrKoh6hK/img.png)