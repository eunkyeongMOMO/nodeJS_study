//아래 문법은 기본값, 외우기
const { response } = require('express');
const express =require('express');
const App = express();

App.listen(8080, function(){
    console.log('server open')
})
//포트번호, 띄운후에 실행할코드

App.get('/pet',(request,response)=>{
    response.send('펫용품을 볼 수 있는 페이지입니다.');
})
App.get('/beauty',(request,response)=>{
    response.send('뷰티용품을 볼 수 있는 페이지!입니당!');
})
//html 파일 보내는방법 
App.get('/',(request, response)=>{
    response.sendfile(__dirname + '/index.html');
})
