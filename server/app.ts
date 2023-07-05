import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/read', (req: Request, res: Response) => {
    res.send('This is the first textual component fetched from the Node frontend');
});

app.post('/send', (req: Request, res: Response) => {
    const text = req.body.text;
    res.send('Cool');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});