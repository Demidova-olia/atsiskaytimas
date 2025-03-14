import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router';

const DesignerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDesigner = {
      id: Date.now().toString(),
      name,
      bio,
      country,
      contact: {
        email,
        phone,
        website
      },
      image
    };

    try {
      const response = await axios.post(`${API_URL}/designers`, newDesigner);
      console.log('Designer added:', response.data);
      navigate(`/designers/${newDesigner.id}`);
      
      setName('');
      setBio('');
      setCountry('');
      setEmail('');
      setPhone('');
      setWebsite('');
      setImage('');
    } catch (error) {
      console.error('Error adding designer:', error);
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
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <button type="submit">Add Designer</button>
    </form>
  );
};

export default DesignerForm;
