const express = require("express");
const router = express.Router();
const { User,validate} = require("../model/authorize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require('lodash');
var crypto=require('crypto');

//API to register user
  router.post("/register", async (req, res) => {
    try { 
      let user = await User.findOne({
        email: new RegExp("^" + req.body.email, "i"),            //email case insensitive
        
      });
      if (user) return res.status(400).send("user already exist");
      user = new User(
        _.pick(req.body, [
          
          "email",
          "password"
        ])
      );
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      let savedUser = await user.save();
      res
        .header("content-type", "text/plain")
        .send(savedUser.email + " " + "is now a regsitered user");
    } catch (error) {
      console.log("error is", error);
      res.sendStatus(400).send("bad request");
    }
  });
 

 

  //API to Login User
  router.post("/login", async (req, res) => {
      try {
        let user = await User.findOne({
          email: new RegExp("^" + req.body.email, "i"), //taking input email as ignore case
        });
        if (!user) return res.status(400).send("Email does not exists");
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) return res.status(400).send("password is incorrect");
        var privateKEY = ( "/login1234"+"utf8");
        var payload = {
          email: user.email,
        };
        var token=jwt.sign(payload,privateKEY);
        res.header("content-type", "application/json").json({
          id: user._id,
          email: user.email,
          token: token
        });
      } catch (err) {
        console.log("error is", err);
        res.sendStatus(400).send("bad request");
      }
    });
    
  
    //API to Add ExpensesOf Every User

    router.post("/addExpense", async (req, res) => {
     
     try { 
      let user = await User.findOne({
        email: new RegExp("^" + req.body.email, "i"),            //email case insensitive
        
      });
      if (!user) return res.status(400).send("User does not exist,Please register!");
      user = new User(
        _.pick(req.body, [ 
          "email",
          "password",
          "productName",
          "amount"
        ])
      );
      var newvalues = { $set: {productName: req.body.productName, ammount: req.body.ammount } };
      let savedUser = await user.updateOne({_id: user._id},newvalues,function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
       });
      res
        .header("content-type", "text/plain")
        .send("Details Saved Successfully");
    }catch (error) {
      console.log("error is", error);
      res.sendStatus(400).send("bad request");
    }
  });




    module.exports = router;