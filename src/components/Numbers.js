import Number from './Number'
const Numbers = ({onAdd}) => {
    return (
        <div className='numpad'>
            <Number number='1' letters='' onAdd={onAdd}/>
            <Number number='2' letters='ABC' onAdd={onAdd}/>
            <Number number='3' letters='DEF' onAdd={onAdd}/>
            <Number number='4' letters='GHI' onAdd={onAdd}/>
            <Number number='5' letters='JKL' onAdd={onAdd}/>
            <Number number='6' letters='MNO' onAdd={onAdd}/>
            <Number number='7' letters='PQRS' onAdd={onAdd}/>
            <Number number='8' letters='TUV' onAdd={onAdd}/>
            <Number number='9' letters='WXYZ' onAdd={onAdd}/>
            <Number number='*' letters='' onAdd={onAdd}/>
            <Number number='0' letters='+' onAdd={onAdd}/>
            <Number number='#' letters='' onAdd={onAdd}/>
        </div>
    )
}

export default Numbers