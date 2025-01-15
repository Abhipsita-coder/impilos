import { lazy, Suspense, useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import { Input, Button } from '@mui/joy';
import RenderLeftNav from '../leftNav/RenderLeftNav';
import Header from '../header/Header';
import './dashboard.scss';
import addNotes from '../../assets/dashboard/AddNotes.svg';
import addTask from '../../assets/dashboard/addTask.svg';
import DashboardNavHOC from './DashboardNavHOC';
import { CREATE_CATEGORY_HEADER, CREATE_CATEGORY_BODY, CREATE_SUB_CATEGORY_HEADER, CREATE_SUB_CATEGORY_BODY, CREATE_DASHBOARD_HEADER, CREATE_DASHBOARD_BODY } from './dashboardConstants'

const CatHeader = lazy(() => import('./CatHeader'));
const SelectDashboard = lazy(() => import('./SelectDashboard'));

const style = {
  width: 300,
  bgcolor: '#fff',
  boxShadow: 24,
  p: 25,
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [model, setModel] = useState('category');
  const [subCatName, setSubCatName] = useState('');
  const [subCatDesc, setSubCatDesc] = useState('');
  const [isCreateDashboard, setIsCreateDashboard] = useState(false);

  const handleClose = () => {
    // setActiveIndex(categories[categories.length-1])
    setOpen(false);
  };

  const handleOpen = (index, type) => {
    if (Number.isInteger(index)) {
      setEditIndex(index);
    } else {
      setEditIndex(-1);
    }
    if (type === 'Delete') {
      categories.splice(index, 1);
      setCategories([...categories]);
    } else {
      setOpen(true);
    }
  };

  const CatBody = ({ imgSrc, altText, bodyHeader, bodyDesc, onClick, btntext }) => {
    return (
      <div className='bodyWrapper'>
        <img src={imgSrc} alt={altText} className='addNotesLogo' />
        <p className='createCategoryNotes'>{bodyHeader}</p>
        <p className='createCategoryNotesDesc'>{bodyDesc}</p>
        <Button onClick={onClick} style={{
          fontWeight: 5,
          marginTop:'15px'
        }} >
          + {btntext}
        </Button>
      </div>
    );
  };

  const create = () => {
    if (name || desc) {
      if (editIndex > -1) {
        categories[editIndex] = {
          name: name,
          desc: desc,
          isActive: true,
          subCat: [],
        };
        setCategories([...categories]);
      } else {
        const newCategory = {
          name: name,
          desc: desc,
          isActive: false,
          subCat: [],
        };
        setCategories([...categories, newCategory]);
      }
      handleClose();
    }
  };

  const renderDashboardBody = () => {
    return (
      <CatBody
        imgSrc={addNotes}
        altText={'add notes logo'}
        bodyHeader={CREATE_CATEGORY_HEADER}
        bodyDesc={CREATE_CATEGORY_BODY}
        onClick={() => {
          setModel('category');
          setName('');
          setDesc('');
          handleOpen();
        }}
        btntext={'Category'}
      />
    );
  };

  const renderSubCatBody = () => {
    return (
      <>
        <CatBody
          imgSrc={addTask}
          altText={'add notes logo'}
          bodyHeader={CREATE_SUB_CATEGORY_HEADER}
          bodyDesc={CREATE_SUB_CATEGORY_BODY}
          onClick={() => {
            setModel('subCategory');
            handleOpen();
          }}
          btntext={'Sub-Category'}
        />
        <Button variant="outlined" style={{
          width: '140px',
          alignSelf: 'center',
          marginTop: '10px',
        }}>
          + Dashboard
        </Button>
      </>
    );
  };

  let activeTab = {};
  const getActiveCat = (categories) => {
    categories.forEach((item) => {
      // Set isActive to false for the current item
      if (item.isActive) {
        activeTab = item;
      }

      // Check if there are subcategories and deactivate them as well
      if (item.subCat && Array.isArray(item.subCat)) {
        getActiveCat(item.subCat); // Recursively call the function for subcategories
      }
    });
  };
  getActiveCat(categories);
  let isParentExists = false;
  categories.forEach((category) => {
    if (category !== activeTab) {
      isParentExists = true;
    }
  });

  const addSubCategory = () => {
    let activeIndex = -1;
    categories.forEach((category, index) => {
      if (category.isActive || category.subCat.some((subCat) => subCat.isActive)) {
        activeIndex = index;
      }
    });
    return (
      <div className='modelContent'>
        <p className='catHeader'>Create Sub Category for {categories[activeIndex].name}</p>
        <p className='inputLabel'>Name</p>
        <Input
          className='nameInput'
          placeholder={`Enter sub category name`}
          variant='outlined'
          onChange={({ target: { value } }) => {
            setSubCatName(value);
          }}
          value={subCatName}
        />
        <p className='inputLabel'>Description</p>
        <TextField
          className='descInput'
          maxRows={4}
          multiline
          placeholder={`Enter sub category description`}
          onChange={({ target: { value } }) => {
            setSubCatDesc(value);
          }}
          value={subCatDesc}
        />
        <div className='catBtnWrapper'>
          <Button className='btn' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (subCatName || subCatDesc) {
                if (editIndex > -1) {
                  categories[activeIndex].subCat[editIndex] = {
                    name: subCatName,
                    desc: subCatDesc,
                    isActive: true,
                  };
                  setCategories([...categories]);
                } else {
                  const newSubCategory = {
                    name: subCatName,
                    desc: subCatDesc,
                    isActive: false,
                  };
                  categories[activeIndex].subCat.push(newSubCategory);
                  setCategories([...categories]);
                }
                handleClose();
              }
            }}
          >
            Create
          </Button>
        </div>
      </div>
    );
  };

  const addCategory = () => {
    return (
      <div className='modelContent'>
        <p className='catHeader'>Create Category</p>
        <p className='inputLabel'>Name</p>
        <Input
          className='nameInput'
          placeholder={`Enter category name`}
          variant='outlined'
          onChange={({ target: { value } }) => {
            setName(value);
          }}
          value={name}
        />
        <p className='inputLabel'>Description</p>
        <TextField
          className='descInput'
          maxRows={4}
          multiline
          placeholder={`Enter category description`}
          onChange={({ target: { value } }) => {
            setDesc(value);
          }}
          value={desc}
        />
        <div className='catBtnWrapper'>
          <Button className='btn' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className='btn'
            onClick={() => {
              create();
            }}
          >
            Create
          </Button>
        </div>
      </div>
    );
  };

  const renderCreateDashboardBody = () => {
    return (
      <CatBody
        imgSrc={addNotes}
        altText={'add notes logo'}
        bodyHeader={CREATE_DASHBOARD_HEADER}
        bodyDesc={CREATE_DASHBOARD_BODY}
        onClick={() => {
          setIsCreateDashboard(true);
        }}
        btntext={'Dashboard'}
      />
    );
  };

  const renderBody = () => {
    if (isCreateDashboard) {
      return <SelectDashboard />;
    }
    if (isParentExists) {
      return renderCreateDashboardBody();
    }
    if (activeTab?.name) {
      return renderSubCatBody();
    } else {
      return renderDashboardBody();
    }
  };

  return (
    <Suspense fallback={<p>Dashboard loading...</p>}>
      <div className='dashboardWrapper'>
        <DashboardNavHOC
          handleOpen={handleOpen}
          categories={categories}
          setCategories={setCategories}
          setOpen={setOpen}
          setName={setName}
          setDesc={setDesc}
          editIndex={editIndex}
          setModel={setModel}
          setSubCatName={setSubCatName}
          setSubCatDesc={setSubCatDesc}
        />

        <div className='dashboardBody'>
          {activeTab?.name ? <CatHeader activeCat={activeTab} /> : <Header width={'90'} />}
          {renderBody()}
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} className='modelBox'>
            {model === 'category' ? addCategory() : addSubCategory()}
          </Box>
        </Modal>
      </div>
    </Suspense>
  );
};

export default RenderLeftNav(Dashboard);
