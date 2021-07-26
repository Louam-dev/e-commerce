const express = require('express');
const router = express.Router();
const Category = require('../models/Category')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const categoryById= require('../middleware/categoryById')
const {check, validationResult} = require('express-validator')


//@route    POST api/category
//@desc     Create Category
//@access   Private admin
router.post('/', [
    check('name', 'Name is required').trim().not().isEmpty()
], auth, adminAuth, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const {name} = req.body
    //check if already exist
    try {
        let category = await Category.findOne({
            name
        })
        if (category) {
            return res.status(403).json({
                error: 'Category already exist'
            })
        }
        const newCategory = new Category({name})
        category = await newCategory.save()
        res.json(category);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

//@route    GET api/category
//@desc     Get all categories
//@access   Public
router.get('/all', async (req,res)=>{
    try {
        let data = await Category.find({})
        res.json(data)
    }catch (error) {
console.log(error)
        res.status(500).send('Server error')
    }
})

//@route    GET api/category/:categoryID
//@desc     Get single category
//@access   Public
router.get('/:categoryId',categoryById, async (req,res)=>{
    res.json(req.category);
})

//@route    PUT api/category/:categoryID
//@desc     Update single category
//@access   Private Admin
router.put('/:categoryId',auth,adminAuth,categoryById,async (req,res)=>{
    let category=req.category;
    const {name}=req.body;
    if(name) category.name= name.trim();

    try {
        category =await category.save()
        res.json(category)
    }catch (error) {
        console.log(error.message)
        res.status(500).send('Server error');
    }

})

//@route    DELETE api/category/:categoryID
//@desc     Delete single category
//@access   Private Admin
router.delete('/:categoryId',auth,adminAuth,categoryById,async (req,res)=>{
    let category = req.category;
    try{
        let deletedCategory=await category.remove();
        res.json({
            message:  deletedCategory.name +' deleted successfully'
        })
    }catch (error){
        console.log(error.message)
        res.status(500).send('Server error');
    }
})
module.exports = router