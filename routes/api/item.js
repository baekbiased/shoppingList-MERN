const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/item.js');

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })    // -1 for descending
        .then(items => res.json(items))
});

router.post('/', (req, res) => {
    const newItem =  new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;