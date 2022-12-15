const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js');

// GET
koalaRouter.get('/', (req, res) => {
    let sqlQuery = `
    SELECT * FROM "koalas"
    `;
    pool.query(sqlQuery)
    .then((dbRes) => {
        //send back the array of koalas
        res.send(dbRes.rows);
    }).catch ((dbErr) => {
        console.log('something broke in /koalas GET');
        res.sendStatus(500);
    })
})

// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('adding a koala', newKoala);

    let sqlQuery = `
    INSERT INTO "koalas" ("name", "age", "gender", "readyForTransfer", "notes" )
        VALUES ($1, $2, $3, $4, $5);
    `
    let sqlValues = [newKoala.name, newKoala.age, newKoala.gender, newKoala.readyForTransfer, newKoala.notes];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.log('error adding a new koala', dbErr);
        res.sendStatus(500);
    })
})

// PUT
koalaRouter.put('/koalas/:id', (req,res) => {
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);
  
    let idToUpdate = req.params.id;
    let newTransfer = req.body.readyForTransfer;

    let sqlQuery = `
        UPDATE "koalas"
            SET ""readyForTransfer""
    `
  })


// DELETE

module.exports = koalaRouter;