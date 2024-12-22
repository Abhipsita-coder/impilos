import {lazy, Suspense, useState, useEffect} from 'react'
import {Modal, Box, TextField } from '@mui/material';
import {Input, Button } from '@mui/joy';
import RenderLeftNav from "../leftNav/RenderLeftNav"
import Header from '../header/Header'
import './dashboard.scss'
import addNotes from '../../assets/dashboard/AddNotes.svg'
import addTask from '../../assets/dashboard/addTask.svg'

const DashboardNavHOC = lazy(()=>import('./DashboardNavHOC'));
const CatHeader = lazy(()=>import('./CatHeader'))

const style = {
  width: 300,
  bgcolor: '#fff',
  boxShadow: 24,
  p:25,
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [categories, setCategories] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [activeSubIndex, setActiveSubIndex] = useState(-1)
  const [subCatName, setSubCatName] = useState('')
  const [subCatDesc, setSubCatDesc] = useState('')

  const handleClose = () => {
    setActiveIndex(categories[categories.length-1])
    setOpen(false)
  }

  const handleOpen = (index:any, type:string) =>{
    if(type==='Delete'){
      categories.splice(index,1)
      setCategories([
        ...categories
      ])
    } else{
    setEditIndex(index)
    setOpen(true);
    }
  } 

  useEffect(()=>{
    console.log('category', categories);
    
  }, [categories])

  const CatBody = ({imgSrc, altText, bodyHeader, bodyDesc, onClick, btntext}) => {
    return(
      <div className='bodyWrapper'>
        <img src={imgSrc} alt={altText} className='addNotesLogo' />
        <p className='createCategoryNotes'>{bodyHeader}</p>
        <p className='createCategoryNotesDesc'>{bodyDesc}</p>
        <button className='addCatBtn' onClick={onClick} >+ {btntext} </button>
      </div>
    )
  }

  const create = () => {
    if(activeIndex===-1||editIndex>-1){
    if(Number.isInteger(editIndex)){
      categories[editIndex].name = name
      categories[editIndex].desc = desc
      setCategories(categories)
    } else{
    setCategories([
      ...categories,
      {
        name,
        desc,
        subCat:[]
      }
    ])
  }
  setName('')
  setDesc('')
  handleClose()
} else{
  const subCat = categories[activeIndex].subCat
  subCat.push({
    subCatName,
    subCatDesc
  })
  categories[activeIndex].subCat = subCat
  setCategories([...categories])
  setSubCatName('')
  setSubCatDesc('')
  setActiveIndex(-1)
  handleClose()
}
}

  const addCategory = () => {
    return <div className='modelContent'>
      <p className='catHeader'>{activeIndex===-1||editIndex>-1?'Create Category':`Create Sub-Category for ${categories[activeIndex]?.name}`}</p>
      <p className='inputLabel'>Name</p>
      <Input className='nameInput' placeholder={`Enter ${activeIndex===-1||editIndex>-1?'category':'sub-category'} name`} variant="outlined" onChange={({target:{value}})=>{
        if(activeIndex===-1||editIndex>-1){
          setName(value)
        } else{
          setSubCatName(value)
        }
      }} value={activeIndex===-1||editIndex>-1?name:subCatName} />
      <p className='inputLabel'>Description</p>
      <TextField className='descInput' maxRows={4} multiline placeholder={`Enter ${activeIndex===-1||editIndex>-1?'category':'sub-category'} description`} onChange={({target:{value}})=>{
        if(activeIndex===-1||editIndex>-1){
        setDesc(value)
        } else{
          setSubCatDesc(value)
        }
        }} value={activeIndex===-1||editIndex>-1?desc:subCatDesc} />
      <div className='catBtnWrapper' >
      <Button variant="outlined" className='btn' onClick={handleClose} >Cancel</Button>
      <Button className='btn' onClick={()=>{
        create()
      }} >Create</Button>
      </div>
    </div>
  }
  
  return (
    <Suspense fallback={<p>Dashboard loading...</p>} >
    <div className="dashboardWrapper">
      <DashboardNavHOC categories={categories} handleOpen={handleOpen} setName={setName} setDesc={setDesc} setActiveIndex={setActiveIndex} activeIndex={activeIndex} activeSubIndex={activeSubIndex} setActiveSubIndex={setActiveSubIndex}/>
      {activeIndex===-1?<div className='dashboardBody' >
      <Header width={'88%'} />
      <CatBody imgSrc={addNotes} altText={'add notes logo'} bodyHeader={'Get Started by Creating a Category!'} bodyDesc={'Organize and view your dashboards effortlessly, and uncover valuable insights at a glance.'} onClick={handleOpen} btntext={'Category'}/>
      </div>:<div className='dashboardBody'>
        <CatHeader activeCat={ activeIndex===-1? categories[activeIndex]:categories[activeIndex].subCat[activeSubIndex]} />
        {
          (activeSubIndex>-1)?<CatBody imgSrc={addNotes} altText={'add notes logo'} bodyHeader={'Get Started by Creating a Category!'} bodyDesc={'Organize and view your dashboards effortlessly, and uncover valuable insights at a glance.'} onClick={handleOpen} btntext={'Dashboard'}/>:<CatBody imgSrc={addTask} altText={'add task logo'} bodyHeader={'Create a Sub-Category or Dashboard!'} bodyDesc={'Organize your dashboards by creating a sub-category or directly adding dashboards. Start building a clear path to insights.'} onClick={handleOpen} btntext={'Sub-Category'}/>
        }
        
        </div>}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className='modelBox'>
          {addCategory()}
        </Box> 
      </Modal>
    </div>
    </Suspense>
  )
}

export default RenderLeftNav(Dashboard)