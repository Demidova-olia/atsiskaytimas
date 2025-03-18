import React, { useContext } from 'react';
import { Link } from 'react-router';
import { ApiContext } from '../../contexts/ApiContext';
import { Designer, Collection, Item } from '../../components/types';
import styles from './DesignersPage.module.css';
import NavigationBar from '../../components/NavigationBar';

const DesignersPage: React.FC = () => {
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { designers, collections, items, loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const getCollectionsByDesignerId = (designerId: string) => {
    return collections.filter(collection => collection.designerId === designerId);
  };

  const getItemsByCollectionId = (collectionId: string) => {
    return items.filter(item => item.collectionId === collectionId);
  };

  return (
    <div className={styles.pageContainer}>
      <NavigationBar/>
      <h1 className={styles.header}>Designers:</h1>
      <Link to="/designers/create" className={styles.addDesignerLink}>Add New Designer</Link>
      {designers.length > 0 ? (
        <ul className={styles.designerList}>
          {designers.map((designer: Designer) => (
            <li key={designer.id} className={styles.designerItem}>
              <Link to={`/designers/${designer.id}`} className={styles.designerLink}>
                <div>
                  <img src={designer.image} alt={designer.name} className={styles.designerImage} />
                </div>
                {designer.id}. {designer.name}
              </Link>

              <div className={styles.collections}>
                <h4>
                  {getCollectionsByDesignerId(designer.id).length === 0
                    ? "No collections yet   "
                    : getCollectionsByDesignerId(designer.id).length === 1
                    ? "Collection:  "
                    : "Collections:  "}
                    <Link to='/collections/create' className={styles.addDesignerLink}>Add Collection</Link>
                </h4>
                <ul>
                  {getCollectionsByDesignerId(designer.id).map((collection: Collection) => (
                    <li key={collection.collectionId}>
                      <Link to={`/collections/${collection.collectionId}`} className={styles.collectionLink}>
                        {collection.name} ({collection.season} {collection.year})
                      </Link>

                      <ul>
                        {getItemsByCollectionId(collection.collectionId).map((item: Item) => (
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
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noDesigners}>No designers found.</p>
      )}
    </div>
  );
};

export default DesignersPage;

