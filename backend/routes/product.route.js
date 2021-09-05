const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs')
const productById = require('../middleware/productById')


// @route    GET api/product/
// @desc     Get all products
//@access   Public
router.get('/', async(req,res) => {
    try {
        let data =  await Product.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

//@route    POST api/product
//@desc     Create a product
//@access   Private Admin
router.post("/", auth, adminAuth, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        if (!files.photo) {
            return res.status(400).json({
                error: 'Image is required'
            })
        }
        if (files.photo.type !== 'image/jpeg' && files.photo.type !== 'image/jpg' && files.photo.type !== 'image/png') {
            return res.status(400).json({
                error: 'Image type not allowed'
            })
        }

        //check for all fields
        const { name, description, price, category, quantity, shipping } = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            })
        }
        let product = new Product(fields);
        //1MB =1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size'
            })
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;

        try {
            await product.save()
            res.json('Product created successfully');
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    })
})

//@route    GET api/product/productId
//@desc     Get a product infos by ID (without photo)
//@access   Public
router.get("/:productId", productById, (req, res) => {
    //To avoid response pollution caused by image, is provided another route only for img
    req.product.photo = undefined;
    return res.json(req.product);
})

//@route    GET api/product/photo/productId
//@desc     Get a product image by ID
//@access   Public
router.get("/photo/:productId", productById, (req, res) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }
    res.status(400).json({
        error: 'Failed to load image'
    })
})


module.exports = router;