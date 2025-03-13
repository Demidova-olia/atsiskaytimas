import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Collection, Item, Designer } from "../../components/types";
import { API_URL } from "../../../config";
import styles from './CollectionPage.module.css';
import axios from "axios";

const CollectionPage: React.FC = () => {
    const { collectionId } = useParams<{ collectionId: string }>();
    const [collection, setCollection] = useState<Collection | null>(null);
    const [designer, setDesigner] = useState<Designer | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const apiContext = useContext(ApiContext);

    useEffect(() => {
        const fetchCollectionData = async () => {
            try {
                if (apiContext) {
                    const collectionData = apiContext.collections.find(
                        (col) => col.collection_id === collectionId
                    );

                    if (collectionData) {
                        setCollection(collectionData);
                        setItems(
                            apiContext.items.filter(
                                (item) => item.collection_id === collectionId
                            )
                        );

                        const designerData = apiContext.designers.find(
                            (designer) => designer.designer_id === collectionData.designer_id
                        );
                        setDesigner(designerData || null);
                    } else {
                        throw new Error("Collection not found");
                    }
                }
            } catch (error) {
                setError("Error fetching collection data");
                console.error("Error fetching collection:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionData();
    }, [collectionId, apiContext]);

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
            await axios.delete(`${API_URL}/collections/${collectionId}`);
            navigate("/collections");
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
                        <li key={item.item_id}>
                            <Link to={`/items/${item.item_id}`} className={styles.itemLink}>
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
