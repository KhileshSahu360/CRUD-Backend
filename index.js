const express = require('express');
const Users = require('./UserSchema');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.get('/userDetails',async(req,res)=>{
  const result = await Users.find();
  res.send(result)
})
app.get('/GetDataWithId/:id',async(req,res)=>{
  const result = await Users.find({_id : req.params.id});
  if(result) res.send(result)
  else res.send({result:'No data Found!'})
})

app.post('/AddUserData',async(req,res)=>{
  const findData = await Users.find({email:req.body.email});
  console.log(findData.length)
  if(findData.length===0){
    const userData = new Users(req.body);
    const result = await userData.save();
    res.send({exist:false});  
  }else{
    res.send({exist:true});
  }
})

app.put('/UpdateUserData/:id',async(req,res)=>{
      try{
          const result = await Users.updateOne({_id:req.params.id},{$set:req.body});
          if(result){
            res.send(result)
          }else{
            res.send({result:"something went wrong!"});
          }
    }
    catch(error){
        res.send({result:error});
    }

})
app.delete('/DeleteUserData/:id',async(req,res)=>{
  const result = await Users.deleteOne({_id : req.params.id});
  res.send(result);
})
app.get('/SearchData/:key',async(req,res)=>{
  const result = await Users.find({
    "$or" : [
      {"name" : {$regex:req.params.key} },
      {"email" : {$regex:req.params.key} }
    ]
  })
  res.send(result)
})

app.listen(3001,(req,res)=>{
  console.log('server running in 3001 port');
});