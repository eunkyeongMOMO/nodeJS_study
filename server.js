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
// App.get('/',(request, response)=>{
//     response.sendFile(__dirname + '/index.html');
// })

App.get('/',(request, response)=>{
    response.render('index.ejs');
})


App.get('/write',(request, response)=>{
    response.render('write.ejs');
})

App.post('/add',(request,response)=>{
   response.send('전송완료!')
    //auto increment
    //게시물 번호 부여하기 위해 다른 컬렉션 생성 후 따로 관리
    db.collection('postNum').findOne({name:'posting'}, (error, result)=>{
        console.log(result.totalPosts);
        let totalPosts = result.totalPosts;
        db.collection('post').insertOne({_id:totalPosts+1, goal:request.body.goal, dueDate:request.body.dueDate,TodoList:request.body.todoList},(error, result)=>{
            console.log('투두리스트 저장완료');
            db.collection('postNum').updateOne({name:'posting'},{$inc:{totalPosts:1}},(error, result)=>{
                if(error){return console.log(error);} //총게시물갯수도 1늘려서 저장.
            })
        })
        //updateOne({수정할 데이터 이름},{수정값},()=>{})
        //데이터수정시 어떤식으로 수정할지 operator[연산자]를 써줘야함 $set, $inc
        //{$inc:{변경할값:얼마나 변경할건지}}}
    })
    response.render('add.ejs','전송완료')
     //데이터저장할때 꼭 id넣는게 좋음
})

App.get('/list',(request,response)=>{
    db.collection('post').find().toArray((error,result)=>{
        response.render('list.ejs', { posts : result });
})
});

App.delete('/delete',(request,response)=>{
    request.body._id = parseInt(request.body._id);
    //스트링으로 넘어오는 경우가 있기때문에 정수로 바꾸는 작업해줘야함.
    db.collection('post').deleteOne(request.body, (result, error)=>{
        console.log('삭제완료')
    })
    //삭제할 항목, 콜백함수
})
 