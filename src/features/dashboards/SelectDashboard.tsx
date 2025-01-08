import { useState, useEffect } from 'react';
import './SelectDashboard.scss';
import { PrimaryBtn, SecondaryBtn } from '../../components/button';
import { Stepper, Step, StepLabel, TextField, MenuItem, Select, Divider } from '@mui/material';
import { Radio } from '@mui/joy';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client'
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
  const [authToken, setAuthToken] = useState('');
  const [workSpaceList, setWorkSpaceList] = useState();
  const [dbList, setDbList] = useState();
  const [selectedDashboardPreview, setSelectedDashboardPreview] = useState({});
  const [workspaceID, setWorkspaceID] = useState();


  useEffect(() => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "fccd352e-89dd-4097-aaf0-c2fd071f1afe");
    urlencoded.append("client_secret", "zEn8Q~A71572UOAZfC6BDD4pFHZhNmFIw-B_5dtV");
    urlencoded.append("scope", "https://analysis.windows.net/powerbi/api/.default");
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow"
    };

    fetch("https://login.microsoftonline.com/c3c43524-7c76-4490-aac4-7a82fa8e6496/oauth2/v2.0/token", requestOptions)
      .then((response) => response.json())
      .then((result) => setAuthToken(result.access_token))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (authToken) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + authToken);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch("https://api.powerbi.com/v1.0/myorg/groups", requestOptions)
        .then((response) => response.json())
        .then((result) => setWorkSpaceList(result.value))
        .catch((error) => console.error(error));
    }
  }, [authToken])

  const getDashboards = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + authToken);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch(`https://api.powerbi.com/v1.0/myorg/groups/${id}/reports`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDbList(result.value))
      .catch((error) => console.error(error));
  }

  const PowerBiPreview = () => {
    console.log('selectedDashboardPreview', selectedDashboardPreview);

    return (
      <PowerBIEmbed
        embedConfig={{
          type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          id: selectedDashboardPreview.id,
          embedUrl: selectedDashboardPreview.embedUrl,
          accessToken: authToken,
          tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false
              }
            },
            background: models.BackgroundType.Transparent,
          }
        }}

        eventHandlers={
          new Map([
            ['loaded', function () { console.log('Report loaded'); }],
            ['rendered', function () { console.log('Report rendered'); }],
            ['error', function (event) { console.log(event.detail); }],
            ['visualClicked', () => console.log('visual clicked')],
            ['pageChanged', (event) => console.log(event)],
          ])
        }

        cssClassName={"reportClass"}

        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport as Report;
        }}
      />
    )
  }

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
            <Select
              onChange={({ target: { value } }) => {
                getDashboards(value);
                setWorkspaceID(value)
              }}
              size='small'
            >
              {
                workSpaceList && workSpaceList.map((item) => {
                  return (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  )
                })
              }
            </Select>
          </div>
          <div>
            <p>Select Dashboard</p>
            <Select
              onChange={({ target: { value } }) => {
                setSelectedDashboardPreview(value);
              }}
              size='small'
            >
              {
                dbList && dbList.map((item) => {
                  return (
                    <MenuItem value={item}>{item.name}</MenuItem>
                  )
                })
              }
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
            />
          </div>
        </div>
      )}
      <Divider />
      {selectedDashboardPreview?.id ? <PowerBiPreview /> : ''}
    </div>
  );
};

export default SelectDashboard;
