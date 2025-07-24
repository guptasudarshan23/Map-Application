import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Add a new doctor (clinic)
router.post('/add', async (req, res) => {
    const { name, clinicAddress, lat, lng } = req.body;
    try {
        const doctor = new Doctor({
            name,
            clinicAddress,
            location: { type: 'Point', coordinates: [lng, lat] },
        });
        await doctor.save();
        res.json({ success: true, doctor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all doctors (optional, for testing)
router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

export default router;