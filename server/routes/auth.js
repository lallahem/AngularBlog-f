const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs')

mongoose.connect('mongodb://localhost:27017/blogAngular', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const userSchema = require('../models/user')
const userModel = mongoose.model('users', userSchema); // import model

router.post('/register', async (req, res) => {
    req.body.password = await bcrypt.hashSync(req.body.password);
    console.log(req.body);
    const result = await userModel.create(req.body).then().catch(err => {
        res.send(err);
        return;
    });
    res.send(result);
});

// login with jsonwebtoken (jwt)
router.post('/login', async (req, res) => {
    resultLogin = await userModel.findOne({ email: req.body.email });
    if (!resultLogin) { res.send({ message: 'user not found' }) }
    if (!bcrypt.compareSync(req.body.password, resultLogin.password)) { res.send({ message: 'bad password' }) }
    // resultLogin.password = '';// pour masquer pwd
    if (!resultLogin.access) {res.send({message: 'access denied !'})}
    const token = jwt.sign({ data: resultLogin }, 'secret_code');
    res.send({ message: 'ok', usertoken: token });
});

// just for testing
router.get('/register', async (req, res) => {
    const result = await userModel.find();
    res.send(result);
});
//delet user
router.delete('/register/:id', async (req, res) => {
    const result = await userModel.remove({ _id: req.params.id })
    res.send(result)
});
//update user
router.put('/register/:id', async (req, res) => {
    const result = await userModel.update({ _id: req.params.id }, { $set: req.body });
    res.send(result);
});

module.exports = router;
