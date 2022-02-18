
const EntryField = ({numbers, noborder, small}) => {
    let name = ""
    noborder ? ( small ? name = "entryfield_noborder_small" : name="entryfield_noborder") : name = "entryfield"
    return (
            <div className={name} >
                {numbers}
            </div>

    )
}

export default EntryField