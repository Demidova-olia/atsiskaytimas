import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Designer, Collection, Item } from "../../components/types";
import axios from "axios";
import { API_URL } from "../../../config";
import styles from "./DesignerPage.module.css";

const DesignerPage: React.FC = () => {
  const { designerId } = useParams<{ designerId: string }>();
  const { designers, collections, items, loading, error } = useContext(ApiContext) || {}; // Context data
  const [designer, setDesigner] = useState<Designer | null>(null);
  const [designerCollections, setDesignerCollections] = useState<Collection[]>([]);
  const [designerItems, setDesignerItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (designerId && designers && collections && items) {
      const foundDesigner = designers.find(d => d.designer_id === designerId);
      if (foundDesigner) {
        setDesigner(foundDesigner);

        // Filter related collections by designer_id
        const relatedCollections = collections.filter(collection =>
          collection.designer_id === foundDesigner.designer_id
        );
        setDesignerCollections(relatedCollections);

        // Filter items related to the found collections
        const relatedItems = items.filter(item =>
          relatedCollections.some(collection => collection.collection_id === item.collection_id)
        );
        setDesignerItems(relatedItems);
      }
    }
  }, [designerId, designers, collections, items]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!designer) {
    return <p>Designer not found</p>;
  }

  const { name, bio, image } = designer;

  const deleteHandler = async () => {
    try {
      await axios.delete(`${API_URL}/designers/${designerId}`);
      navigate("/designers");
    } catch (error) {
      console.error("Error deleting designer:", error);
      alert("Failed to delete the designer");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Designer: {name}</h1>
      <div className={styles.designerInfo}>
        <img className={styles.image} src={image} alt={name} />
        <p className={styles.bio}>{bio}</p>
      </div>
      <div className={styles.controls}>
        <button className={styles.delete} onClick={deleteHandler}>Delete</button>
        <Link className={styles.editLink} to={`/designers/edit/${designerId}`}>Edit</Link>
      </div>

      <h3 className={styles.collectionsHeading}>Collections:</h3>
      {designerCollections.length > 0 ? (
        <ul className={styles.collectionsList}>
          {designerCollections.map((collection) => (
            <li key={collection.collection_id} className={styles.collectionItem}>
              <Link className={styles.link} to={`/collections/${collection.collection_id}`}>
                {collection.name} ({collection.season} {collection.year})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No collections available</p>
      )}

      <h3 className={styles.itemsHeading}>Items:</h3>
      {designerItems.length > 0 ? (
        <ul className={styles.itemsList}>
          {designerItems.map((item) => (
            <li key={item.item_id} className={styles.item}>
              <Link className={styles.link} to={`/items/${item.item_id}`}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p>{item.material}</p>
                  <p>{item.price} {item.currency}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default DesignerPage;
