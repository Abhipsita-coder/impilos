import React from 'react';
import './CatHeader.scss'
import {ProfileWrapper} from '../header/Header'

const CatHeader = (props) => {
  const { activeCat: { 
    name = '',
    desc = '',
    subCatName,
    subCatDesc
  } } = props
  return (
    <div className='catHeaderWrapper' >
        <div className='catHeaderWrap'>
            <p className='catName' >{name||subCatName}</p>
            <p className='catDesc' >{desc||subCatDesc}</p>
        </div>
      <div className='profileHeader'>{<ProfileWrapper width={ 60} />}</div>
    </div>
  )
}

export default CatHeader