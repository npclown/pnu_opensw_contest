// ENV
require('dotenv').config();

// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 4500;
const mongoose = require('mongoose');
const fs = require('fs');
const Workbook = require('./src/models/workbook');


// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", require('./src/routes/index.js'));
app.use("/run", require('./src/routes/docker.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true}, (db) =>{
    console.log('connected to DB!');
    
    var data = JSON.parse(fs.readFileSync('./db.json','utf-8'));

    Workbook.find({}).then((item)=>{
        if (item.length === 0){
            data.workbook.map(async(item, index) => {
                var tmp = new Workbook();
                tmp.id = item.id;
                tmp.name = item.name;
                tmp.cont = item.cont;
                tmp.inits = item.inits;
                tmp.code = item.code;
                tmp.score = item.score;
                tmp.sample = item.sample;
                await tmp.save();
            })
        }
    })
})
app.listen(port, () => console.log(`Server listening on port ${port}`));