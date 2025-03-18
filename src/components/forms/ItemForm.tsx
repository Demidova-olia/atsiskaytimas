import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './FormStyle.css';
import { API_URL } from '../../../config';

interface ItemFormProps {
  collectionId: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ collectionId }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !type || !material || !color || !description || !price || !currency || !image) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    const newItem = {
      ItemId: Date.now().toString(),
      collectionId,
      name,
      type,
      material,
      color,
      description,
      price: parseFloat(price) || 0,
      currency,
      image,
    };

    try {
      const response = await axios.post(`${API_URL}/items`, newItem);
      console.log('Item added:', response.data);

      setName('');
      setType('');
      setMaterial('');
      setColor('');
      setDescription('');
      setPrice('');
      setCurrency('');
      setImage('');

      navigate(`/collections/${collectionId}`);
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />
      <input type="text" placeholder="Material" value={material} onChange={(e) => setMaterial(e.target.value)} required />
      <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" placeholder="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
      <input type="url" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
