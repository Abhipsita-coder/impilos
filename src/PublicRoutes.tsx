import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react'
const Login = lazy(()=>import('./features/login/Login.tsx'))
// const User = lazy(()=>import('./features/user/User.tsx'))
const Home = lazy(()=>import('./features/home/Home.tsx'))
const Dashboard = lazy(()=>import('./features/dashboards/Dashboard.tsx'))

const pages = [{
  path:'Home',
  component:Home
},{
  path:'Dashboards',
  component:Dashboard
},{
  path:'Favourites',
  component:Home
},{
  path:'Files',
  component:Home
},{
  path:'Datasets',
  component:Home
},{
  path:'User management',
  component:Home
},{
  path:'Help center',
  component:Home
}]

const PublicRoutes = () => (
    <Suspense fallback={<p>App Loading...</p>}>
    <Router>
      <Routes>
        <Route path="/" Component={Login}/>
        {
          pages.map(({path, component})=>{
            return(
              <Route path={path} Component={component}/>
            )
          })
        }
      </Routes>
    </Router>
    </Suspense>
)

export default PublicRoutes