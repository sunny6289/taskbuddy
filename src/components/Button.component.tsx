import {Button as MUIButton} from '@mui/material';
import { ButtonProps } from '../constants/PropData/propData';

const Button = ({variant, content, buttonStatus, startIcon, endIcon, style, onClick }:ButtonProps) => {
    return (
        <MUIButton disabled={buttonStatus} variant={variant} startIcon={startIcon} endIcon={endIcon} sx={style} onClick={onClick}>{content}</MUIButton>
    );
}

export default Button;
