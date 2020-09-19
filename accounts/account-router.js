const { json } = require('express');
const express = require('express');

const db = require("../data/dbConfig");

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.json(accounts);
    })
    .catch(err => {
        res.status(500).json({message: 'error getting posts', error:err});
    })
});

router.post('/', (req, res) => {
    const newAccount = req.body;

    db('accounts').insert(newAccount)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(err => {
        res.status(500).json({ message: 'Error adding account', error: err})
    })
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts').update(changes).where({id})
    .then(count => {
        if(count) {
            res.json({updated: count})
        } else {
            res.status(404).json({message: 'invalid id'});
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error updating account', eror: err});
    })
});


router.delete('/:id', (req, res) => {
    const  {id} = req.params;

    db('accounts').where({id}).del()
    .then(count => {
        if(count) {
            res.json({deleted: count})
        } else {
            res.status(404).json({message: 'invalid id'});
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error deleting record', eror: err});
    })
});


module.exports = router;