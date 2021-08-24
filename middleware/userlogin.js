const firebase = require("../db");

module.exports = async (req, res, next) => {  

    // const user = await firebase.auth().currentUser;
    // console.log("user", user);
    // if (user) {
    //   next();
    // } else {
    //   res.status(400).send({message: "Please login"});
    // }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next()
      } else {
        res.status(400).send({message: "Please login"});
      }
    });
}