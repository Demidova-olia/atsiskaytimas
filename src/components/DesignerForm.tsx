import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { DesignerFormProps } from "./types";
import { API_URL } from "../../config";

const DesignerForm: React.FC<DesignerFormProps> = ({ editDesignerData }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [designer, setDesigner] = useState({
    designer_id: "",
    name: "",
    bio: "",
    country: "",
    collections: [], // Always empty collections
    image: "",
    contact: {
      email: "",
      phone: "",
      website: "",
    },
  });

  // Set designer data when editing
  useEffect(() => {
    if (editDesignerData) {
      setDesigner({
        designer_id: editDesignerData.designer_id ?? "",
        name: editDesignerData.name ?? "",
        bio: editDesignerData.bio ?? "",
        country: editDesignerData.country ?? "",
        collections: [], // Empty collections array on edit
        image: editDesignerData.image ?? "",
        contact: {
          email: editDesignerData.contact?.email ?? "",
          phone: editDesignerData.contact?.phone ?? "",
          website: editDesignerData.contact?.website ?? "",
        },
      });
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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!designer.name || !designer.contact.email) {
      setError("Name and email are required");
      return;
    }

    try {
      const designerData = {
        ...designer,
        collections: [], // Ensuring collections are always empty
      };

      let response;
      if (editDesignerData) {
        // PUT request to update existing designer
        response = await axios.put(`${API_URL}/designers/${designer.designer_id}`, designerData);
      } else {
        // POST request to create a new designer
        response = await axios.post(`${API_URL}/designers`, designerData);
      }

      navigate(`/designers/${response.data.designer_id}`);
    } catch (error) {
      setError("An error occurred while saving the designer.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={designer.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          id="bio"
          value={designer.bio}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          name="country"
          id="country"
          value={designer.country}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="image">Image URL:</label>
        <input
          type="url"
          name="image"
          id="image"
          value={designer.image}
          onChange={handleChange}
        />
      </div>

      <h3>Contact Information:</h3>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={designer.contact.email}
          onChange={handleContactChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={designer.contact.phone}
          onChange={handleContactChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="website">Website:</label>
        <input
          type="url"
          name="website"
          id="website"
          value={designer.contact.website}
          onChange={handleContactChange}
        />
      </div>

      <button type="submit">
        {editDesignerData ? "Edit Designer" : "Create Designer"}
      </button>
    </form>
  );
};

export default DesignerForm;
