const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //sort글자수
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){

    var user = this;
    //비밀번호를 암호화 시킨다.
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }

})
//유저모델에 저장하기전 함수 동작

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword 1234567 암호화된 비밀번호 $2b$10$w5qXPbsCFeanoy3GuCjsaOIEH0jRi8WRM8JQlqWMM5HACnHObz.7i
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    //jsonwebtoken을 이용해서 token을 생성하기
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // user._id + '' = token
    //토큰을 decode한다.

    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 
        //토큰과 데이터 베이스에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token }, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })

}

const User = mongoose.model('User', userSchema)

module.exports = {User}