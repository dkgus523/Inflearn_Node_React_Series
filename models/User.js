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

const User = mongoose.model('User', userSchema)

module.exports = { User }