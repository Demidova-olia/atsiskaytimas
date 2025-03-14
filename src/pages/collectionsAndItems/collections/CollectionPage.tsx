import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ApiContext } from "../../../contexts/ApiContext";
import { Collection, Item, Designer } from "../../../components/types";
import { API_URL } from "../../../../config";
import styles from './CollectionPage.module.css';
import axios from "axios";

const CollectionPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [designer, setDesigner] = useState<Designer | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  const { collections, designers, items: contextItems, loading, error, dispatch } = useContext(ApiContext) || {};

  useEffect(() => {
    if (!collections || !designers || !contextItems) return;

    const selectedCollection = collections.find(col => col.collectionId === collectionId);
    if (selectedCollection) {
      setCollection(selectedCollection);
      setItems(contextItems.filter(item => item.collectionId === collectionId));

      const collectionDesigner = designers.find(designer => designer.id === selectedCollection.designerId);
      setDesigner(collectionDesigner || null);
    }
  }, [collectionId, collections, designers, contextItems]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!collection) {
    return <p>Collection not found.</p>;
  }

  const deleteHandler = async () => {
    try {

      const response = await axios.delete(`${API_URL}/collections/${collectionId}`);
      console.log("Collection deleted from server:", response);

      if (response.status === 200 || response.status === 204) {
        if (dispatch) {
          dispatch({ type: 'REMOVE_COLLECTION', payload: collectionId });
        }

        navigate("/collections");
      } 
    } catch (error) {
      console.error("Error deleting collection:", error);
      alert("Failed to delete the collection");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Collection: {collection.name}</h1>
      {designer && (
        <div className={styles.designerInfo}>
          <h2>Designer: {designer.name}</h2>
          <p><strong>Bio:</strong> {designer.bio}</p>
          <p><strong>Country:</strong> {designer.country}</p>
          <p><strong>Contact:</strong></p>
          <ul>
            <li>Email: <a href={`mailto:${designer.contact.email}`}>{designer.contact.email}</a></li>
            <li>Phone: <a href={`tel:${designer.contact.phone}`}>{designer.contact.phone}</a></li>
            <li>Website: <a href={designer.contact.website} target="_blank" rel="noopener noreferrer">{designer.contact.website}</a></li>
          </ul>
          <img src={designer.image} alt={designer.name} className={styles.designerImage} />
        </div>
      )}
      <p><strong>Season:</strong> {collection.season} {collection.year}</p>
      <div className="controls">
        <button className="delete" onClick={deleteHandler}>
          Delete Collection
        </button>
        <Link className="edit-link" to={`/collections/edit/${collectionId}`}>
          Edit Collection
        </Link>
      </div>
      <h3>Items in this collection:</h3>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.itemId}>
              <Link to={`/items/${item.itemId}`} className={styles.itemLink}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p><strong>Price:</strong> ${item.price} {item.currency}</p>
                <p><strong>Sizes available:</strong> {item.sizes_available.join(", ")}</p>
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

export default CollectionPage;
