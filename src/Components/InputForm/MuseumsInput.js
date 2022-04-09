const MuseumsInput = (props) => {
    return (
        <>
        <label for="list-museum">Or choose from a list of museums in Berlin:</label>
        <br />
        <input list="museums" name="list-museum" id="list-museum"></input>
        <datalist id="museums" name="museums">
            {props.museumList.map(museum => 
            <option key= {museum} value={museum}>{museum}</option>)}
        </datalist>
        </>
    )
}

export default MuseumsInput;