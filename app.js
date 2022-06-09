const express = require("express");
const res = require("express/lib/response");

const app = express();
app.use(express.json());

const db = require("./config/db");

app.get("/", (req,res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({extended: true}));

db.authenticate().then(() => console.log("berhasil terkoneksi dengan database"));

const Case = require("./models/Case");

app.post("/crud", async (req,res) => {
    try{
        console.log(req);
        const {name, deskripsi} = req.body;
        const newCase = new Case({
            name, deskripsi
        })
        await newCase.save();
        res.json(newCase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

app.get("/crud", async (req,res) => {
    try {
        const getAllCase = await Case.findAll({})
        res.json(getAllCase)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

app.get("/crud/:id", async (req,res) => {
    try {
        const id = req.params.id
        const getCase = await Case.findOne ({
            where: {id:id}
        });
        res.json(getCase);
    }catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

app.delete("/crud/:id", async ( req,res ) => {
    try {
        const id = req.params.id
        const deleteCase = await Case.destroy({
            where: {id:id}
        })
        await deleteCase;
        res.json("berhasil dihapus")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});


app.listen(4500, () => console.log("port berjalan di 4500"));