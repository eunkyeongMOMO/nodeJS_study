//아래 문법은 기본값, 외우기
const { response } = require('express');
const express =require('express');
const App = express();

const bodyParser =require('body-parser');
App.use(bodyParser.urlencoded({extended:true}));

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://eunkyeong01234:cupido112^^@mmoommooo.a9d4mbj.mongodb.net/?retryWrites=true&w=majority',(error,client)=>{
App.listen(8080, function(){
    console.log('연결완료?')
})
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

App.get('/write',(request, response)=>{
    response.sendfile(__dirname+'/write.html')
})

App.post('/add',(request,response)=>{
    response.send('전송완료');
    console.log(request.body.goal);
})

