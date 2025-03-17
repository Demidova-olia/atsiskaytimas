import React, { useState, useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { useNavigate } from 'react-router';
import axios from 'axios'; 
import { Collection, Designer } from './types';
import { API_URL } from '../../config'; 
import './FormStyle.css';

const CollectionForm: React.FC = () => {
  const [name, setName] = useState('');
  const [season, setSeason] = useState('');
  const [year, setYear] = useState('');
  const [designerId, setDesignerId] = useState('');

  const navigate = useNavigate();

  const context = useContext(ApiContext);

  if (!context) {
    return <div>Error: ApiContext not found!</div>;
  }

  const { designers, addCollection } = context; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCollection: Collection = {
      collectionId: Date.now().toString(),
      name,
      season,
      year: parseInt(year),
      designerId,
    };

    try {
      const response = await axios.post(`${API_URL}/collections`, newCollection); // Замените URL на ваш реальный
      console.log('Collection added:', response.data);

      addCollection(newCollection);

      navigate(`/collections/${newCollection.collectionId}`);

      setName('');
      setSeason('');
      setYear('');
      setDesignerId('');
    } catch (error) {
      console.error('Error adding collection:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Season"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />

      <select
        value={designerId}
        onChange={(e) => setDesignerId(e.target.value)}
        required
      >
        <option value="" disabled>
          Select Designer
        </option>
        {designers.map((designer: Designer) => (
          <option key={designer.id} value={designer.id}>
            {designer.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Collection</button>
    </form>
  );
};

export default CollectionForm;
