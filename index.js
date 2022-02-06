const express = require('express') //express모듈을 가져왔다.
const app = express() //위 function을 이용하여 새로 app을 가져왔다.
const port = 5000 //포트넘버는 아무거나 사용하면 된다.

const mongoose = require('mongoose')
    // require 안에는 몽고디비만들면서 가져온 application code 이다.
mongoose.connect('mongodb+srv://ahyeon:dkgus15092328%23@boilerplate.ovurq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})