import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

let profiles: { [id: string]: { firstName: string; lastName: string; middleName: string } } = {};
let currentId = 1;

app.post('/api/v1/profiles', (req: Request, res: Response) => {
    const { firstName, lastName, middleName } = req.body;
    const id = currentId++;
    profiles[id] = { firstName, lastName, middleName };
    res.status(201).json({ id, ...profiles[id] });
});

app.get('/api/v1/profiles/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = profiles[id];

    if (profile) {
        const { firstName, lastName, middleName } = profile;
        res.status(200).json({
            id,
            firstName,
            lastName,
            middleName,
        });
    } else {
        res.status(404).json({ message: 'Profile not found' });
    }
});

app.delete('/api/v1/profiles/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = profiles[id];
    if (profile) {
        delete profiles[id];
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Profile not found' });
    }
});

app.use('*', (req: Request, res: Response) => {
    res.status(200).json({
        body: req.body,
        url: req.url,
        query: req.query,
        headers: req.headers,
        date: new Date().toUTCString(),
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
