### 1 ~ 7 
  - 티스토리 블로그에 자세히 정리해놓았다.
  
### 8 Nodemon 설치
  - Node Mon 이란?
    - 소스를 변경할때 그걸 감지해서 자동으로 서버를 재 시작해주는 tool
  - Node Mon 다운로드
    - npm install nodemon --save-dev

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
    - npm install bcrypt --save
  - Bcrypt 로 비밀번호 암호화 하는 순서
    - 먼저 Register Route로 가기
    - Salt 를 이용해서 비밀번호를 암호화 해야함
    - 유저 정보들 (Account, Password 등등)을 데이터베이스에 저장하기 전에 암호화 할 타이밍
    - bcrypt 사이트 보면서 진행


### 11 로그인 기능 with Bcrypt (1)

### 12 토큰 생성 with jsonwebtoken

### 13 Auth 기능 만들기

### 14 로그아웃 기능

