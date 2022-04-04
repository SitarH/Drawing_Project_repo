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


//get info from json to send to guessing
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

// change json file
server.put('/change', async (req, res) =>{
try{
    const dataJson = await fs.readFileSync('./game.json');
    const data= JSON.parse(dataJson);
    if(req.body){
        data[0]["img"] = req.body.img;
        data[0]["currentWord"] = req.body.currentWord;
        await fs.writeFileSync('./game.json', JSON.stringify(data));
        res.json(data);
    } 
    else
        res.status(400).json({message: 'file not found'})

}catch (error){
    res.status(500).send(error)
}
    
  
});

//reset json file
server.put('/reset', async (req, res) =>{
    try{
        const dataJson = await fs.readFileSync('./game.json');
        const data= JSON.parse(dataJson);
        if(req.body){
            data[0]["img"] = "";
            data[0]["currentWord"] = "";
            await fs.writeFileSync('./game.json', JSON.stringify(data));
            res.json(data);
        } 
        else
            res.status(400).json({message: 'file not found'})
    
    }catch (error){
        res.status(500).send(error)
    }
      
    });






server.listen(PORT, ()=> {console.log(`http://localhost:${PORT}`)});


