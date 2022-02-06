const express = require('express') //express모듈을 가져왔다.
const app = express() //위 function을 이용하여 새로 app을 가져왔다.
const port = 5000 //포트넘버는 아무거나 사용하면 된다.
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

// body-parser 옵션 가져와주는 것
// application/x-www-form-urlencoded 이렇게된 데이터를 분석해서 가져와주는 것
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSucess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSucess: false, message: "비밀번호가 틀렸습니다." });

            //비밀번호 까지 맞다면 토큰을 생성하기
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSucess: true, userId: user._id })
            });

        });
    });
});

// role 1 어드민  role 2 특정 부서 어드민
// role 0 -> 일반유저 role 0이 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => { //중간에 auth auth.js에서 가져오는 것

    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 했다는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})