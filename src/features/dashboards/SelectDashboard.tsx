
import './SelectDashboard.scss'
import { PrimaryBtn, SecondaryBtn } from '../../components/button';

const Header = () => {
    const BackNextBtn = () => {
        return (
            <div className='backNextBtnWrapper'>
                <SecondaryBtn btnText={'Cancel'} />
                <PrimaryBtn btnText={'Next'} />
            </div>
        )
    }
    return (
        <div className='headerWrapper'>
            <p className='createDBText'>Create Dashboard</p>
            <BackNextBtn />
        </div>
    )
}

const SelectDashboard = () => {
    return (
        <div className='selectDashbaordWrapper'><Header /></div>
    )
}

export default SelectDashboard