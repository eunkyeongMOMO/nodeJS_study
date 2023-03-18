

## NodeJS, MongoDB 활용한 블로그만들어 보기

1. NodeJS 라이브러리 활용

활용한 라이브러리 | 기능 | 설치방법
--|--
express | REST 서버를 편리하게 구현하게 해주는 프레임워크 | `npm install express`
nodemon | VSC에서 파일 저장시 자동으로 서버 재접속 | `npm install nodemon`
body-parcel |  POST request data의 body로부터 파라미터를 편리하게 추출 (근데 따로 설치안해도됨)
mongodb | mongodb 접속을 쉽게 할수 있게함 | `npm install mongodb`
ejs | 서버데이터를 쉽게 넣을수 있는 랜더링엔진 | `npm install ejs`
axios | 프라미스방식으로 Ajax 문법 사용 | `npm install axios`

2. NoSQL방식으로 데이터 처리
3. 2를 통한 기능 구현 (게시판, 로그인, 채팅등)

## restAPI?
    HTTP요청시스템(GET, POST, PUT, DELETE)
1. Uniform Interface
    하나의 URL로는 하나의 데이터를 가져와야함 
        (하나를 가져오기 위한 두개의 URL을 만들지 말자)
    간결하고 예측가능하게 짜세요 (URL 하나를 알면 둘을 알게)
     URL 이름짓기 관습을 잘 따라주세요
     ***세부원칙
     명사로 작성해야합니다.
     파일확장자 쓰지 않아야합니다.
     띄워쓰기는 -를 이용
     자료하나당 하나의 URL
2. Client-server 역할 구분하기
3. Stateless 각각의 요청들은 의존성이 없어야합니다.
4. Cacheable 브라우저가 알아서해줌

## Axios


```js
import axios from 'axios';
//Ajax 새로고침 없이 서버 요청하는걸 도와주는 JS문법

//GET요청
axios.get('/URL')
  .then((response)=>{
    //불러온 값을 가져다 써야함으로 arrow function을 쓰는게 좋음
    //성공했을때 할 작업
    console.log(response);
  })
  .catch((error)=> {
    // 서버 통신하지 못했을때, 에러 출력
    console.log(error);
  })
  .finally(() => {
    //서버 통신이 끝나면 무조건 실행
  });

  //POST요청
axios.post('/URL', {email:'eunkyeong01234@gmail'})
    //첫번째 인자로 보낼 url, 두번째 인자로 보낼 값들을     object형식으로 전달
  .then((response)=>{
    //성공시 201
  console.log(response);
  })
  .catch((error)=> {
    // 서버 통신하지 못했을때, 에러 출력
    console.log(error);
  })
```
#Response Schema

```js
{
  data: {}, //서버에서 반환된 값
  status: 200, //HTTP상태코드
  statusText: 'OK', 
  headers: {}, //보안을 위해 숨겨서 보내는 내용
  config: {}, //요청에 대한 자세한 내용
  request: {} 
}
```
