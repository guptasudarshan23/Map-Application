import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

import { connectDB } from "./lib/db.js";
// Import routes (to be created next)
import doctorRoutes from './routes/doctorRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import Doctor from './models/Doctor.js';





// Express app setup
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);

Doctor.createIndexes({ location: '2dsphere' })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});