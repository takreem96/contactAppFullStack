const express = require('express');
const path = require('path');
var cors = require('cors');
const bodyParser = require("body-parser");


var  mongojs = require('mongojs');
var db = mongojs('contactapp', ['contacts']); 
var ObjectId = mongojs.ObjectId; 
// const bcrypt = require('bcrypt');


// var jwt = require('jsonwebtoken');
var app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Headers", "*" );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-with,Content-Type,Accept,Authorization");

 next();
});

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
   
app.get('/api/customer', function(req , res) {
 
    db.contacts.find(function (err, docs) {
        // docs is an array of all the documents in mycollection
        // console.log(docs)
        res.json(docs);
    
     })
    

});

app.get('/contact/edit/:id', function(req , res) {
    console.log(req.params.id +"  this is id get") ;

    if(req.params.id){
 
    db.contacts.find({_id: ObjectId(req.params.id)}, function (err, data1) {
        // docs is an array of all the documents in mycollection
     if(err){
         console.log(err);
     }
        res.json(data1);
        console.log(data1 + "this is get by data");
    
   
     });
    } 
     console.log(" get by id is not working");
    

});

app.put('/api/customer/update/:id', function(req , res) {

    var name = req.body.name;
           
    var email =  req.body.email;
     var phone = req.body.phone;
var newcontact = { 
                   name,
  
                     email,
                         phone
                         }


 if(req.params.id){
     console.log(req.params.id)
    db.contacts.update({_id: ObjectId(req.params.id)},newcontact, function (err, docs) {
        // docs is an array of all the documents in mycollection
        console.log(docs)
        res.json(docs);
    
     })
    }

});
app.post('/contact/add', function(req, res){
    // req.checkBody('name','first name is required').notEmpty();
    // req.checkBody('last_name','last name is required').notEmpty();
    // req.checkBody('email','email is required').notEmpty();
            var name = req.body.name;
           
              var email =  req.body.email;
               var phone = req.body.phone;
        var newcontact = { 
            name,
            
            email,
            phone
        }

        //  console.log(newcontact);
        db.contacts.insert(newcontact,function(err,result){
            console.log('success');
            res.redirect('/')
        });
       
    
    });

   


    app.delete('/contacts/delete/:id', function(req , res){
 

        db.contacts.remove({_id: ObjectId(req.params.id)}, function(err, result){
            if(err){
    
                console.log(err);
            }

             console.log("deleted....")
    
    
        
    
    
    
        });


    });


//THIS START FOR AUTHORIZATION OF 
// app.post('/api/register', function(req, res){
//     // req.checkBody('name','first name is required').notEmpty();
//     // req.checkBody('last_name','last name is required').notEmpty();
//     // req.checkBody('email','email is required').notEmpty();
//                var name = req.body.name;
//                var email =  req.body.email;
//                var password = req.body.password;
            
       

//         var salt = bcrypt.genSaltSync();
//        let  hash = bcrypt.hashSync(password, salt);
//          var newregister = { 
//             name,
            
//             email,
//             hash
//         }
//         console.log(newregister);
//          console.log(hash);
//         db.userlogin.insert(newregister,function(err,result){
//             console.log('success');
//             res.json({successs: "hello data base is update"})
//         });
      
    
//     });
//     app.post('/api/register1', function(req, res){
//         // req.checkBody('name','first name is required').notEmpty();
//         // req.checkBody('last_name','last name is required').notEmpty();
//         // req.checkBody('email','email is required').notEmpty();
                 
//                    var email =  req.body.email;
//                    var password = req.body.password;
                
//               var newregister = { 
             
                
//                 email,
//                 password
//             }
//             //  const value =  bcrypt.compareSync(password, hash);
            
//             db.userlogin.find(emailemail ,function(err,result){
//                 if(result){
//                     console.log(result);
//                     const value =  bcrypt.compareSync(password, hash);
//                 }
//                 res.redirect('/')
//             });
//            res.json({
//                newregister,
//             //    value
//            })
        
//         });



//     app.get('/api', (req, res) => {
//         res.json({
//           message: 'Welcome to the API'
//         });
//       });
//       //THIS FOR VARIFYING THE TOKEN 
//       app.post('/api/posts', verifyToken, (req, res) => {  
//         jwt.verify(req.token, 'secretkey', (err, authData) => {
//           if(err) {
//             res.sendStatus(403);
//           } else {
//             res.json({
//               message: 'Post created...',
//               authData
//             });
//           }
//         });
//       });
      

//       //THIS IS FOR LOGIN TOKEN 
//       app.post('/api/login', (req, res) => {
//         // Mock user
//         const user = {
//           id: 1, 
//           username: 'brad',
//           email: 'brad@gmail.com'
//         }
      
//         jwt.sign({user}, 'secretkey',  (err, token) => {
//             // { expiresIn: '60s' } THIS CAN BE SET FOR TIME OF DESTORY TOKEN.
//           res.json({
//             token
//           });
//         });
//       });
      
//       // FORMAT OF TOKEN
//       // Authorization: Bearer <access_token>
      
//       // Verify Token
//       function verifyToken(req, res, next) {
//         // Get auth header value
//         const bearerHeader = req.headers['authorization'];
//         // Check if bearer is undefined
//         if(typeof bearerHeader !== 'undefined') {
//           // Split at the space
//           const bearer = bearerHeader.split(' ');
//           // Get token from array
//           const bearerToken = bearer[1];
//           // Set the token
//           req.token = bearerToken;
//           // Next middleware
//           next();
//         } else {
//           // Forbidden
//           res.sendStatus(403);
//         }
//     }
app.listen(5000, () =>{
    console.log("server is running port 3000")
});
