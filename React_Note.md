> ### 15 리액트란 ?
 - 리액트는 2013년도 페이스북에서 발표된 라이브러리 
 - component로 이루어져 있으며, component는 모듈과 비슷하게 재사용성이 뛰어남.

 - 리액트를 쓰는 이유?
   - 리액트는 single page application로, 사용자 경험이 좋아짐 (웹에서 앱과 같은 사용자 경험)
   - 재사용 컴포넌트 - 중복되는 요소들을 하나로 묶어줘 유지보수가 좋다.
   - 재사용 컴퍼넌트 - 데이터와 화면의 일치
   - 
 - Real Dom
   1. 만약 10개의 리스트가 있다.
   2. 그중에 한가지의 리스트만 Updata 됨
   3. 전체 리스트를 다시 Reload 해야됨 !
   4. Super Expensive한 작업!

 - Virtual DOM
   1. 만약 10개의 리스트가 있다.
   2. 그중에 한가지의 리스트만 Updata 됨
   3. 그 바뀐 한 가지 아이템만 DOM 에서 바꿔준다!
   4. HOW ?!?!? => 
     1. JSX(우선 HTML으로 알아두기) 을 렌더링 한다. 그러면 Virtual DOM이 Update가 됨
     2. Virtual DOM이 이전 virtual DOM에서 찍어둔 Snapshot 과 비교를 해서 바뀐 부분을 찾는다. 이 과정을 'diffing'이라고 부름
     3. 그 바뀐 부분만 Real DOM 에서 바꿔준다!

> ### 16 Creat-React-App
 - Babel ?
   - 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해서 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수있게 변환시켜줌 (to ES5)
 - Webpack ?
   - 복잡한 파일들을 번들해줌
 - npx create-react app
   - 원래 create-react-app을 할 때 npm install -g create-react-app 이렇게 했었다. global 디렉토리에 다운받음
   - 이제는 npx 를 이용하여 다운 받지 않고 사용가능하다!

> ### 17 npm npx
  1. npm은 registry라는 저장소 역할을 한다. 라이브러리를 담는 레지스트리 역할을 함
  2. 어플리케이션을 킬 때 npm run start나 npm run build등을 사용해서 실행, 배포함.
  - npm install로 다운받으면 local로 다운받을 때도 있고, global로 다운받아줄 수 도 있음.
  - 대신 -g 라고 따로 플래그를 주지 않으면 local로 다운받아짐.
  - -g 플래그를 주면 글로벌로 다운받아지므로, 프로젝트 뿐만 아니라 컴퓨터 안에 저장이 됨
  - 원래는 create-react-app을 할때 글로벌로 다운받았었음. 
  - 하지만 이제는 글로벌로 다운받을 필요 없이  npx를 이용해서 레지스트리에 있는 react 앱을 사용할 수 있음

   npx를 사용하므로써 디스크 공간을 낭비하지 않을 수 있다(글로벌이 아닌 로컬)
    항상 최신 버전을 사용할 수 있다!!

> ### 18 구조 설명
 - 리액트 앱을 만들었으니, 리액트 파일, 폴더 구성들을 알아보자.
 - 리액트 앱을 실행하려면 client 디렉토리에서 `npm run start` (package.json에서 start에 react-scripts start 라고, npm run start를 입력하면 리액트를 실행하도록 지정되어있음 
  - 실행하면 App.js 가 렌더링되어서 나오는 창이 실행되는 것을 볼 수 있다.

> ### 19 CRA to Our Boilerplate
![19_boiler plate 구조](./client/19_boiler%20plate%20구조.png)
 - _actions, _reducers : 리덕스를 위한 폴더
 -  components/views : 이 안에 페이지 하나하나를 넣을 것.
 - Landingpage는 처음 페이지를 의미함.
 - LoginPage에는 로그인 페이지
 - NavBar네비게이션 바와 관련된 곳
 - App.js는 라우팅 관련. 가고싶은 페이지로 갈 수 있도록 해주는 역할
 - Config.js 환경변수를 정하는 곳
 - auth(hoc)
 - utils : 여러군데에서 쓰일 수 있는 것들을 이곳에 넣어둬서 어디든 쓸수있게 해줌

  🎁 TIP 🎁
   extention에서 es7을 치면 나옴.
   이걸 다운받으면 rfce를 치면 functional component로, rcc를 치면 class component로 자동생성됨

> ### 20 React Router Dom
 - 리액트에서는 페이지 이동을할 때 react router dom이라는 것을 사용함.
 - Dependency 다운로드 
   - `npm install react-router-dom --save`
  

> ### 21 데이터 Flow & Axios
 - 전체적인 어플리케이션의 데이터가 어떻게 흘러가는지 알아보자.
![21_데이터 Flow_Axios](./client/21_데이터%20Flow_Axios.png)

 - 지금까지는 클라이언트가 없었으므로 postman을 사용했었음.
 - 이제는 있으니까 reactJS에서 요청을 보낼 것. 그때 사용할 것이 바로 Axios! (jQuery를 사용할때 Ajax라고 보면 된다)
 - `npm install axios --save` 로 다운로드 받기!

​
> ### 22 CORS 이슈, Proxy 설정
 - 지난시간에 오류는 서버가 5000포트, 클라이언트는 3000포트를 사용하기 때문에 발생함.
 - 다른 웹사이트에서 우리 서버에 다른 것을 보내버리면 보안적인 이슈가 생기므로 CORS정책이 있는 것
 - 우리는 Proxy라는 것을 사용해서 해결 할 것!!!
 - 다음사이트를 활용하자.
 - https://create-react-app.dev/docs/proxying-api-requests-in-development
 1. `npm install http-proxy-middleware --save`
 2. src/setupProxy.js 생성후 코드 작성

​
> ### 23 Proxy Server ?
 - 프록시 서버에서 여러가지를 할 수 있는데, 유저의 아이피가 111.111.111.111이라고 해보자. 그런데 받을때 프록시 서버에서 임의로 변경할 수 있다.
그래서 받는 사람은 실제 아이피를 모를 수 있게 하는 역할을 할 수도 있다.
 - 또한 아이피 뿐만 아니라 데이터도 중간에서 바꿔줄 수 있고, 방화벽 기능을할 수도 있으며 필터기능(어떤 사이트에 들어갔을때 static한 이미지 등을 프록시 서버에 저장시켜 둘 수 있음. 꼭 인터넷까지 가지 않더라도 프록시 서버에 담겨있는것을 더 빠르게 볼 수 있다)
 - proxy server 사용 이유 !
  1. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
  2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
  3. 더 나은 보안 제공
  4. 이용 제한된 사이트 접근 가능

> ### 24 Concurrently
 - Concurrently를 이용해서 프론트,백 서버를 한번에 켤 수 있다.
 - 루트 디렉토리에서 `npm install concurrently --save` 
 - package.json에서 하고싶은 명령어를 여러개 쓸 수 있다! 
 - 지금까지는 백서버를 키기위해 npm run backend, 다른 터미널을 키고 cd client를한뒤 npm run start를 해야했었다.
 - 루트디렉토리의 package.json의 스크립트를 concurrently를 사용해서 작성해보자.
 - 이제, 루트디렉토리에서 npm run dev 
   - 서버와 클라이언트 둘다 동시에 실행되는 것을 볼 수 있다!!!

> ### 25 Antd CSS FrameWork
 - 너무 많은 시간을 CSS에 투자하지 않기 위해 기능에 초점을 맞춰 강의를 진행하기 위해 CSS프레임워크를 사용할 것. 
 - 실무에서도 순수하게 CSS만 쓰기보다는 다양한 것을 사용하는 추세.
 - reactJS를 위한 CSS 프레임워크들은 다음과 같이 다양하다.
   - Material UI
   - React Bootstrap
   - Semantic UI
   - Ant Design
   - Materialize

 - 우리는 이 중에서 Ant Design을 쓸 것. (https://ant.design/)
 - (단점) : 굉장히 많은 기능이 들어있기 때문에 사이즈가 큼.
 - (장점) : 
   - 스타일이 굉장히 깔끔.
   - 엔터프라이즈에서도 어울리는 디자인 생성가능.
   - 쓰기 굉장히 편함.
 - 클라이언트 디렉토리에서 `npm install antd --save`
 - 클라이언트 index.js에
   - import 'antd/dist/antd.css';
  
> ### 26 Redux 기초
 - Redux
   - 상태관리 라이브러리
   - state를 관리해주는 것

 - Props
   - properties의 줄임말
   - 부모 컴포넌트에서 자식 컴포넌트 간에 주고 받을 때 props 사용
   - 위에서 아래로 (부모 => 자식)으로만 전달 가능
   - props는 immutable(불변성)임(부모가 1을 내려줬으면 1만 받을 수 있고 2로 바꿀 수 없음)
 
 - State
   - 컴포넌트 안에서 데이터를 교환하거나 전달 할 때 사용
   - state는 mutable이기 때문에 안에서도 값을 변경 시킬 수 있음
   - state가 변하면 re-render 됨

 - Redux가 없을때,
  comments라는 컴포넌트가 최상위에서 관리되고 있지만 다른 내부 컴포넌트에서 사용되고 있는 상황에서 작업을 할 경우, 최상위까지 타고 타고 올라오고 그 정보를 또 하나하나 타고 내려줘야 함

 - 상위 컴포넌트에 두는 것이 아니라 Redux Store에 저장해두면 타고 올라가지 않고 직접 Redux Store에 접근해서 사용 가능

 - Redux 데이터 Flow(strict unidirectional data flow)
 - React component => Dispatch(action) => ACTION => REDUCER => STORE => Subscribe => React Component
   - Action : 무엇이 일어났는지 설명
   - Reducer : 이전 state와 action object를 받은 후에 다음 state를 리턴
   - Store : 전체적인 어플리케이션의 state를 감싸는 역할

> ### 27 Redux Up !!
 - Redux 설치
   - `npm i redux react-redux redux-promise redux-thunk`
 - redux-thunk는 dispatch한테 function을 받는 방법을 알려주고 redux-promise는 promise가 들어왔을 때 처리해주는 미들웨어

> ### 28 React Hooks
 - React vs React Hooks
   - React component 
     1. class Component
        - 더 많은 기능 사용 가능
        - 코드가 길고 복잡함
        - 성능이 좀 더 느림
     2. Functional Component
        - 제공하는 기능이 한정 됨
        - 코드가 간결하고 성능이 좋음

> ### 29 로그인 페이지 (1)

> ### 30 로그인 페이지 (2)

> ### 31 회원 가입 페이지

> ### 32 로그아웃

> ### 33 인증 체크 (1)

> ### 34 인증 체크 (2) 



