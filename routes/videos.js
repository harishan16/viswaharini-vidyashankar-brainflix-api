import fs from 'fs';
import express from 'express'
import crypto from "crypto";

const router = express.Router();

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

    const subsetVideos = videos.map((video) => {
        return { id: video.id, image: video.image, title: video.title, channel: video.channel };
      });

    res.status(200).json(subsetVideos);
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

router.post('/', (req, res) => {

    if (!req.body.title || !req.body.description) {
        return res.status(400).send('Invalid input');
    }

    const videoInfo = {
        id: crypto.randomUUID(),
        title: req.body.title,
        description: req.body.description,
        channel: 'Olivia Davis',
        image: req.body.image, 
        views: '0',
        likes: '0',
        duration: '24:50',
        video: '',
        timestamp: new Date()
    }

    const videos = getVideos();
    videos.push(videoInfo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(videoInfo);
})

export default router;
