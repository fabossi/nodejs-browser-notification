const bodyparser = require('body-parser')
const express = require('express')
const webp = require('web-push')
const path = require('path')


const app = express();

// Set Static Path

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyparser.json());

const publicVipdKey = 'BDAgbDVTBb2BKTuuOgbcl5H_sSHk4wGrjz_aibS8Ujg8U00J4BU9DNEgUwCbQGAWDBYWVQziGuDO8gffOxftklE';
const privateVipdKey = 'QolDiS1zYzkBSWJVvn4zbrbmIyWP1aRL_ZZErkRZz58';


webp.setVapidDetails('mailto:fabossif@gmail.com', publicVipdKey, privateVipdKey);


// Subscribe Route 

app.post('/subscribe', (req, res) => {
    // Get push subscription object

    const subscription = req.body;

    res.status(201).json({});


    // Create Payload

    const payload = JSON.stringify({ "title": 'push test' });

    // Pass Object Into sendNotification

    webp.sendNotification(subscription, payload).catch(err => console.error(err));
});


app.listen(4000, () => { console.log('Server listen on 4000') })