const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config();

const db = require('./database.js');
const Dbservice = require('./database.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname, '/Client')));

//create
app.get('/', (req, res)=>{
    res.send("hello");
})
app.post('/insert', (req, res) => {
    const { sport } = req.body;
    const { m } = req.body;
    const { s } = req.body;
    const { team1score } = req.body;
    const { team2score } = req.body;
    const { team1name } = req.body;
    const { team2name } = req.body;
    const { tournamentname } = req.body;
    const {id} = req.body;
    const {gamestatus} = req.body;

    const db = Dbservice.getDBServiceInstance();
    result = db.newGame(sport, team1name, team2name, team1score, team2score, m, s, tournamentname, id, gamestatus);
    
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
});
// read

app.get('/getId', (req, res)=>{
    const db = Dbservice.getDBServiceInstance();

    result = db.getAllId();
    
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
})
app.get('/getAll', (req, res)=>{

    const db = Dbservice.getDBServiceInstance();

    result = db.getAllGames();
    
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));

    return result
})

app.get('/getAlllive', (req, res)=>{

    const db = Dbservice.getDBServiceInstance();

    result = db.getAllliveGames();
    
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
})
// update

app.post('/update', (req, res) => {
    const { m } = req.body;
    const { s } = req.body;
    const { team1score } = req.body;
    const { team2score } = req.body;
    const { id } = req.body;
    const { gamestatus} = req.body;

    const db = Dbservice.getDBServiceInstance();
    result = db.updateGame( id, team1score, team2score, m, s, gamestatus);
    
    result
    .then(data => res.json({data:data}))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, ()=> {
    console.log("THE APP IS RUNNING")
})
