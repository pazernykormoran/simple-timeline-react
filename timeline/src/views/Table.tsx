import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export interface tableInterface {
  items: any
  itemsFiltered: any
  deleteItem: CallableFunction
  update_filtered_items: CallableFunction
}

const form_state = {
  start_date: 605600000000,
  end_date: 1643673600000
}

const DenseTable: React.FC<tableInterface> = ({ items, itemsFiltered, deleteItem, update_filtered_items }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const items2 = items.filter(row => Date.parse(row.item.start_date) > form_state.start_date && Date.parse(row.item.start_date) < form_state.end_date)
    update_filtered_items(items2)
  }

  const handleResetForm = (event) => {
    event.preventDefault();
    update_filtered_items(items)
  }

  const onChangeStartDate = (e) => {
    form_state.start_date = Date.parse(e.target.value)
  }
  const onChangeEndDate = (e) => {
    form_state.end_date = Date.parse(e.target.value)
  }

  const onDeleteEvent = (item_name) => {
    deleteItem(item_name)
  }

  function compareName(a, b) {
    if (a.item.name[0].toLowerCase() < b.item.name[0].toLowerCase()) {
      return -1;
    }
    if (a.item.name[0].toLowerCase() > b.item.name[0].toLowerCase())
      return 1;
    return 0;
  }

  function compareShortDescription(a, b) {
    if (a.item.short_description[0].toLowerCase() < b.item.short_description[0].toLowerCase())
      return -1;
    if (a.item.short_description[0].toLowerCase() > b.item.short_description[0].toLowerCase())
      return 1;
    return 0;
  }

  // function compareLongDescription(a, b) {
  //   if (a.item.long_description[0] < b.item.long_description[0])
  //     return -1;
  //   if (a.item.long_description[0] > b.item.long_description[0])
  //     return 1;
  //   return 0;
  // }

  function compareStartDate(a, b) {
    if (Date.parse(a.item.start_date) < Date.parse(b.item.start_date))
      return -1;
    if (Date.parse(a.item.start_date) > Date.parse(b.item.start_date))
      return 1;
    return 0;
  }

  function compareStartDateReverse(a, b) {

    if (Date.parse(a.item.end_date) > Date.parse(b.item.end_date))
      return -1;
    if (Date.parse(a.item.end_date) < Date.parse(b.item.end_date))
      return 1;
    return 0;
  }

  const handleSortByName = (event) => {
    event.preventDefault();
    console.log('items', items)
    const new_sorted_filtered_items = [...items.sort(compareName)]
    console.log('name sorted', new_sorted_filtered_items)
    update_filtered_items(new_sorted_filtered_items)
  }

  function handleSortByShortDescription(event) {
    event.preventDefault();
    const new_sorted_filtered_items = [...items.sort(compareShortDescription)]
    update_filtered_items(new_sorted_filtered_items)
  }


  function handleSortByStartDate(event) {
    event.preventDefault();
    const new_sorted_filtered_items = [...items.sort(compareStartDate)]
    update_filtered_items(new_sorted_filtered_items)
  }

  function handleSortByStartDateReverse(event) {
    event.preventDefault();
    const new_sorted_filtered_items = [...items.sort(compareStartDateReverse)]
    update_filtered_items(new_sorted_filtered_items)
  }


  return (
    <div>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>

          <p>ADD DATE FILTER</p>
          <form onSubmit={handleSubmit}>
            start date:
            <input type="date" onChange={onChangeStartDate} style={{ margin: "5px" }} />
            end date:
            <input type="date" onChange={onChangeEndDate} style={{ margin: "5px" }} />
            {/* <input type="submit" value="Use date filter" style={{ margin: "5px" }} /> */}
            <Button style={{ margin: "5px" }} variant="contained" onClick={handleSubmit}>Use date filter</Button>
            <Button style={{ margin: "5px" }} variant="contained" onClick={handleResetForm}>Reset filter</Button>
          </form>
        </CardContent>

      </Card>



      <Button style={{ margin: "5px" }} variant="outlined" onClick={handleSortByName}>Sort by name</Button>
      <Button style={{ margin: "5px" }} variant="outlined" onClick={handleSortByShortDescription}>Sort by short description</Button>
      <Button style={{ margin: "5px" }} variant="outlined" onClick={handleSortByStartDate}>Sort by start date</Button>
      <Button style={{ margin: "5px" }} variant="outlined" onClick={handleSortByStartDateReverse}>Sort by date reverse</Button>


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
              <TableCell align="right">Delete Event</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              //filter(row => Date.parse(row.item.start_date) > formState.start_date && Date.parse(row.item.start_date) < formState.end_date).
              itemsFiltered.map((row) => (

                // Date.parse(row.item.start_date) > formState.start_date && Date.parse(row.item.start_date) < formState.end_date ? (
                <TableRow
                  key={row.item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.item.name}
                  </TableCell>
                  <TableCell align="right"><img src={`${row.item.image}`} width="100px" /></TableCell>
                  <TableCell align="right">{row.item.type}</TableCell>
                  <TableCell align="right">{row.item.short_description}</TableCell>
                  <TableCell align="right">{row.item.long_description.split(' ').slice(0, 10).join(' ') +
                    (row.item.long_description.split(' ').slice(0, 10).length === 10 ? " ..." : '')}</TableCell>
                  <TableCell align="right">{row.item.start_date}</TableCell>
                  <TableCell align="right">{row.item.end_date}</TableCell>
                  <TableCell align="right"><button onClick={() => onDeleteEvent(row.item.name)}>Delete event</button></TableCell>
                </TableRow>
                // ) : ""
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DenseTable