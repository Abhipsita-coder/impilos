import { useState } from 'react';
import './SelectDashboard.scss';
import { PrimaryBtn, SecondaryBtn } from '../../components/button';
import { Stepper, Step, StepLabel } from '@mui/material';
import { Radio } from '@mui/joy';
import PowerBiIcon from '../../assets/dashboard/powerBiIcon.svg';
import TableauIcon from '../../assets/dashboard/tableauIcon.svg';

const Header = () => {
  const BackNextBtn = () => {
    return (
      <div className='backNextBtnWrapper'>
        <SecondaryBtn btnText={'Cancel'} />
        <PrimaryBtn btnText={'Next'} />
      </div>
    );
  };
  return (
    <div className='headerWrapper'>
      <p className='createDBText'>Create Dashboard</p>
      <BackNextBtn />
    </div>
  );
};

const StepperComponent = () => {
  const steps = ['Dashboard selection', 'Dashboard details', 'Access permission'];
  return (
    <Stepper
      alternativeLabel
      className='stepWrapper'
      sx={{
        minWidth: '100%',
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const DashboardType = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('Power BI');

  const Dashboard = (props) => {
    const { text, image } = props;
    return (
      <div
        className={
          text === selectedDashboard
            ? 'selectedDashboardTypeWrapper dashboardTypeWrapper'
            : 'dashboardTypeWrapper'
        }
      >
        <div className='dashboardTypeText'>
          <Radio checked={text === selectedDashboard} onClick={() => setSelectedDashboard(text)} />
          <p>{text}</p>
        </div>
        <div>
          <img src={image} />
        </div>
      </div>
    );
  };
  return (
    <div className='dashBoardWrapper'>
      <Dashboard text={'Power BI'} image={PowerBiIcon} />
      <Dashboard text={'Tableau'} image={TableauIcon} />
    </div>
  );
};

const SelectDashboard = () => {
  return (
    <div className='selectDashbaordWrapper'>
      <Header />
      <StepperComponent />
      <DashboardType />
    </div>
  );
};

export default SelectDashboard;
