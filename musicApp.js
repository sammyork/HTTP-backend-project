//samantha York 
//section 86 - pd. 7&8 odd
//Feb 5, 2023

const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Listening on port 3000 ...')
});

app.get('/', (req,res)=> {
    res.send('HTTP Backend Project - Samantha York <3');
});
app.post('/', (req,res)=> {
    res.send('post request');
});
app.put('/', (req,res)=> {
    res.send('put request');
});
app.delete('/', (req,res)=> {
    res.send('delete request');
});

const genres = [
    {id:1, name: 'Pop', song: 'Baby', artist: 'Justin Beiber', year: '2009', month: 'December'},
    {id:2, name: 'Hip Hop', song: 'My Type', artist: 'Saweetie', year: '2019', month: 'June'},
    {id:3, name: 'Rap', song: 'The Box', artist: 'Roddy Ricch', year: '2019', month: 'December'},
    {id:4, name: 'Classical', song: 'Fur Elise', artist: 'Beethoven', year: '1810', month: 'April'},
    {id:5, name: 'Rock', song: 'I Love Rock N Roll', artist: 'Joan Jett', year: '1981', month: 'November'},
    {id:6, name: 'Jazz', song: 'Fly Me To The Moon', artist: 'Frank Sinatra', year: '1964', month: ''},
    {id:7, name: 'Blues', song: 'What a Wonderful World', artist: 'Louis Armstrong', year: '1967', month: 'September'},
    {id:8, name: 'Electronic', song: 'Home', artist: 'Caribou ', year: '2019', month: 'October'}
];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//http GET requests route 
app.get('/api/genres', (req,res)=> {
    res.send(genres);
});
//sort by genre
app.get('/api/genres/:id', (req,res)=> {
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send("The genre with the given ID was not found");
        return
    } 
        res.send(genre);
});
//sort by month
app.get('/api/genres/:month', (req,res)=> {
    const month = genres.filter(m => String(m.month).toLowerCase() === String(req.params.month).toLowerCase());
    const info = [
        {name: "filter", month: req.params.month},
        month.map((genre) => ({ id:genre.id, name:genre.name, song:genre.song, artist:genre.artist, month: genre.month, year: genre.year}))
    ];
    res.send(info);
});
//sort by year and month
app.get('/api/genres/:year/:month', (req, res) => {
    const year = genres.filter(y => parseInt(y.year) === parseInt(req.params.year));
    const month = year.filter(y => String(y.month).toLowerCase() === String(req.params.month).toLowerCase());
    const info = [
        {year: parseInt(req.params.year), month: req.params.month},
        month.map((genre) => ({ id:genre.id, name:genre.name, song:genre.song, artist:genre.artist, month: genre.month, year: genre.year}))
    ];
    res.send(info);
});

//HTTP POST Requests
app.post('/api/genres', (req,res) => {
    if (req.body.name.length > 2 && req.body.name.length < 16) {
        const music ={
            id: genres.length +1,
            name: req.body.name,
            song: req.body.song,
            artist: req.body.artist,
            month: req.body.month,
            year: req.body.year
        }
        genres.push(music);
        res.send(music);
        return
    } 
    res.status(404).send("Name must be between 3 and 15 characters");
});

//PUT Requests
app.put('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send("The genre with the given ID was not found");
            return
    }  
    if (req.body.name.length > 2 && req.body.name.length < 16) {
        const idx = genres.findIndex(g=> g.id === parseInt(req.params.id));
        const music = {
            id: req.params.id,
            name: req.body.name,
            song: req.body.song,
            artist: req.body.artist,
            month: req.body.month,
            year: req.body.year
        };
        genres[idx] = music;
        res.send(music);
        return
    };
    res.status(404).send("Name must be between 3 and 15 characters");
});

//DELETE Requests
app.delete('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g=> g.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send("The genre with the given ID was not found");
            return
    } 
    const idx = genres.findIndex(g => g.id === parseInt(req.params.id));
    const thing = genres[idx];
    genres.splice(idx, 1);
    res.send(thing);
});


// (1) how programs communicate in what order to each other for a given purpose, (2) what you learned in this project and (3) how can this project be further extended.
//1. Programs communicate through API using get, post, put, and delete. While get displays current data, post creates and adds new data, put can change data, and delete is self explanatory. 
//2. I learned a lot during this project. In the beginning, I found using API and postman to be really confusing as I wasn't comfortable with back end but by the end, I feel like I am prepared for a more complex project. I understand how programs communicate as well as how data is kept and changed
//3. I can further add to the project complexity points by adding more songs or creating new filters.
