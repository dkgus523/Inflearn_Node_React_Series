### 1 ~ 7 
  - 티스토리 블로그에 자세히 정리해놓았다.
  
### 8 Nodemon 설치
  - Node Mon 이란?
    - 소스를 변경할때 그걸 감지해서 자동으로 서버를 재 시작해주는 tool
  - Node Mon 다운로드
    - `npm install nodemon --save-dev`

### 9 비밀 설정 정보 관리
  - 소스 코드를 Git에 올리면 다른 사람들이 Secret한 정보들을 다 보게됨
  - 비번 정보들을 다 한 파일에다 몰아둔 후 .gitignore 파일에 넣어준다.
  - 개발환경이 로컬인지 아닌지 배포 모드에서 인자에 따라서도 다르게 해줘야한다.
  - 예를 들어 heroku 서비스를 통해 배포 할때

- 환경 변수 process.env.NODE_ENV
  - Local 환경에서 development
  - Deploy(배포) 한 후 production

### 10 Bcrypt 로 비밀번호 암호화 하기
  - 현재 데이터베이스에 저장된 비밀번호로 보면 너무 안전하지 않다.
  - Bcrypt를 이용하여 비밀 번호를 암호화해줘서 데이터베이스에 저장해줘야한다.
    - `npm install bcrypt --save`
  - Bcrypt 로 비밀번호 암호화 하는 순서
    - 먼저 Register Route로 가기
    - Salt 를 이용해서 비밀번호를 암호화 해야함
    - 유저 정보들 (Account, Password 등등)을 데이터베이스에 저장하기 전에 암호화 할 타이밍
    - bcrypt 사이트 보면서 진행

### 11 로그인 기능 with Bcrypt (1) & 12 토큰 생성 with jsonwebtoken
 - 1. 데이터베이스에서 요청한 E-mail 찾기
   - User.findOne()
 - 2. 데이터베이스에서 요청한 E-mail이 있다면 비밀번호가 같은지 확인
   - Bcrypt 를 이용하여 plain password 와 암호화된 (Hashed) 패스워드가 같은지 확인
 - 3. 비밀번호까지 같다면 Token 을 생성
   - 토큰 생성을 위해서 JSONWEBTOKEN 라이브러리를 다운로드
   - `npm install jsonwebtoken --save`

### 13 Auth 기능 만들기
 - auth route 만들기
   - WHY & WHAT ?
      1. 페이지 이동 때마다 로그인되있는지 안되어 있는지, 관리자 유저인지등을 체크
      2. 글을 쓸때나 지울때 같은데 권한이 있는지 같은 것도 체크
   - HOW ?
     - Server
       - 유저 데이터베이스에
     - Client
       - 서버 쿠키에
      1. Cookie에서 저장된 Token을 Server에서 가져와서 복호화를 한다.
      2. 복호화를 하면 User ID가 나오는데 그 User ID를 이용해서 데이터베이스 User Collection에서 유저를 찾은 후 쿠키에서 받아온 token이 유저도 갖고 있는지 확인
        => 쿠키가 일치 X : Authentication False !!
        => 쿠키가 일치 O : Authentication Treu !! 
  - cookie-parser 란?
    - 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어이다. express의 request객체에 cookies 속성이 부여된다.
    - `npm install cookie-parser --save`
### 14 로그아웃 기능
  - 로그아웃 Route 만들기
  - 로그아웃하려는 유저를 데이터베이스에서 찾아서 그 유저의 토큰을 지워 준다.

