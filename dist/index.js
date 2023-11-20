"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let profiles = {};
let currentId = 1;
app.post('/api/v1/profiles', (req, res) => {
    const { firstName, lastName, middleName } = req.body;
    const id = currentId++;
    profiles[id] = { firstName, lastName, middleName };
    res.status(201).json(Object.assign({ id }, profiles[id]));
});
app.get('/api/v1/profiles/:id', (req, res) => {
    const { id } = req.params;
    const profile = profiles[id];
    if (profile) {
        res.status(200).json({
            body: req.body,
            url: req.url,
            query: req.query,
            headers: req.headers,
            date: new Date().toUTCString(),
        });
    }
    else {
        res.status(404).json({ message: 'Profile not found' });
    }
});
app.delete('/api/v1/profiles/:id', (req, res) => {
    const { id } = req.params;
    const profile = profiles[id];
    if (profile) {
        delete profiles[id];
        res.status(204).send();
    }
    else {
        res.status(404).json({ message: 'Profile not found' });
    }
});
app.use('*', (req, res) => {
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
