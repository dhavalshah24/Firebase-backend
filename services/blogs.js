const firebase = require("../db");
const firestore = firebase.firestore();
const path = require("path");
const uuid = require('uuid-v4');
const { Storage } = require('@google-cloud/storage');

const writeBlog = async (req, res) => {
    try {
        const content = req.body.content;
        const image = req.file;
        bodyuid = req.body.user_id;
        // console.log(bodyuid);
        let displayName = "";
        let uid = ""
        const user = await firebase.auth().currentUser;
        // console.log("user", user);
        if(user === null) {
            data = []
            snapshot = await firestore.collection("users").where("userid", "==", bodyuid).get()
            snapshot.docs.map(doc => {
                data.push(doc.data());
            });
            displayName = data[0].username;
            uid = bodyuid;
        } else {
            data = []
            snapshot = await firestore.collection("users").where("userid", "==", user.uid).get()
            snapshot.docs.map(doc => {
                data.push(doc.data());
            });
            displayName = data[0].displayname;
            uid = user.uid;
        }

        const storage = new Storage();
        const bucket = storage.bucket("blog-project-20d31.appspot.com");

        const imageURL = path.join(__dirname, "../uploads/");
        const fileName = imageURL + image.filename;

        const metadata = {
            metadata: {
                firebaseStorageDownloadTokens: uuid()
            },
            contentType: 'image/png',
            cacheControl: 'public, max-age=31536000',
        };

        await bucket.upload(fileName, {
            gzip: true,
            metadata: metadata,
        });

        await bucket.file(image.filename).makePublic()
        const downloadURL = "https://storage.googleapis.com/blog-project-20d31.appspot.com/" + image.filename;
        // console.log(downloadURL);

        await firestore.collection("blogs").doc().set({
            userid: uid,
            author: displayName,
            content,
            downloadURL,
            timestamp: new Date().getTime()
        });
        res.send({message: "Record saved Successfully"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBlogs = async (req, res) => {
    try {
        data = []
        const snapshot = await firestore.collection("blogs").orderBy("timestamp", "desc").get();
        snapshot.docs.map(doc => {
            data.push(doc.data());
        });
        res.status(200).send(data);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMyBlogs = async(req, res) => {

    try {
        data = [];
        const user = await firebase.auth().currentUser;
        const snapshot = await firestore.collection("blogs").where("userid", "==", user.uid).get();
        snapshot.docs.map(doc => {
            data.push(doc.data());
        });
        data.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    writeBlog,
    getAllBlogs,
    getMyBlogs
}
