import React from 'react';
import './CatHeader.scss'
import {profileWrapper} from '../header/Header'

const CatHeader = ({activeCat}) => {
  console.log('activeCat activeCat activeCat', activeCat);
  
    const {name='', desc='', subCatName, subCatDesc} = activeCat
  return (
    <div className='catHeaderWrapper' >
        <div className='catHeaderWrap'>
            <p className='catName' >{name||subCatName}</p>
            <p className='catDesc' >{desc||subCatDesc}</p>
        </div>
        <div className='profileHeader'>{profileWrapper(60)}</div>
    </div>
  )
}

export default CatHeader