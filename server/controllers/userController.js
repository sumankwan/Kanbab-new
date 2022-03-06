const { User } = require('../models/index.js')
const comparePass = require('../helpers/bcrypt.js').comparePass
const generateToken = require('../helpers/jwt.js').generateToken
const {OAuth2Client} = require('google-auth-library');

class userController {
    static register (req, res, next) {
        User.create({
                email: req.body.email,
                password: req.body.password
            })
            .then(data => {
                res.status(200).json({user: data})
            })
            .catch(err => {
                next(err)
            })
    }

    static login (req, res, next) {
        User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(data => {
                console.log(data)
                if(!data) {
                    throw ({msg: 'invalid email or password', status: 401})
                }

                if (!comparePass(req.body.password, data.password)) {
                    throw ({msg: 'invalid email or password', status: 401})
                } else {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let token = generateToken(payload)
                    res.status(200).json({token: token})
                }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleSignIn (req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
        client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.CLIENT_ID
            })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email
                return User.findOne({
                        where: {
                            email: email
                        }
                    })
            })
            .then(user => {
                if(user) {
                    return user
                } else {
                    return User.create({
                        email: email,
                        password: '123456'
                    })
                }
            })
            .then(data => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                const token = generateToken(payload)
                res.status(200).json({token: token})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = {userController}