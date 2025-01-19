import { TextInputProps } from "../constants/PropData/propData";


const Input = ({placeholder, style,onChange, value}:TextInputProps) => {
    return (
        <input placeholder={placeholder} style={style} value={value} onChange={onChange}/>
    );
}

export default Input;
