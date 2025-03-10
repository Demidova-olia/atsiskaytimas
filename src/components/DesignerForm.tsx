import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Designer } from "./types";

const DesignerForm = ({ editDesignerData }: { editDesignerData?: Designer }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [designer, setDesigner] = useState<Designer>({
    designer_id: "",
    name: "",
    bio: "",
    country: "",
    collections: [],
    image: "",
    contact: {
      email: "",
      phone: "",
      website: "",
    },
  });

  useEffect(() => {
    if (editDesignerData) {
      setDesigner(editDesignerData);
    }
  }, [editDesignerData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDesigner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDesigner((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  const handleCollectionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesigner((prev) => ({
      ...prev,
      collections: e.target.value.split(",").map((c) => c.trim()),
    }));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!designer.name || !designer.contact.email) {
      setError("Name and email are required");
      return;
    }

    try {
      if (editDesignerData) {
        const { data } = await axios.put(`${API_URL}/designers/${designer.designer_id}`, designer);
        navigate(`/designers/${data.designer_id}`);
      } else {
        const { data } = await axios.post(`${API_URL}/designers`, designer);
        navigate(`/designers/${data.designer_id}`);
      }
    } catch (error) {
      setError("An error occurred while saving the designer.");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={designer.name} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="bio">Bio:</label>
        <textarea name="bio" id="bio" value={designer.bio} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="country">Country:</label>
        <input type="text" name="country" id="country" value={designer.country} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="collections">Collections (comma separated):</label>
        <input type="text" name="collections" id="collections" value={designer.collections.join(", ")} onChange={handleCollectionsChange} />
      </div>

      <div className="form-control">
        <label htmlFor="image">Image URL:</label>
        <input type="url" name="image" id="image" value={designer.image} onChange={handleChange} />
      </div>

      <h3>Contact Information:</h3>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={designer.contact.email} onChange={handleContactChange} />
      </div>

      <div className="form-control">
        <label htmlFor="phone">Phone:</label>
        <input type="tel" name="phone" id="phone" value={designer.contact.phone} onChange={handleContactChange} />
      </div>

      <div className="form-control">
        <label htmlFor="website">Website:</label>
        <input type="url" name="website" id="website" value={designer.contact.website} onChange={handleContactChange} />
      </div>

      <button type="submit">{editDesignerData ? "Edit Designer" : "Create Designer"}</button>
    </form>
  );
};

export default DesignerForm;
