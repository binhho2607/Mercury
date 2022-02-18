import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const OpenNumpad = ({show, toggle}) => {


        return (
        <button className='closenumpadbtn' onClick={()=>toggle()}><MdKeyboardArrowDown size={35}/></button>
    )


}

export default OpenNumpad