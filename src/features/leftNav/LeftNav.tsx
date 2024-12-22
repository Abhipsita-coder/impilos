import {useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import './leftNav.scss';
import homeIcon from '../../assets/leftNav/home.svg'
import dashboardIcon from '../../assets/leftNav/dashboard.svg'
import favIcon from '../../assets/leftNav/fav.svg'
import fileIcon from '../../assets/leftNav/file.svg'
import datasetIcon from '../../assets/leftNav/db.svg'
import userIcon from '../../assets/leftNav/user.svg'
import helpCenterIcon from '../../assets/leftNav/help.svg'
import shrinkIcon from '../../assets/leftNav/shrink.svg'
import expandIcon from '../../assets/leftNav/expand.svg'
import impilosLogo from '../../assets/leftNav/ImpilosLogo.svg'
import impilosLogoShrinked from '../../assets/leftNav/impilosShrinked.svg'

const pages = [{
  name:'Home',
  icon:homeIcon
},{
  name:'Dashboards',
  icon:dashboardIcon
},{
  name:'Favourites',
  icon:favIcon
},{
  name:'Files',
  icon:fileIcon
},{
  name:'Datasets',
  icon:datasetIcon
},{
  name:'User management',
  icon:userIcon
},{
  name:'Help center',
  icon:helpCenterIcon
}]

const LeftNav = () => {
  const [activePage, setActivePage] = useState('Home')
  const [expand, setExpand] = useState(true)
  const navigate = useNavigate();
  return (
    <div className={expand&&activePage!=='Dashboards'?'leftNavWrapper':'leftNavWrapper leftNavWrapperShrinked'}>
        <img src={expand&&activePage!=='Dashboards'?impilosLogo:impilosLogoShrinked} alt="impilos Logo" className='leftNavContent'/>
      <div style={{
        marginTop:'20px'
      }}>
        {pages.map(({name,icon})=>{
          return(
           <div className={name===activePage ?`${expand&&activePage!=='Dashboards'?'leftNavContent activeTab':'leftNavContent activeTab activeTabShrinked'}`:'leftNavContent'} onClick={()=>{
            navigate(`/${name}`);
            setActivePage(name);
            }} >
            <img src={icon} alt="impilos Logo" id='leftNavPageIcon' />
        <p className={expand&&activePage!=='Dashboards'?'leftNavPageTitle':'hide'}>{name}</p>
           </div>
          )
        })}
      <img src={expand&&activePage!=='Dashboards'?shrinkIcon:expandIcon} alt="" className='leftNavSize' onClick={()=>setExpand(!expand)} />
      </div>
    </div>
  )
}

export default LeftNav