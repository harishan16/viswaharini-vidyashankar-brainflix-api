import express from 'express'
import cors from 'cors'
import videos from './routes/videos.js'

const app = express();
app.use(cors());


const PORT = 8080;

app.get('/', function(req, res) {
    res.send('hi');
})


app.use(express.json())

app.use((req, res, next) => {
    console.log('middleware');
    next();
})

app.use('/videos', videos)

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})