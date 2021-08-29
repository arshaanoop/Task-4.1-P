const express = require("express")
const bodyParser = require("body-parser")

const mongoose = require("mongoose")
const v = require("validator")
const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://Localhost:27017/iservicedb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
 var db= mongoose.connection;
 db.on('error',()=>console.log("Error in connecting to dattabase"));
 db.once('open',()=>console.log("connected to the database"))
app.post('/sign_up', (req,res)=>{

  if(v.isEmpty(req.body.fname)
    )
    {
     return res.send("First name can't be empty") 
    
    }
    if(v.isEmpty(req.body.lname)
    )
    {
      return res.send("Last name can't be empty") 
    }
    if(v.isEmpty(req.body.email)
    )
    {
      return res.send("email can't be empty") 
    }
    if(v.isEmpty(req.body.password)
    )
    {
      return res.send("password can't be empty") 
    }
    if(v.isEmpty(req.body.cpassword)
    )
    {
      return res.send("cpassword can't be empty") 
    }
    if(v.isEmpty(req.body.address1)
    )
    {
      return res.send("address can't be empty") 
    }
    if(v.isEmpty(req.body.city)
    )
    {
      return res.send("city can't be empty") 
    }
    if(v.isEmpty(req.body.state)
    )
    {
      return res.send("state can't be empty") 
    }

    if(!v.isEmail(req.body.email)
    )
    {
      return res.send("please provide the valid email") 
    }
   
    if(!v.equals(req.body.password,req.body.cpassword)
    )
    {
      return res.send("please check the password") 
    }
    if(!v.isLength(req.body.password,{min:8,max:undefined})
    )
    {
      return res.send("password must have 8 character") 
    }
    
   
    var data = req.body


    db.collection('customers').insertOne(data,(err,collection)=>{
        if(err){
         
           return res.send("could not create")

        }
        console.log("Record Inserted Successfully");
        return res.redirect('signup_success.html')
    });

})

app.get("/",(req,res)=>{
    res.set({"Allow-acess":'*'
})

return res.redirect('index.html');
}).listen(5000); 

    console.log("Server is running on port 5000")

    
  