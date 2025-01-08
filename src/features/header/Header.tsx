import { FC } from 'react';
import { useMsal } from '@azure/msal-react';
import notifIcon from '../../assets/home/notif.svg'
import profileExpand from '../../assets/home/profileExpand.svg'
import styled from 'styled-components'
import headerImg from '../../assets/home/homeHerader.svg'
import './header.scss'

export const HeaderImg = styled.div<{ width: string }>`
    background-image: url(${headerImg});
    height: 130px;
    width: ${props => props.width || '88%'};
    border-radius: 25px;
    border: 1px solid #E0E0E0;
    margin-top: 20px;
    background-repeat: no-repeat;
    padding:0px 20px;
    display: flex;
    justify-content:space-between;
    background-position: 15% 29%;
`

const getName = (firstName: string, surnameFirstChar: string, shortenName: boolean): string => {
  const name = shortenName ? firstName.split('')[0] : firstName
  if (firstName && surnameFirstChar) {
    return name + surnameFirstChar
  } else if (firstName) {
    return name
  } else {
    return surnameFirstChar
  }
}

interface ProfileWrapper {
  width: number
}

export const ProfileWrapper: FC<ProfileWrapper> = (props): JSX.Element => {
  const { width } = props
  const { accounts } = useMsal();
  const firstName = (accounts?.length && accounts[0]?.name) ? accounts[0]?.name.split(' ')[0] : '';
  const surnameFirstChar = (accounts?.length && accounts[0]?.name) ? accounts[0]?.name.split(' ')[1].split('')[0] : ''
  return (
    <div className='profile' style={{
      width: `${width}%`
    }} >
      <img src={notifIcon} alt="" />
      <div className='profileWrapper'>
        {(firstName || surnameFirstChar) ?
          <div className='profileTextWrapper'>
            <p className='shortName'>{getName(firstName, surnameFirstChar, true)}</p>
          </div> : ''}
        <div>
          {
            (firstName || surnameFirstChar) ? <p className='fullName' >{getName(firstName, surnameFirstChar, false)}</p> : ''}
          <p className='role'>Admin</p>
        </div>
        <img src={profileExpand} alt="" />
      </div>
    </div>
  )
}

interface HeaderProps {
  width: number
}

const Header: FC<HeaderProps> = (prop) => {
  const { width } = prop
  const { accounts } = useMsal();
  const firstName = (accounts?.length && accounts[0]?.name) ? accounts[0]?.name.split(' ')[0] : '';

  return (
    <HeaderImg width={`${width}%`}>
      <div>
        <p className='welcomeText' >{`Welcome to Impilos${firstName ? `, ${firstName}` : ''}!`}</p>
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
      {<ProfileWrapper width={23} />}
    </HeaderImg>
  )
}

export default Header