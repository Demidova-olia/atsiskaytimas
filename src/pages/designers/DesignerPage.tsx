import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from './DesignerPage.module.css';
import axios from "axios";
import { Designer } from "../../components/types";
import { ApiContext } from "../../contexts/ApiContext";
import { API_URL } from "../../../config";

const DesignerPage: React.FC = () => {
    const { designerId } = useParams<{ designerId: string }>();
    const [designer, setDesigner] = useState<Designer | null>(null);
    const navigate = useNavigate();
    const { designers, collections, loading, error } = useContext(ApiContext) || {};

    useEffect(() => {
        if (!designers || !collections) return;

        const selectedDesigner = designers.find((designer: Designer) => designer.id === designerId);
        if (selectedDesigner) {
            setDesigner(selectedDesigner);
        }
    }, [designerId, designers, collections]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!designer) {
        return <p>Designer not found.</p>;
    }

    const designerCollections = collections!.filter((collection) => collection.designerId === designerId);

    const deleteHandler = async () => {
        try {
            await axios.delete(`${API_URL}/designers/${designer.id}`);
            navigate("/designers");
        } catch (error) {
            console.error("Error deleting designer:", error);
            alert("Failed to delete the designer");
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Designer: {designer.name}</h1>
            <div className={styles.designerInfo}>
                <img src={designer.image} alt={designer.name} className={styles.designerImage} />
                <p><strong>Bio:</strong> {designer.bio}</p>
                <p><strong>Country:</strong> {designer.country}</p>
                <p><strong>Contact:</strong></p>
                <ul>
                    <li>Email: <a href={`mailto:${designer.contact.email}`}>{designer.contact.email}</a></li>
                    <li>Phone: <a href={`tel:${designer.contact.phone}`}>{designer.contact.phone}</a></li>
                    <li>Website: <a href={designer.contact.website} target="_blank" rel="noopener noreferrer">{designer.contact.website}</a></li>
                </ul>
                
            </div>

            <div className={styles.collections}>
                <h2>Collections:</h2>
                {designerCollections.length > 0 ? (
                    <ul>
                        {designerCollections.map((collection) => (
                            <li key={collection.collectionId}>
                                <Link to={`/collections/${collection.collectionId}`} className={styles.collectionLink}>
                                    {collection.name} ({collection.season} {collection.year})
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No collections available.</p>
                )}
            </div>

            <div className={styles.controls}>
                <button className={styles.delete} onClick={deleteHandler}>
                    Delete Designer
                </button>
                <Link className={styles.editLink} to={`/designers/edit/${designer.id}`}>
                    Edit Designer information
                </Link>
            </div>
        </div>
    );
};

export default DesignerPage;
