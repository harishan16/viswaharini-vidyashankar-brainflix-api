import fs from 'fs';
import express from 'express'
import crypto from "crypto";


const router = express.Router();

const channelNames = ['Cornelia Currey', 'Dalia Bennu', 'Emmett Wilson', 'Album Art Exchange', 'Record Room', 'Discography Deep Dive' ];

const imagesArray = ['http://localhost:8080/images/image0.jpg', 'http://localhost:8080/images/image1.jpg', 'http://localhost:8080/images/image2.jpg', 'http://localhost:8080/images/image3.jpg', 'http://localhost:8080/images/image4.jpg', 'http://localhost:8080/images/image5.jpg', 'http://localhost:8080/images/image6.jpg', 'http://localhost:8080/images/image7.jpg', 'http://localhost:8080/images/image8.jpg'];

const viewsArray = ['345,236', '245,334', '34,589', '18,453', '85,317', '67,132'];

const likesArray = ['36,481', '72,278', '381,234', '520,337', '165,330', '92,115'];

const durationArray = ['32:12', "14:45", '12:30', '22:50', '40:10', '25:40'];

const timestampArray = [1676371200000, 1672531200000, 1681116000000, 1685010300000, 1688169599000];

const commentersArray = ['Olivia Davis', 'Ethan Garcia', 'Ava Wilson', 'Mia Robinson', 'Isabella Taylor'];

const commentsArray = ['The collaborations on this album are fantastic; they really elevate the songs.', 'I cant get enough of the melodies—so catchy and memorable!', 'I always look forward to your uploads. Never disappoints!', 'I cant believe I just discovered your channel! Subscribed!', 'This album is a masterpiece! The production quality is top-notch.']

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
        image: getRandomItem(imagesArray),
        views: getRandomItem(viewsArray),
        likes: getRandomItem(likesArray),
        duration: getRandomItem(durationArray),
        video: "nil",
        timestamp: getRandomItem(timestampArray),
        comments: [
            {
                id: crypto.randomUUID(),
                name: getRandomItem(commentersArray),
                comment: getRandomItem(commentsArray),
                likes: Math.floor(Math.random() * 5),
                timestamp: getRandomItem(commentDates)
            }
        ]
    }

    const videos = getVideos();
    videos.push(videoInfo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(videoInfo);
})

export default router;
