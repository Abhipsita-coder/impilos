import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import './login.scss';
import { useMsal  } from '@azure/msal-react';
import { useSelector, useDispatch } from'react-redux';
import {welcomeHeader, welcomeTextOne, welcomeTextTwo, signInText} from './loginConstants'
import impilosLogo from '../../assets/login/ImpilosLogo.svg'
import msLogo from '../../assets/login/msLogo.svg'
import adk from '../../assets/login/ADK.svg'
import PMPM from '../../assets/login/PMPM.svg'
import patient from '../../assets/login/Patient.svg'
import quote from '../../assets/login/Quote.svg'

const ScrollingImages = () => {
  const scrollingImages = [adk, PMPM, patient, quote]
  return (
    <div className="scroll-container">
      <div className="image-wrapper">
        {
          scrollingImages.map((image)=>{
            return(
              <img src={image} alt={image} />
            )
          })
        }
      </div>
    </div>
  );
};

const Login = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state:{userData: any}) => {
    return state?.userData?.user
   }
   );

   useEffect(()=>{
    if(userData?.id)
    navigate('/Home')
   }, [userData])
  

  useEffect(() => {
    if (accounts.length > 0) {
      dispatch({
        type: 'GET_USERS',
        value:accounts
      })
    }
}, [accounts]);

  return (
    <div id='loginWrapper'>
      <div id='mesh'>
        <ScrollingImages/>
      </div>
      <div id='welcomeSection'>
        <img src={impilosLogo} id='impilosLogo' alt="impilos logo" />
        <p id='welcomeHeader'>{welcomeHeader}</p>
        <p id='welcomeTextOne'>{welcomeTextOne}</p>
        <p id='welcomeTextTwo'>{welcomeTextTwo}</p>
        <button id='loginBtn' onClick={()=>{
          instance.loginRedirect()
        }} >
          <img src={msLogo} alt="" id='msLogo'/>
          <p id='signInText'>{signInText}</p>
        </button>
      </div>
    </div>
  )
}

export default Login