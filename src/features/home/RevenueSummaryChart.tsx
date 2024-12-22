import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(
  category:string,
  beneficieries: number,
  mmos: number,
  rawRiskScore: number,
  normRiskScore: number,
  regionalRate:number,
  revenue:number
) {
  return { category, beneficieries, mmos, rawRiskScore, normRiskScore, regionalRate, revenue };
}

export default function RevenueSummaryGraph({catagory, selectedCategory}) {
    const [revenueData, setRevenueData] = useState([]);
    useEffect(()=>{
        async function fetchRevenueData(){
            fetch(`http://127.0.0.1:8000/metrics?groupBy=${catagory}&aco_model=Standard&page=1&pageSize=20`).then(value=>{
                value.json().then(({data})=>{
                   const updatedArr = data.map((obj: { catagory:string, normalized_risk_score:number; regional_rate:number;revenue_total:number;risk_score:number;total_beneficiaries:number; total_mmos:number })=>{
                    return createData( obj[catagory], obj.total_beneficiaries,obj.total_mmos,obj.risk_score,obj.normalized_risk_score, obj.regional_rate, obj.revenue_total)
                   })
                   setRevenueData(updatedArr)
                })
            })
        }
        fetchRevenueData();
    }, [catagory])

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{selectedCategory}</TableCell>
            <TableCell>Beneficiaries</TableCell>
            <TableCell>Eligible MMOS</TableCell>
            <TableCell>Raw Risk Score</TableCell>
            <TableCell>Normalized Risk Score</TableCell>
            <TableCell>Regional Rate</TableCell>
            <TableCell>Revenue Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {revenueData.map((revenue) => (
            <TableRow
              key={revenue.beneficieries}
            >
                <TableCell>
                {revenue.category}
              </TableCell>
              <TableCell component="th" scope="row">
                {revenue.beneficieries}
              </TableCell>
              <TableCell>{revenue.mmos}</TableCell>
              <TableCell>{revenue.rawRiskScore}</TableCell>
              <TableCell>{revenue.normRiskScore}</TableCell>
              <TableCell>{revenue.regionalRate}</TableCell>
              <TableCell>{revenue.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
