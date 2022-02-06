const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // space 를 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 5
    },
    role: {
        type: Number,
        default: 0
    }, // 어떤 유저가 관리자가 될 수 있고 일반 유저가 될 수 있어서 지정해준다.
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

userSchema.pre('save', function(next) { //저장하기 전. index.js 42번째
    var user = this;

    //비밀번호를 암호화 시킨다.
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash //원래 비밀번호를 암호화된 비밀번호로 변경
                next()
            });
        });
    } // user의 password가 수정되었을 때, pw만 암호화해주기 위한 코드
    else {
        next()
    } // 비밀번호 외에 다른 것을 수정할 시 넘어가게 해주는 코드
})

userSchema.methods.comparePassword = function(plainpassword, cb) {
    //plainpassword 1234567 암호화된 비밀번호 $2b$10$enGQh7DBKPWms89c3DcobesH5pl2yUXIwVrUwiG//Xxw6dNuAf9mq
    bcrypt.compare(plainpassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user._id', user._id)

    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
        // user._id + 'secretToken' = token
        // ->
        // 'secretToken' -> user._id

    user.token = this.token
    user.save(function(err, user) {
        if (err) return cb(err); //에러가 났으면 에러를 전달
        cb(null, user) //문제가 없으면 유저를 전달 그럼 index.js로 넘어가서~
    });

}

//토큰을 가져와서 복호화하는 과정
userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //user._id + '' = token
    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }