import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());


const PORT = 8080;

app.get('/', function(req, res) {
    res.send('server setup');
})


app.listen(PORT, function() {
    console.log('Server is running on port ' + PORT);
})