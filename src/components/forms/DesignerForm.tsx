import React, { useState, useEffect } from "react";
import axios from "axios";
import { Designer } from "../types"; 
import { API_URL } from "../../../config";
import { useNavigate } from "react-router";
import './FormStyle.css';

interface DesignerFormProps {
  initialValues: Designer | null;
  onSave: () => void;
}

const DesignerForm: React.FC<DesignerFormProps> = ({ initialValues, onSave }) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [bio, setBio] = useState(initialValues?.bio || "");
  const [country, setCountry] = useState(initialValues?.country || "");
  const [email, setEmail] = useState(initialValues?.contact.email || "");
  const [phone, setPhone] = useState(initialValues?.contact.phone || "");
  const [website, setWebsite] = useState(initialValues?.contact.website || "");
  const [image, setImage] = useState(initialValues?.image || "");
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const designerData = {
      name,
      bio,
      country,
      contact: {
        email,
        phone,
        website,
      },
      image,
    };

    try {
      if (initialValues?.id) {
     
        const updatedDesigner: Designer = {
          id: initialValues.id,
          ...designerData,
        };

        await axios.put(`${API_URL}/designers/${initialValues.id}`, updatedDesigner);
        await onSave(); 
        navigate(`/designers/${initialValues.id}`); 
      } else {
   
        const response = await axios.post(`${API_URL}/designers`, designerData);
        const newDesigner = response.data;

        await onSave(); 
        navigate(`/designers/${newDesigner.id}`);
      }
    } catch (error) {
      console.error("Failed to update or create designer:", error);
      alert("Failed to save designer. Please try again.");
    }
  };

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setBio(initialValues.bio);
      setCountry(initialValues.country);
      setEmail(initialValues.contact.email);
      setPhone(initialValues.contact.phone);
      setWebsite(initialValues.contact.website);
      setImage(initialValues.image);
    }
  }, [initialValues]);

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
      />
      <input
        type="url"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">{initialValues?.id ? "Edit Designer" : "Add Designer"}</button>
    </form>
  );
};

export default DesignerForm;
