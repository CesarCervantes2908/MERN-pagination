const express = require('express');
require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT;
const postRouter = require('./routes/postRoutes');


connectDB();


app.use(express.json());
app.use('/api/v1/posts', postRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')));

    app.get('*', (req, res, next)=>{
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}else{
    app.get('/', (req, res)=>{
        res.send("API Running");
    });
};

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port: ${PORT}`);
});