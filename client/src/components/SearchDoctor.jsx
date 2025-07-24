import React, { useState } from 'react';

const SearchDoctor = () => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [distance, setDistance] = useState(10);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!lat || !lng) {
            alert("Please provide both latitude and longitude.");
            return;
        }

        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lng);

        if (isNaN(parsedLat) || isNaN(parsedLng)) {
            alert("Latitude and Longitude must be valid numbers.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/patients/search?lat=${parsedLat}&lng=${parsedLng}&distance=${distance}`);
            const data = await res.json();

            if (res.ok && Array.isArray(data)) {
                setDoctors(data);
            } else {
                console.log("Server responded with:", data);
                setDoctors([]); // avoid map crash
                alert(data?.error || "Error fetching doctors.");
            }
        } catch (error) {
            console.error("Search error:", error);
            alert("Something went wrong.");
            setDoctors([]);
        }

        setLoading(false);
    };


    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            },
            () => {
                alert("Unable to retrieve your location.");
            }
        );
    };

    return (
        <div style={{
            maxWidth: 400,
            margin: '40px auto',
            padding: 24,
            border: '1px solid #eee',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Find Doctors Near You</h2>

            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input
                    type="number"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    placeholder="Latitude"
                    style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
                <input
                    type="number"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    placeholder="Longitude"
                    style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
            </div>
            <input
                type="number"
                value={distance}
                onChange={e => setDistance(e.target.value)}
                placeholder="Distance in km"
                min="1"
                max="50"
                style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    marginBottom: 10
                }}
            />

            <button
                onClick={handleUseMyLocation}
                style={{
                    width: '100%',
                    padding: 10,
                    marginBottom: 10,
                    background: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Use My Location
            </button>

            <button
                onClick={handleSearch}
                disabled={loading || !lat || !lng}
                style={{
                    width: '100%',
                    padding: 10,
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                {loading ? 'Searching...' : 'Search'}
            </button>

            <ul style={{ marginTop: 24, padding: 0, listStyle: 'none' }}>
                {Array.isArray(doctors) && doctors.length === 0 && !loading && (
                    <li style={{ textAlign: 'center', color: '#888' }}>No doctors found.</li>
                )}
                {Array.isArray(doctors) && doctors.map(doc => (
                    <li
                        key={doc._id}
                        style={{
                            background: '#f5f5f5',
                            marginBottom: 10,
                            padding: 12,
                            borderRadius: 4,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
                        }}
                    >
                        <strong>{doc.name}</strong><br />
                        <span style={{ color: '#555' }}>{doc.clinicAddress}</span>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default SearchDoctor;
