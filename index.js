import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(cors({
    origin: '*',
}));

const PORT = 9000;

app.get('/api/health', async(req, res) => {
    res.status(200).send({
        data : null,
        message : "Backend server is running fine",
        success : true,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});