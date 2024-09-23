import React, { useState } from 'react';
import './App.css';

const CatAPIApp = () => {
  const [breed, setBreed] = useState('');
  const [catImage, setCatImage] = useState('');
  const [error, setError] = useState(null);

  const fetchCatImage = async (e) => {
    e.preventDefault();
    setError(null);
    setCatImage('');

    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Ras kucing tidak ditemukan');
      }
      const data = await response.json();
      console.log(data);

      if (!data.length){
        throw new Error('Tidak ada gambar kucing yang ditemukan');
      }
      setCatImage(data[0]?.url || ''); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='card'>
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Cari Gambar Kucingmu</h2>
      <form onSubmit={fetchCatImage}>
        <input
          type="text"
          placeholder="Masukkan ID ras kucing (contoh: beng, pers)"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Cari Gambar Kucing</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {catImage && <img src={catImage} alt="Cat" style={{ width: '300px', marginTop: '20px' }} />}
    </div>
    </div>
  );
};

export default CatAPIApp;