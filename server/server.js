//=========Settings===========
//express
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// use mlab as my mongodb database for access easily
var uri = "mongodb://qiandongyq:123456q@ds129010.mlab.com:29010/notepad";

// connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(uri)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// body json
// use bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ======Setup listen port=======
var port = 3001;
app.listen(port, ()=>{
    console.log("Running Server on Port: " + port);
});

// ========Setup Databse model, Notes collections=======
var Note = require('./models/notes');

// get all notes
app.get('/api/notes',(req, res)=>{      
    Note.find({}, (err, notes)=>{
        if(err){
            return res.status(500).json({error:{global: "Notes load failed"}});
        }else{
            return res.status(200).json({notes});
        }
    });
});

// get one note by id
app.get('/api/notes/:_id',(req, res)=>{     
    Note.findOne({_id: req.params._id}, (err, note)=>{
        if(err){
            return res.status(404).json({error: {global: "Notes Not Exist"}});
        }else{
            return res.status(200).json({note});
        }
    });
});

// get by user search
app.get('/api/notes/user',(req, res)=>{
    console.log("here");
    console.log(req.body.start);
    Note.find({})
    .limit(req.body.limit)
    .skip(req.body.start)
    .exec((err, note)=>{
        if(err){
            return res.status(404).json({error: {global: "Notes Not Exist"}});
        }else{
            return res.status(200).json({note});
        }
    });
});

// post a note
app.post('/api/notes/add', (req,res)=>{
    var note = new Note();
    let error ={};
    if (req.body.title === '') error.title = "Can't be empty";
    if (req.body.content === '') error.content = "Can't be empty";
    if (req.body.category === '') error.content = "Can't be empty";
    const isValid = Object.keys(error).length === 0
    if(!isValid){
        return res.status(500).json({error});
    }else{
        note.title = req.body.title;
        note.content = req.body.content;
        note.category = req.body.category;
        note.save(function(err){
            if(err){
                    res.status(500).json({error: {global: 'Note already Exist'}});
            }else{
                    res.status(200).json({note});
            }    
        });
    }
});

// update or edit note
app.put('/api/notes/:_id', (req, res)=>{
    let error ={};
    if (req.body.title === '') error.title = "Can't be empty";
    if (req.body.content === '') error.content = "Can't be empty";
    if (req.body.category === '') error.category = "Can't be empty";
    const isValid = Object.keys(error).length === 0
    if(!isValid){
        res.status(400).json({error});
    }else{
        const {title, content, category } = req.body;
        Note.findOneAndUpdate(
        {_id: req.params._id},
        {$set: {title, content, category}},
        {new: true},
        (err, note)=>{
            if(err){
                res.status(500).json({error: {global:err}});
                return;
            }else{
                // return updated note
                res.status(200).json({note});
            }
        });
    }
});

app.delete('/api/notes/:_id', (req, res)=>{
    Note.findOneAndRemove({_id: req.params._id}, (err, data)=>{
        if(err){
            res.status(500).json({error: {global: err}});
            return;
        }else{
            res.status(200).json({});
        }
    })
});


// middleware to handle 404 error if something goes wrong
app.use((req, res)=>{
    res.status(404).json({
        error:{
            global : "Please try again later"
        }
    });
});