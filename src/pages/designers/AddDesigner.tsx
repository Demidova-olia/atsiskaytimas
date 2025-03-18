import React, { useState } from "react";
import { Designer } from "../../components/types";
import NavigationBar from "../../components/NavigationBar";
import DesignerForm from "../../components/forms/DesignerForm";

const AddDesigner: React.FC = () => {
  const [designer, setDesigner] = useState<Designer | null>(null);

  const handleSave = () => {
    setDesigner(null); 
    alert("Designer added successfully!");
  };

  return (
    <div>
      <NavigationBar/>
      <h1>Add New Designer</h1>
      <DesignerForm
        initialValues={designer}
        onSave={handleSave}   
      />
    </div>
  );
};

export default AddDesigner;

