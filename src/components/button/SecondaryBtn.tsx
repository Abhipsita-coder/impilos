import { Button } from '@mui/material';
import './secondaryBtn.scss';
import './button.scss';
const SecondaryBtn = (props) => {
    const { btnText } = props;
    return (
        <Button variant="outlined" className='btn secondaryBtn'>
            {btnText}
        </Button>
    );
}

export default SecondaryBtn