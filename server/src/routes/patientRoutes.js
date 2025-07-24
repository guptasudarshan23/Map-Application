import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();


// Search for doctors near a location
router.get('/search', async (req, res) => {
    const { lat, lng, distance } = req.query;

    // Validate input
    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    const maxDistance = parseInt(distance) * 1000 || 5000;

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
        return res.status(400).json({ error: "Latitude and longitude must be valid numbers." });
    }

    try {
        const doctors = await Doctor.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parsedLng, parsedLat],
                    },
                    $maxDistance: 10000, // 5km radius
                },
            },
        });

        res.json(doctors);
    } catch (err) {
        console.error('Error in search route:', err);
        res.status(500).json({ error: "Something went wrong on the server." });
    }
});

export default router;