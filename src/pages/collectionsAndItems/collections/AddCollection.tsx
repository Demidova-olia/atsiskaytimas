import CollectionForm from "../../../components/forms/CollectionForm"
import NavigationBar from "../../../components/NavigationBar"

const AddCollection: React.FC = () => {
    return (
        <div>
            <NavigationBar/>
            <h1>Add New Collection</h1>
            <CollectionForm/>
        </div>
    )
}
export default AddCollection