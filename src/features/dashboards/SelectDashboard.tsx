import { useState, useEffect } from 'react';
import './SelectDashboard.scss';
import { PrimaryBtn, SecondaryBtn } from '../../components/button';
import { Stepper, Step, StepLabel, TextField, MenuItem, Select, Divider } from '@mui/material';
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

const StepperComponent = (props) => {
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

const SelectDashboard = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('Power BI');
  const [selectionProperty, setSelectionProperty] = useState({});

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "fpc=Ag5esgBLcqJKqdfb6i5_-gaXbNfiAQAAAH86DN8OAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd");
    myHeaders.append("Accept", "*/*");

    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "fccd352e-89dd-4097-aaf0-c2fd071f1afe");
    urlencoded.append("client_secret", "zEn8Q~A71572UOAZfC6BDD4pFHZhNmFIw-B_5dtV");
    urlencoded.append("scope", "https://analysis.windows.net/powerbi/api/.default");
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("https://login.microsoftonline.com/c3c43524-7c76-4490-aac4-7a82fa8e6496/oauth2/v2.0/token", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }, []);

  // const SelectPowerBiProperty = () => {
  //   return (
  //     <div className='selectPowerBiPropertyWrapper'>
  //       <div>
  //         <p>Workspace ID</p>
  //         <TextField onChange={({ target: { value } }) => {
  //           setSelectionProperty({ ...selectionProperty, workspaceId: value })
  //         }}
  //           size='small'
  //         />
  //       </div>
  //       <div>
  //         <p>Select Dashboard</p>
  //         <Select onChange={({ target: { value } }) => {
  //           setSelectionProperty({ ...selectionProperty, dashboard: value })
  //         }} size='small' >
  //           <MenuItem value={10}>Ten</MenuItem>
  //           <MenuItem value={20}>Twenty</MenuItem>
  //           <MenuItem value={30}>Thirty</MenuItem>
  //         </Select>
  //       </div>
  //     </div>
  //   )
  // }

  // const SelectTableauProperty = () => {
  //   return (

  //   )
  // }

  const DashboardType = () => {
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
            <Radio
              checked={text === selectedDashboard}
              onChange={() => setSelectedDashboard(text)}
            />
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
  return (
    <div className='selectDashbaordWrapper'>
      <Header />
      <StepperComponent />
      <DashboardType />
      {selectedDashboard === 'Power BI' ? (
        <div className='selectPowerBiPropertyWrapper'>
          <div>
            <p>Workspace ID</p>
            <TextField
              onChange={({ target: { value } }) => {
                setSelectionProperty({ ...selectionProperty, workspaceId: value });
              }}
              size='small'
            />
          </div>
          <div>
            <p>Select Dashboard</p>
            <Select
              onChange={({ target: { value } }) => {
                setSelectionProperty({ ...selectionProperty, dashboard: value });
              }}
              size='small'
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </div>
      ) : (
        <div className='selectPowerBiPropertyWrapper'>
          <div>
            <p>Tableau embedding code</p>
            <TextField
              key='random1'
              fullWidth
              size='small'
              onChange={({ target: { value } }) => {
                setSelectionProperty({ tableauEmbeddingCode: value });
              }}
              value={selectionProperty.tableauEmbeddingCode}
            />
          </div>
        </div>
      )}
      <Divider />
    </div>
  );
};

export default SelectDashboard;
