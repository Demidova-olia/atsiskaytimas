import React, { useContext } from "react";
import { useParams, Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Designer } from "../../components/types";
import styles from './DesignersPage.module.css';

const DesignerPage: React.FC = () => {
  const apiContext = useContext(ApiContext);
  const { designerId } = useParams<{ designerId: string }>();

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { designers = [], collections = [], loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const designer = designers.find((d: Designer) => d.designer_id === designerId);

  if (!designer) {
    return <p>Designer not found.</p>;
  }

  const getCollectionById = (collectionId: string) => {
    return collections.find((collection) => collection.collection_id === collectionId);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>{designer.name}</h1>
      <img 
        src={designer.image || '/path/to/fallback-image.jpg'}
        alt={designer.name} 
        className={styles.designerImage} 
      />
      <p><strong>Bio:</strong> {designer.bio}</p>
      <p><strong>Country:</strong> {designer.country}</p>
      <p><strong>Contact:</strong> <a href={`mailto:${designer.contact.email}`}>{designer.contact.email}</a></p>
      <p><strong>Website:</strong> <a href={designer.contact.website} target="_blank" rel="noopener noreferrer">{designer.contact.website}</a></p>

      <div className={styles.collections}>
        <h4>
          {designer.collections.length === 0
            ? "No collections yet"
            : designer.collections.length === 1
            ? "Collection:"
            : "Collections:"}
        </h4>
        <ul>
          {designer.collections.map((collection) => {

            const collectionData = getCollectionById(collection.collection_id);
            return collectionData ? (
              <li key={collectionData.collection_id}>
                <Link to={`/collections/${collectionData.collection_id}`} className={styles.collectionLink}>
                  {collectionData.name} ({collectionData.season} {collectionData.year})
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DesignerPage;

