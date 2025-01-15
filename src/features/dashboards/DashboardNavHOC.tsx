import './dashboardNav.scss';
import dashboardNav from '../../assets/dashboard/dashboardNav.svg';
import addCategoryBtn from '../../assets/dashboard/addCat.svg';
import DotMenu from './DotMenu';
import { NO_CATEGORY_TEXT } from './dashboardConstants';

const DashboardNavHOC = (prop: object) => {
  const {
    handleOpen,
    categories,
    setCategories,
    setOpen,
    setName,
    setDesc,
    editIndex,
    setModel,
    setSubCatDesc,
    setSubCatName,
  } = prop;

  function deactivateItems(items) {
    // Iterate through each item in the array
    items.forEach((item) => {
      // Set isActive to false for the current item
      item.isActive = false;

      // Check if there are subcategories and deactivate them as well
      if (item.subCat && Array.isArray(item.subCat)) {
        deactivateItems(item.subCat); // Recursively call the function for subcategories
      }
    });
    return items;
  }

  const renderCategories = () => {
    return categories?.length ? (
      categories.map((category: object, index: number) => {
        return (
          <div>
            <div
              className='catWrapper'
              style={{
                backgroundColor: `${category.isActive ? '#DBF1FD' : ''}`,
              }}
              onClick={() => {
                setModel('category');
                const updatedCats = deactivateItems(categories);
                updatedCats[index] = {
                  ...category,
                  isActive: true,
                };
                setCategories([...updatedCats]);
              }}
            >
              <p>{category.name}</p>
              <DotMenu
                category={category}
                index={index}
                setName={setName}
                setDesc={setDesc}
                handleOpen={handleOpen}
              />
            </div>
            {category?.subCat?.map(({ name, isActive }, ind) => {
              return (
                <div
                  className='catWrapper'
                  onClick={() => {
                    setModel('subCategory');
                    const items = deactivateItems(categories);
                    items[index].subCat[ind].isActive = true;
                    setCategories([...items]);
                  }}
                  style={{
                    backgroundColor: `${isActive ? '#DBF1FD' : ''}`,
                  }}
                >
                  <p
                    style={{
                      marginLeft: '15px',
                    }}
                  >
                    {name}
                  </p>
                  <DotMenu
                    category={category?.subCat}
                    index={ind}
                    setName={setName}
                    setDesc={setDesc}
                    handleOpen={handleOpen}
                    setSubCatDesc={setSubCatDesc}
                    setSubCatName={setSubCatName}
                  />
                </div>
              );
            })}
          </div>
        );
      })
    ) : (
      <div className='emptyCatWrapper'>
          <p className='noCat'>{ NO_CATEGORY_TEXT}</p>
      </div>
    );
  };
  return (
    <div className='dashboardNavWrapper'>
      <div className='dashboardHeader'>
        <img src={dashboardNav} alt='dashboardNav Icon' className='dashboardNavIcon' />
        <p className='dashboardText'>Dashboards</p>
      </div>
      <div className='addCategoryHeader'>
        <p className='categoryText'>Category</p>
        <img
          src={addCategoryBtn}
          alt='dashboardNav Icon'
          onClick={() => {
            setName('');
            setDesc('');
            handleOpen();
          }}
        />
      </div>
      {renderCategories()}
    </div>
  );
};

export default DashboardNavHOC;
