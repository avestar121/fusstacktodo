const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const client = require('./database.js')

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.json())

app.get('/api', (req,res) => {
    client.query(`SELECT * FROM todotable`, (err,result) => {
        if(!err){
            res.send(result.rows)
        }
    })
    client.end
})

app.post('/', (req,res) => {
    const {parsel} = req.body;
    if(!parsel){
        res.status(404).send()
    } else {
        client.query(`INSERT INTO todotable(description) VALUES ($1)`, [parsel]);
        res.status(200).send()
        client.end;
    }
})

app.delete('/', (req,res) => {
    const {deleteParsel} = req.body;
    client.query(`DELETE FROM todotable WHERE id=$1`, [deleteParsel]);
    res.status(200).send()
    client.end;
})

client.connect()

app.listen(4000, () => {
    console.log("server started on port 5000")
} )