import express from 'express'
import cors from 'cors'
import "dotenv/config";
import videos from './routes/videos.js'

const app = express();
app.use(cors());

const { PORT, BACKEND_URL } = process.env;

app.use('/images', express.static('./public/images'))

app.get('/', function(req, res) {
    res.send('hi');
})

app.use(express.json())

app.use((req, res, next) => {
    next();
})

app.use('/videos', videos)

app.listen(PORT, () => {
    console.log(`Server is listening at ${BACKEND_URL}:${PORT}`);
})