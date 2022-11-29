const express = require('express');
const mysql = require('mysql')
const app = express();
const PORT = 8050

app.use(express.static('/public1'));
app.use(express.json());
var a = 0;
var b = '';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'hojmuc6979V', 
    database: 'users1'
})

con.connect((err) =>{
    if(err){
        console.log(err)
    }else{
        console.log("Worked")
    }
})

// trying to create new data on server
app.post("/userpost", (req, res)=>{
    const {firstname} = req.body
    const{age} = req.body
    const{location} = req.body
    const{date_begin} = req.body
    const{date_end} = req.body

    // console.log(age)
    a= location;
    b = age;
    con.query('insert into users_table values(?,?,?,?,?)', [firstname, age, location, date_begin, date_end], (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })

    // res.status(200).send({status: 'post is working'})
    });



// this is what is  returned whith this url
app.get('/userget', (req, res)=>{

    con.query("call new_procedure4(?,?)",[a, b], function(err, result, fields){
    // con.query("select * from users_table", function(err, result, fields){

        if(err){
            console.log(err)
        }else{
            // res.sendFile(__dirname + "/client.html")
            res.send(result);
        }
    })
});



    app.listen(
        PORT, 
        console.log('its alive')
    )
    



    //{
    
    //     "firstname": "test3",
    //     "age":22,
    //     "location": "london", 
    //     "date_begin": "2022-09-04", 
    //     "date_end": "2022-09-04"
       
    //}