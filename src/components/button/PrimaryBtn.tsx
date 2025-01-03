import { Button } from '@mui/material';
import './PrimaryBtn.scss';
import './button.scss';
const PrimaryBtn = (props) => {
    const { btnText } = props;
    return (
        <Button variant='contained' className='btn primaryBtn'>
            {btnText}
        </Button>
    );
};

export default PrimaryBtn;
