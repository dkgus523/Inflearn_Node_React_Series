const express = require('express') //express모듈을 가져왔다.
const app = express() //위 function을 이용하여 새로 app을 가져왔다.
const port = 5000 //포트넘버는 아무거나 사용하면 된다.
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const config = require('./config/key');
// const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

// body-parser 옵션 가져와주는 것
// application/x-www-form-urlencoded 이렇게된 데이터를 분석해서 가져와주는 것
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
// app.use(cookieParser());

const mongoose = require('mongoose')
    // require 안에는 몽고디비만들면서 가져온 application code 이다.
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
            //나중에 오류나는 것을 막기 위해 써놓은 것이다.
    }).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => {

    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})