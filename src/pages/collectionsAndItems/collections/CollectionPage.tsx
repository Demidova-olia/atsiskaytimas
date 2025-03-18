import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from './CollectionPage.module.css';
import axios from "axios";
import { Collection } from "../../../components/types";
import { ApiContext } from "../../../contexts/ApiContext";
import { API_URL } from "../../../../config";
import NavigationBar from "../../../components/NavigationBar";

const CollectionPage: React.FC = () => {
    const { collectionId } = useParams<{ collectionId: string }>();
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const navigate = useNavigate();
    const { collections, items, designers, loading, error } = useContext(ApiContext) || {};

    useEffect(() => {
        if (!collections || !items) return;

        const collection = collections.find((coll: Collection) => coll.collectionId === collectionId);
        if (collection) {
            setSelectedCollection(collection);
        }
    }, [collectionId, collections, items]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!selectedCollection) {
        return <p>Collection not found.</p>;
    }

    const collectionItems = items!.filter((item) => item.collectionId === collectionId);

    const deleteHandler = async () => {
        try {
            await axios.delete(`${API_URL}/collections/${selectedCollection.collectionId}`);
            navigate("/collections");
        } catch (error) {
            console.error("Error deleting collection:", error);
            alert("Failed to delete the collection");
        }
    };

    const designer = designers?.find((designer) => designer.id === selectedCollection.designerId);

    return (
        <div className={styles.pageContainer}>
            <NavigationBar/>
            <h1>Collection: {selectedCollection.name}</h1>
            <div className={styles.collectionInfo}>
                <h3>{selectedCollection.name} ({selectedCollection.season} {selectedCollection.year})</h3>

                <p><strong>Designer:</strong> 
                    {designer ? (
                        <Link to={`/designers/${designer.id}`} className={styles.designerLink}>
                            {designer.name}
                        </Link>
                    ) : (
                        "Designer not found"
                    )}
                </p>
            </div>

            <div className={styles.items}>
                <h2>Items:</h2>
                {collectionItems.length > 0 ? (
                    <ul>
                        {collectionItems.map((item) => (
                            <li key={item.itemId} className={styles.item}>
                                <Link to={`/items/${item.itemId}`} className={styles.itemLink}>
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
                    <p>No items available in this collection.</p>
                )}
            </div>

            <div className={styles.controls}>
                <button className={styles.delete} onClick={deleteHandler}>
                    Delete Collection
                </button>
                <Link className={styles.editLink} to={`/collections/edit/${collectionId}`}>
                    Edit Collection
                </Link>
            </div>
        </div>
    );
};

export default CollectionPage;
