const express = require('express');
const Model = require('../model/model');

const router = express.Router()

//Create a new student record
router.post('/create', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get All Students
router.get('/get', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Get Single Student
router.get('/get/:id', async (req,res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Find Student By ID and Update the Record   
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Find Record By ID and Delete It
router.delete('/delete/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted...`);
    } catch (error) {
        res.json(400).message({ message: error.message });
    }
})

module.exports = router;
