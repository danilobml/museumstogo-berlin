import MuseumsInput from "./MuseumsInput";
const InputForm = (props) => {
    console.log(props);
    return (
        <form className="input-form">
            <input type="text" className="international" placeholder="Add international museum"></input>
            <input type="submit" value="+"></input>
            <br />
            <MuseumsInput museumList={props.museumList}/>
        </form>
    )    
}

export default InputForm;