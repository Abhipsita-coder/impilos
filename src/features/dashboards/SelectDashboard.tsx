import { useState, useEffect } from 'react';

declare global {
  interface Window {
    report: Report;
  }
}
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

const SelectDashboard = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('Power BI');
  const [workSpaceList, setWorkSpaceList] = useState();
  const [dbList, setDbList] = useState();
  const [workspaceID, setWorkspaceID] = useState<string | undefined>('');
  const [powerBiCredentials, setPowerBiCredentials] = useState<{ embedToken: string, embedUrl: string, reportId: string }>({
    embedToken: '',
    embedUrl: '',
    reportId: ''
  })
  function resizeIFrameToFitContent(iFrame:HTMLIFrameElement) {
    iFrame.width = '100%';
    iFrame.height = '700px';
  }


  useEffect(() => {
    fetch("http://localhost:8000/api/workspaces")
      .then((response) => response.json())
      .then((result) => {
        setWorkSpaceList(result)
      })
      .catch((error) => console.error(error));
  }, []);

  const getDashboards = (id:string) => {
    fetch(`http://localhost:8000/api/reports/${id}`)
      .then((response) => response.json())
      .then((result) => setDbList(result))
      .catch((error) => console.error(error));
  }

  const PowerBiPreview = () => {
    return (
      <PowerBIEmbed
        cssClassName='powerBiPreview'
        embedConfig={{
          type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          accessToken: powerBiCredentials.embedToken,
          embedUrl: powerBiCredentials.embedUrl,
          id: powerBiCredentials.reportId,
          tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
        }}

        eventHandlers={
          new Map([
            ['loaded', function () {
              const iframes = document.querySelectorAll("iframe");
                for (let i = 0; i < iframes.length; i++) {
                  resizeIFrameToFitContent(iframes[i]);
                  iframes[i].attributes.removeNamedItem("style");
                }
            }],
            // ['rendered', function () { console.log('Report rendered'); }],
            // ['error', function (event) { console.log(event.detail); }],
            // ['visualClicked', () => console.log('visual clicked')],
            // ['pageChanged', (event) => console.log(event)],
          ])
        }

        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport as unknown as Report;
        }}
      />
    )
  }

  const getPowerBiCredentials = (dashboardID: string) => {
    fetch(`http://localhost:8000/api/get-embed-config/${workspaceID}/${dashboardID}`)
      .then((response) => response.json())
      .then((result) => setPowerBiCredentials(result))
      .catch((error) => console.error(error));
  }

  const DashboardType = () => {
    interface DashboardProps {
      text: string;
      image: string;
    }

    const Dashboard = (props: DashboardProps) => {
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
                getDashboards(value as string);
                setWorkspaceID(value as string)
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
                getPowerBiCredentials(value.id)
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
      
        {powerBiCredentials?.embedToken ? <PowerBiPreview /> : ''}
    </div>
  );
};

export default SelectDashboard;
