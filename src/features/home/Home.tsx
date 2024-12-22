import './home.scss'
import RenderLeftNav from '../leftNav/RenderLeftNav'
import Header from '../header/Header'
import GraphWrapper from './GraphWrapper'
export const Home = () => {
  return (
    <div id='homeWrapper'>
      <Header/>
      <GraphWrapper/>
    </div>
  )
}
export default RenderLeftNav(Home)