import {lazy, FC} from 'react';
import './leftNav.scss'
const LeftNav = lazy(()=>import('./LeftNav'))

const RenderLeftNav = (Component:FC) => {
    const WithLeftNav = () => {
      return (
        <div id='leftNavHOC'>
            <LeftNav/>
            <Component/>
        </div>
      )
    }
    return WithLeftNav
}

export default RenderLeftNav