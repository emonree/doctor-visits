const express = require('express');
const app = express();
const mongoose = require('mongoose')

let PORT = 3000;
if(process.env.PORT) {
    PORT = process.env.PORT
}

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(PORT, () => {
    console.log('listening...');
});

mongoose.connect('mongodb+srv://emonga:aBB4E9oTaQ48nM&Y@cluster0.0eubsxh.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})