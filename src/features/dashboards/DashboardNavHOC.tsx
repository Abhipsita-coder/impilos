
import './dashboardNav.scss'
import dashboardNav from '../../assets/dashboard/dashboardNav.svg'
import addCategoryBtn from '../../assets/dashboard/addCat.svg'
import DotMenu from './DotMenu'
const DashboardNavHOC = ({categories, handleOpen, setName, setDesc, setActiveIndex, activeIndex, activeSubIndex, setActiveSubIndex}) => {
  const renderCategories = () => {
    return(
      categories.length?
      categories.map((category:object, index:number)=>{
        return(
          <div>
          <div className='catWrapper' style={{
            backgroundColor:`${index===activeIndex && activeSubIndex===-1?'#DBF1FD':''}`
          }} onClick={()=>{
            setActiveSubIndex(-1)
            setActiveIndex(index)
            }} >
           <p>{category.name}</p>
           <DotMenu category={category} index={index} setName={setName} setDesc={setDesc} handleOpen={handleOpen}/>
          </div>
          {
            category?.subCat?.map(({subCatName}, ind)=>{
              return(
                <div
                className='catWrapper'
                onClick={()=>{
                  setActiveSubIndex(ind)
                  setActiveIndex(index)
                }}
                style={{
                  backgroundColor:`${ind===activeSubIndex?'#DBF1FD':''}`
                }}
                >
                  <p style={{
                    marginLeft:'15px'
                  }} >{subCatName}</p>
                  <DotMenu />
                </div>
              )
            })
          }
          </div>
        )
      })
      : <div className='emptyCatWrapper' > <p className='noCat'>No Categories added yet</p></div>
    )
  }
  return (
    <div className='dashboardNavWrapper'>
        <div className='dashboardHeader' >
            <img src={dashboardNav} alt="dashboardNav Icon" className='dashboardNavIcon' />
            <p className='dashboardText' >Dashboards</p>
        </div>
        <div className='addCategoryHeader'>
        <p className='categoryText' >Category</p>
        <img src={addCategoryBtn} alt="dashboardNav Icon" onClick={()=>{
          handleOpen()
        }} />
        </div>
        
          {renderCategories()}
    </div>
  )
}

export default DashboardNavHOC