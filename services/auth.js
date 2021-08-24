const firebase = require("../db");
const firestore = firebase.firestore();

const signupEmailPassowrd = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const displayname = req.body.username;

    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firestore.collection("users").doc(result?.user.uid).set({
            displayname,
            email,
            userid: result.user.uid
        });
        res.send({ message: "Sign up with Email-Password successful" });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const loginEmailPassword = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    try {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // console.log(user);
                res.send({ message: "Login Successful" });
            }).catch((error) => {
                res.status(400).send(error.message);
            });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const logout = async (req, res) => {
    firebase.auth().signOut().then(() => {
        res.send({ message: "Logout Successful" });
    }).catch((error) => {
        res.status(400).send(error.message);
    });
}

module.exports = {
    signupEmailPassowrd,
    loginEmailPassword,
    logout
};