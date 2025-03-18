import OrderForm from "../../../components/forms/OrderForm"
import NavigationBar from "../../../components/NavigationBar"

const CreateOrder: React.FC = () => {
    return (
        <>
        <NavigationBar/>
        <h2> Create Order</h2>
        <OrderForm/>
        </>
    )
}
export default CreateOrder