
import React from "react";
import { useParams } from "react-router";
import ItemForm from "../../../components/forms/ItemForm";
import NavigationBar from "../../../components/NavigationBar";


const AddItem: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();

  if (!collectionId) {
    return <div>Error: Collection ID is missing</div>;
  }

  return (
    <div>
      <NavigationBar/>
      <h1>Add New Item to Collection {collectionId}</h1>
      <ItemForm collectionId={collectionId} />
    </div>
  );
};

export default AddItem;

