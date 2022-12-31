const express = require('express');
const cors = require('cors');
const app = express();
const {  agregarPosts, obtenerPosts, actualizarPosts, eliminarPosts } = require('./posts')


app.listen(3000, console.log("El servidor se encuentra escuchando en el puerto 3000"))

app.use(express.json())
app.use(cors());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/posts', async (req, res) => {
    const posts = await obtenerPosts()
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const { titulo, url, descripcion } = req.body;
    const likes = 0;
    await agregarPosts(titulo, url, descripcion, likes)

    res.send("Posts agregado con éxito")
})

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id"+id)
    await actualizarPosts(id)

    res.send("Posts actualizado con éxito")
})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id"+id)
    await eliminarPosts(id)

    res.send("Posts actualizado con éxito")
})