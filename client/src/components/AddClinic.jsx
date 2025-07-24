import React, { useRef, useEffect, useState } from 'react';

const AddClinic = () => {
    const mapRef = useRef(null);
    const [marker, setMarker] = useState(null);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!window.google) return;
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 12.9352, lng: 77.6245 },
            zoom: 13,
        });

        map.addListener('click', (e) => {
            if (marker) marker.setMap(null);
            const newMarker = new window.google.maps.Marker({
                position: e.latLng,
                map,
            });
            setMarker(newMarker);
            setLat(e.latLng.lat());
            setLng(e.latLng.lng());
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        const res = await fetch('http://localhost:5000/api/doctors/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, clinicAddress: address, lat, lng }),
        });
        if (res.ok) {
            setSuccess(true);
            setName('');
            setAddress('');
            setLat('');
            setLng('');
            if (marker) marker.setMap(null);
        }
        setLoading(false);
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
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Add Clinic Location</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Doctor Name"
                    required
                    style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
                <input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Clinic Address"
                    required
                    style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
                <div
                    ref={mapRef}
                    style={{ width: '100%', height: '300px', marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    disabled={loading || !lat || !lng}
                    style={{
                        width: '100%',
                        padding: 10,
                        background: '#388e3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Saving...' : 'Add Clinic'}
                </button>
            </form>
            {lat && lng && (
                <p style={{ marginTop: 10, color: '#1976d2', fontSize: 14 }}>
                    Selected Location: <b>{lat.toFixed(5)}, {lng.toFixed(5)}</b>
                </p>
            )}
            {success && (
                <p style={{ marginTop: 10, color: '#388e3c', fontWeight: 'bold' }}>
                    Clinic added successfully!
                </p>
            )}
        </div>
    );
};

export default AddClinic;