const User= require('../Model/user');
const Article= require('../Model/article');
const jwt= require('jsonwebtoken');
const bcryptjs= require('bcryptjs');
const iterations = require("../Utils/index").iterations;

var isAuthorised= false;

module.exports.signup= async (req, res) => {
    await User.create ({
        username: req.body.name,
        email: req.body.email,
        passsword: bcryptjs.hashSync(req.body.password, iterations),
    })
    .then(() => {
        res.status(200).send("user registered successfully");
    })
    .catch((e) => res.status(500).send("error in saving user "+e));
}

module.exports.signin= async(req, res) => {
    await User.findOne({email: req.body.email})
    .then((user) => {
        var passwordIsValid= bcryptjs.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send("password is invalid");
        }
        var token= jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY);
        
        return res.status(200).send({
            loginStatus: true,
            id: user._id,
            jwtToken: token,
        })
    })
    .catch((e) => {
        res.status(500).send("error in finding user: "+e);
    })
}

module.exports.verify= async(req, res)=> {
    let token= req.headers("x-access token");

    if (!token) {
        return res.status(403).send({
            message: "No token provided",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorised",
                decodedId: null, 
            });
        }

        isAuthorised= true;
        return res.status(200).send({
            message: "Authorised",
            decodedId: decoded,
        });
    });
}

module.exports.article= async(req, res) => {
    if (isAuthorised) {
        await Article.create ({
            objectId: {
                username: req.body.username,
                email: req.body.email,
                passsword: bcryptjs.hashSync(req.body.password, iterations),
            },
            title: req.body.title,
            content: req.body.content,
        })
        .then(() => {
            Article.find({}).populate("objectId");
        })
        .then(() => {
            return res.status(200).send("Article created successfully");
        })
        .catch((e)=> {
            return res.status(500).send("Error in creating article "+e);
        })
    }
    else {
        return res.status(401).send("Authentication is incomplete");
    }
}