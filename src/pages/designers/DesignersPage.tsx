import { useEffect, useState } from "react"
import { API_URL } from '../../../config'
import { Link } from "react-router"
import { Designer } from "../../components/types"

const DesignersPage: React.FC = () => {
    const [designers, setDesigners] = useState<Designer []>([])
    
    useEffect(() => {
        const fetchDesigners = async () => {
          const res = await fetch(`${API_URL}/Designers`)
          const data: Designer[] = await res.json()  
          setDesigners(data)
        }
        fetchDesigners()
    },[])
return(
    <div>
        <h1>Designers:</h1>
        <Link to= '/designers/create'>Add New Designer</Link>
        {designers.length > 0 && (
        <ul>
            {designers.map((designer: Designer) =>

            (
            <li key={designer.designer_id}>
                <Link to= {`/Designers/${designer.designer_id}`}>
                <div>
                    <img src={designer.image} alt={designer.name} />
                </div>
                {designer.designer_id}. {designer.name}</Link>
                {/* <Link to= {`/Designers/${Designer.id}`}></Link> */}
            </li>
            )
            )}
        </ul>)}
    </div>
)
}
export default DesignersPage