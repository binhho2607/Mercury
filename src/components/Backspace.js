import { RiDeleteBack2Fill } from "react-icons/ri";

const Backspace = ({onBack}) => {
    return (
        <button className='backspace' onClick={()=>onBack()}><RiDeleteBack2Fill size={30}/></button>
    )
}

export default Backspace