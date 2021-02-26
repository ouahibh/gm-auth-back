const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fileUpload = require('express-fileupload');

module.exports.Login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email: email}).exec();
    //check if the user exist in our database
    if (!user) {
        return res.send({error: true, msg: 'email not exist'})
    }
    //check if the password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.send({error: true, msg: 'password not correct'})
    }
    let token = jwt.sign(
        {email},
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

    const data = {
        token: token,
        user: user
    }
    return res.send({error: false, data: data})
}

module.exports.SignUp = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile = req.body.profile;

    const user = await User.findOne({email: email}).exec();
    console.log(user)
    if (user) {
        return res.send({error: true, msg: 'email exist !'})
    }
    const code = await bcrypt.genSalt(10);

    const userToSave = new User();
    userToSave.name = name;
    userToSave.email = email;
    userToSave.password = await bcrypt.hash(password, code);
    userToSave.profile = profile
    userToSave.save()
        .then(ok => {
            res.send({error: false, msg: 'OK'})
        })
        .catch(err => {
            res.send({error: true, msg: 'not ok'})
        })
}
module.exports.AllUsers = (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        res.send({
            error: true,
            msg: 'User not authentified !'
        })
    }
    User.find().then(users => {
        res.send({
            error: false,
            users: users
        })
    }).catch(err => {
        res.send({
            error: true,
            msg: 'NOT OK'
        })
    })
}

module.exports.Uplaod = (req, res) => {

    if (!req.files) {
        return res.send({error: true, mas: 'files not sended !'})
    }
    const file = req.files.file;
    if (!file) {
        return res.send({error: true, mas: 'File not sended !'})
    }
    //  mv() method places the file inside public directory
    file.mv(`${__dirname}/../public/${file.name}`, (err) => {
        if (err) {
            console.log(err)
            return res.send({error: true, msg: "Error occured"});
        }
        // returing the response with file path and name
        return res.send({name: file.name, path: `/${file.name}`});
    });
}
