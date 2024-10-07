import fs from 'fs';
import express from 'express'
import crypto from "crypto";


const router = express.Router();

const channelNames = ['Cornelia Currey', 'Dalia Bennu', 'Emmett Wilson', 'Album Art Exchange', 'Record Room', 'Discography Deep Dive' ];

const imagesArray = ['http://localhost:8080/images/image0.jpg', 
    'http://localhost:8080/images/image1.jpg', 
    'http://localhost:8080/images/image2.jpg', 
    'http://localhost:8080/images/image3.jpg', 
    'http://localhost:8080/images/image4.jpg', 
    'http://localhost:8080/images/image5.jpg', 
    'http://localhost:8080/images/image6.jpg', 
    'http://localhost:8080/images/image7.jpg', 
    'http://localhost:8080/images/image8.jpg'];


const durationArray = ['32:12', "14:45", '12:30', '22:50', '40:10', '25:40'];

const commentersArray = ['Olivia Davis', 'Ethan Garcia', 'Ava Wilson', 'Mia Robinson', 'Isabella Taylor'];

const commentDates = [1693526400000, 1696099199000, 1696924800000, 1698796800000, 1699957800000];

const getVideos = () => {
    const data = fs.readFileSync('./data/videos.json');
    const parsedData = JSON.parse(data);
    return parsedData;
}

router.get('/', (req, res) => {
    const videos = getVideos();
    if(!videos.length) {
        res.status(404).send('The request does not exists')
    }
    res.status(200).json(videos);
})

router.get('/:id', (req, res) => {
    const videos = getVideos();
    const selectedVideo = videos.find((video) => video.id === req.params.id )

    if(selectedVideo) {
        res.status(200).json(selectedVideo);
    }
    else {
        res.status(404).send('The requested video does not exists')
    }
})

const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

router.post('/', (req, res) => {

    const videoInfo = {
        id: crypto.randomUUID(),
        title: req.body.title,
        description: req.body.description,
        channel: getRandomItem(channelNames),
        // create one athlete image here
        image: getRandomItem(imagesArray),
        views: '0',
        likes: '0',
        duration: getRandomItem(durationArray),
        video: "nil",
        timestamp: new Date()
    }

    const videos = getVideos();
    videos.push(videoInfo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(videoInfo);
})

export default router;
