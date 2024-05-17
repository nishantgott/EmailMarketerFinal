import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import messageModel from '../models/messageModel.js';
import dotenv from 'dotenv';


// Initialize Express app
dotenv.config();
const app = express();
app.use(bodyParser.json());


// MongoDB connection setup (replace with your actual connection string)
const dbURI = 'mongodb+srv://nishantgk2004:heBmoS6edFGkPTBr@cluster0.jr4xu3z.mongodb.net/ecommerce';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Webhook endpoint
app.post('/webhook', async (req, res) => {
    try {
        const jsonPayload = req.body;
        // console.log(jsonPayload);
        const messageId = jsonPayload['event-data'].message.headers['message-id'];
        const eventt = jsonPayload['event-data'].event;

        // console.log(`Received message ID: ${messageId}`);

        const mId = `<${messageId}>`;
        console.log(eventt);
        const result = await messageModel.updateOne(
            { message_id: mId },
            { $set: { open: "yes" } }
        );

        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/webhook/click', async (req, res) => {
    try {
        const jsonPayload = req
        const messageId = jsonPayload['event-data'].message.headers['message-id'];
        const eventt = jsonPayload['event-data'].event;

        const mId = `<${messageId}>`;
        console.log(eventt);
        const result = await messageModel.updateOne(
            { message_id: mId },
            { $set: { click: "yes" } }
        );

        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
