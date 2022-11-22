import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Item } from '../interfaces/item_interface';


export interface tableInterface {
  items: any
}

const DenseTable: React.FC<tableInterface> = ({ items }) => {
  console.log('new_items', items)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 900 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Short Description</TableCell>
            <TableCell align="right">Long Description</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item.name}
              </TableCell>
              <TableCell align="right"><img src={`${row.item.image}`} /></TableCell>
              <TableCell align="right">{row.item.type}</TableCell>
              <TableCell align="right">{row.item.short_description}</TableCell>
              <TableCell align="right">{row.item.long_description}</TableCell>
              <TableCell align="right">{row.item.start_date}</TableCell>
              <TableCell align="right">{row.item.end_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable