import express from "express"

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const elementos = [
    {id: 1, nombre: "ELEMENTO 1"},
    {id: 2, nombre: "ELEMENTO 2"},
    {id: 3, nombre: "ELEMENTO 3"},
    {id: 4, nombre: "ELEMENTO 4"}
];

app.get("/api/elements", (req, res) => {
    res.json(elementos);
});

app.get("/api/elementos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const element = elementos.find(el => el.id === id);

    if (!element) {
        res.status(404).json({mensaje: "Element Not Found"});
    } else {
        res.json(element);
    }
});

app.post("/api/elementos", (req, res) => {
    const element = {
        id: elementos.length + 1,
        nombre: req.body.nombre,
    };
    elementos.push(element);
    res.json(element);
});

app.put("/api/elementos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const element = elementos.find(el => el.id === id);
    if (!element) {
        res.status(404).json({mensaje: "Element Not Found"});
    } else {
        element.nombre = req.body.nombre;
        res.json(element);
    }
});

app.delete("/api/elementos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = elementos.findIndex(el => el.id === id);

    if (index === -1) {
        res.status(404).json({mensaje: "Element Not Found"});
    } else {
        elementos.splice(index, 1);
        res.json({mensaje: "Element deleted successfully"});
    }
});

app.listen(PORT, () => {
    console.log("Escuchando el puerto " + PORT);
});