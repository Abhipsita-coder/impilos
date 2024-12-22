/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './graphWrapper.scss';
import MenuItem from '@mui/material/MenuItem';
import fullScreenIcon from '../../assets/home/fullScrIcon.svg'
import RevenueSummaryGraph from './RevenueSummaryChart';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const GraphWrapper = () => {
    const [catagory, setCategory] = useState('Cohort');
    const [selectedCategory, setSelectedCategory] = useState('Cohort')

    const cardData = [{
        name:'Normalization Factor',
        value: 'A/D = 1.155'
    }, {
        name:'RTA',
        value: 'ESRD = 0.948'
    }, {
        name:'ACO Reach Discount',
        value: 'A/D = 3%'
    }, {
        name: 'HEBA Adjustment',
        value: 'ESRD = 1.003'
    }]

    const filter = [{
        name:'Cohort',
        value:'Cohort'
    }, {
        name:'Age Band',
        value:'AGE_BAND'
    }, {
        name:'Gender',
        value:'GENDER'
    }, {
        name:'Region',
        value:'REGION'
    }, {
        name:'Market',
        value:'MARKET'
    }, {
        name:'Clinic',
        value:'CLINIC'
    }, {
        name:'DPM',
        value:'DPM'
    }, {
        name:"NP",
        value:'NP'
    }, {
        name:'Benchmark',
        value:'BNMRK'
    }, 
    // {
    //     name:'MBI',
    //     value:'Beneficiary_MBI_ID'
    // }
]

    useEffect(()=>{
        filter.forEach(({name, value})=>{
            if(value===catagory){
                setSelectedCategory(name)
            }
        })
    }, [catagory])

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value)
    }
  return (
    <div className='graphWrapper'>
        <div className='graphHeader'>
            <p style={{
                fontFamily:'DM sans',
                fontWeight:'500',
                fontSize:'20px'
            }}>Revenue breakdown by {selectedCategory}</p>
            {/* <div className='expandBtn'> */}
                {/* <img src={fullScreenIcon} alt="" />
                <p style={{
                    fontFamily:"DM sans",
                    fontWeight:'600',
                    fontSize:'12px',
                    lineHeight:'18px',
                    textAlign:"center"
                }} >Full screen</p> */}
                <Select
                className='category'
                onChange={handleChange}
                value={catagory}
                style={{
                    color:'black',
                    width:'15%'
                }}
        >
            {
                filter.map(({name, value})=>{
                    return(
                        <MenuItem value={value}>{name}</MenuItem>
                    )
                })
            }
       
        </Select>
            {/* </div> */}
        </div>
        <RevenueSummaryGraph catagory={catagory} selectedCategory={selectedCategory} />
        <div className='summaryCardWrapper'>
            {
            cardData.map(({name, value})=>{
                return(
                <div className='card'>
                    <p style={{
                        margin:0,
                        paddingTop:'10px',
                        fontFamily:'Inter',
                        color:'#1A1A1A5C',
                        fontWeight:'600',
                        fontSize:'16px',
                        lineHeight:'25px'
                    }} >{name}</p>
                    <p style={{
                        marginTop:'10px',
                        fontFamily:"DM sans",
                        fontWeight:'700',
                        fontSize:'25px',
                        lineHeight:'39px',
                        color:'#424242'
                    }} >{value}</p>
                </div>
                )
            })
            }
        </div>
        
    </div>
  )
}

export default GraphWrapper