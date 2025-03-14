import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const ItemForm: React.FC = () => {
  const [name, setName] = useState('');
  const [material, setMaterial] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      item_id: Date.now().toString(),
      name,
      material,
      price: parseFloat(price),
      currency,
      collection_id: collectionId,
      image,
    };

    try {
      const response = await axios.post(`${API_URL}/items`, newItem);
      console.log('Item added:', response.data);

      setName('');
      setMaterial('');
      setPrice('');
      setCurrency('');
      setCollectionId('');
      setImage('');
    } catch (error) {
      console.error('Error adding item:', error);
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
        placeholder="Material"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Collection ID"
        value={collectionId}
        onChange={(e) => setCollectionId(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;

