const express = require('express')
const app = express()
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
const path = require('path')
const { v4: uuid } = require('uuid');
const port = 3000

app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let comments = [
    {   
        id:uuid(),
        username:"Todd",
        comment:"lol that is so funny"
    },
    {
        id:uuid(),
        username:"Skyler",
        comment:"I like to go birdwatching with my dog"
    },
    {
        id:uuid(),
        username:"Sk8erboi",
        comment:"Plz delete your account Todd!"
    },
    {
        id:uuid(),
        username:"onlysayswoof",
        comment:"woof woof woof"
    }
]

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new_comment')
})

app.get('/comments/:id',(req,res)=>{
    const {id} = req.params
    let comment = comments.find(c => c.id === id)
    res.render('comments/view_id',{comment})
})

app.post('/comments',(req,res)=>{
    const { username, comment} = req.body
    comments.push({
        id:uuid(),
        username:username,
        comment: comment
    })
    res.redirect('/comments')
})

app.get('/comments/:id/edit',(req,res)=>{
    const { id } = req.params
    let comment = comments.find(c => c.id === id)
    res.render('comments/edit',{comment})
})

app.patch('/comments/:id',(req,res)=>{
    const { id } = req.params
    const{ comment: comment_des } = req.body
    let comment = comments.find(c => c.id===id)
    comment.comment = comment_des
    res.redirect('/comments')
    // res.send('Updating something')
})

app.delete('/comments/:id',(req,res)=>{
    const{id} = req.params
    comments.splice(comments.findIndex(c => c.id === id) , 1)
    res.redirect('/comments')

})



app.get('/tacos',(req,res)=>{
    res.send('GET req')
})

app.post('/tacos',(req,res)=>{
    const { meat , qty } = req.body
    res.send(`meat is ${meat} and quantity is ${qty}`)
})

app.listen(port,()=>{
    console.log(`Listening on http://127.0.0.1:${port}`)
})