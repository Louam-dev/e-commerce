const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken') //to generate token
const bcrypt = require('bcryptjs') //to encrypt password
// Check validation for requests
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');// get user image by email

//Models
const User = require('../models/User');

//@route   POST api/user/register
//@desc    Register a user
//@access  Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a pass with 6 or more char').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    //get name, email e password from request
    const {name, email, password} = req.body;

    try {
        //check if user already exists
        let user = await User.findOne({email});

        //If user exists
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'User already exists',
                    }
                ]
            })
        }
        //if not exists
        //get image from gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })

        //create new user Object
        user = new User({
            name, email, avatar, password
        })

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        //save user in DB
        await user.save();

        //payload to generate token
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000, //for dev purpose, in production will be 3600
            },
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        )

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');

    }
});

module.exports = router
