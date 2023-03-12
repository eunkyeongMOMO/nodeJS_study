//아래 문법은 기본값, 외우기
// const { response } = require('express');
const express =require('express');
const App = express();

const bodyParser= require('body-parser')
App.use(bodyParser.urlencoded({extended:true}));
App.set('view engine','ejs');

let db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://eunkyeong01234:cupido112^^@mmoommooo.a9d4mbj.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true } , 
(error,client)=>{
if(error){return console.log(error);}
db = client.db('ToDoApp');
// db.collection('post').insertOne({_id:1, name:'eunkyeong', age:33},(error,result)=>{
//     console.log('저장완료');
// });
App.listen(8080, function(){
    console.log('연결완료?');
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
    response.sendFile(__dirname + '/index.html');
})

App.get('/write',(request, response)=>{
    response.sendFile(__dirname+'/write.html')
})

App.post('/add',(request,response)=>{
    response.send('전송완료')
    db.collection('post').insertOne({goal:request.body.goal, dueDate:request.body.dueDate,TodoList:request.body.todoList},(error, result)=>{
        console.log('투두리스트 저장완료');
    })
     //데이터저장할때 꼭 id넣는게 좋음
})

App.get('/list',(request,response)=>{
    db.collection('post').find().toArray((error,result)=>{
        console.log(result); 
        console.log(result.length); 
        response.render('list.ejs', { posts : result });
})
});


 