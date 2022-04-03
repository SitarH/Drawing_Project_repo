const express = require('express');

const axios = require('axios');

const fs = require('fs');

const cors = require('cors');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5005;

const server = express();

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());


//get info from json to sent to guessing
server.get(`/drawing`, async (req, res) => {
    try{
    const file = await fs.readFileSync(`./game.json`)
    if (file){
        const data = JSON.parse(file)
        res.status(200).json(data)
    }
    else
        res.status(400).json({message: 'file not found'})
    } catch (error){
        res.status(500).send(error)
    }
})


server.put('/change', async (req, res) =>{
    debugger
//try catch
    const dataJson = await fs.readFileSync('./game.json');
    const data= JSON.parse(dataJson);
    if(req.body){
        data[0]["img"] = req.body.img;
        data[0]["currentWord"] = req.body.word;
        await fs.writeFileSync('./game.json', JSON.stringify(data));
        res.json(data);
    }
    //error msg
  
});


// server.post('/drawing', async (req, res) => {
//     try {
//         const {img} = req.body;
//         const addImg = {img};
//         const data = await fs.readFileSync('./game.json');
//         const game =[...JSON.parse(data)];
//         addImg.id = game.length+1;
//         game.push(addImg);
//         await fs.writeFileSync('./game.json', JSON.stringify(game));
//         res.status(200).json({message: 'game added successfully'});
        
//     } catch (error) {
//         res.status(500).send(error)
        
//     }

// })
// server.get('/data', (req, res) => {
//     const options = {
//         method: 'GET',
//         params: {word: 'bla'},
//         headers: {'Content-Type': 'application/json'}
//       }
    
//       axios.request(options).then((response) =>{
//           res.json(response.data)
//           console.log(response.data)
        
//       }).catch((err) =>{
//           console.error(err)
//       })
// })






server.listen(PORT, ()=> {console.log(`http://localhost:${PORT}`)});


