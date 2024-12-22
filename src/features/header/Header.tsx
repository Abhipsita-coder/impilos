
import { useMsal  } from '@azure/msal-react';
import notifIcon from '../../assets/home/notif.svg'
import profileExpand from '../../assets/home/profileExpand.svg'
import styled from 'styled-components'
import headerImg from '../../assets/home/homeHerader.svg'
import './header.scss'

export const HeaderImg = styled.div<{width: string}>`
    background-image: url(${headerImg});
    height: 130px;
    width: ${props => props.width||'88%'};
    border-radius: 25px;
    border: 1px solid #E0E0E0;
    margin-top: 20px;
    background-repeat: no-repeat;
    padding:0px 20px;
    display: flex;
    justify-content:space-between;
    background-position: 15% 29%;
`

export const profileWrapper = (width: number) => {
  const { accounts } = useMsal();
  const firstName = accounts[0]?.name.split(' ')[0];
  const surnameFirstChar = accounts[0]?.name.split(' ')[1].split('')[0]
  return(
    <div className='profile' style={{
      width:`${width}%`
    }} >
    <img src={notifIcon} alt="" />
    <div className='profileWrapper'>
      <div className='profileTextWrapper'>
        <p className='shortName'>SW</p>
      </div>
      <div>
      <p className='fullName' >{firstName+' '+surnameFirstChar||'Raj M.'}</p>
      <p className='role'>Admin</p>
      </div>
      <img src={profileExpand} alt="" />
    </div>
  </div>
  )
}

const Header = ({width}) => {
  const { accounts } = useMsal();
  const firstName = accounts[0]?.name.split(' ')[0];
   
  return (
    <HeaderImg width={width}>
    <div>
    <p className='welcomeText' >{`Welcome to Impilos, ${ firstName|| 'Raj'}!`}</p>
    <div className='notifWrapper'>
    <p>You got</p>
    <p className='notif'>2 new</p>
    <p>notifications</p>
    </div>
    <div className='notifWrapper lastPage'>
    <p>Last viewed dashboard - </p>
    <p className='notif'>{'Revenue > Risk score > Recapture Dashboard'}</p>
    </div>
  </div>
  {profileWrapper()}
  </HeaderImg>
  )
}

export default Header