import React, { useEffect, useState } from 'react';
import './App.css';
import { Chrono } from "react-chrono";
import { MediaType } from "react-chrono/dist/models/TimelineMediaModel"
import { example_items } from './data/example_items'
import DenseTable from './views/Table';
import AddingForm from './views/AddingForm';
import { Item } from './interfaces/item_interface';

function App() {
  const [items2, setItems2] = useState(example_items);
  const [filtered_items, setFilteredItems] = useState(items2);

  function compareDate(a, b) {
    if (Date.parse(a.item.start_date) < Date.parse(b.item.start_date)) {
      return -1;
    }
    if (Date.parse(a.item.start_date) > Date.parse(b.item.start_date)) {
      return 1;
    }
    return 0;
  }



  const addItem = (new_item: Item) => {
    let found = items2.find(x => x.item.name === new_item.name)
    if (found) {
      console.log('such event exists')
      return
    }
    let item = {
      item: {
        name: new_item.name,
        image: new_item.image,
        type: new_item.type,
        short_description: new_item.short_description,
        long_description: new_item.long_description,
        start_date: new_item.start_date,
        end_date: new_item.end_date,
      },
      title: new_item.start_date + " - " + new_item.end_date,
      cardTitle: new_item.name,
      url: "",
      cardSubtitle: new_item.short_description,
      cardDetailedText: new_item.long_description,
      media: {
        type: "IMAGE" as MediaType,
        source: {
          url: new_item.image
        }
      }
    }
    let new_items_arr = [item, ...items2]
    new_items_arr = new_items_arr.sort(compareDate)
    setItems2(new_items_arr)
  }

  function deleteItem(name: string) {
    setItems2(items2.filter(function (el) { return el.item.name != name; }))
  }

  useEffect(() => {
    setFilteredItems(items2)
  }, [items2])

  return (
    <div>
      <div style={{ width: "500px", height: "800px", margin: "20px", float: "left" }}>
        <Chrono items={items2}
          allowDynamicUpdate={true} />
      </div >
      <div style={{ float: "left", margin: "20px" }}>
        <DenseTable items={items2} itemsFiltered={filtered_items} deleteItem={deleteItem} update_filtered_items={setFilteredItems} ></DenseTable>
        <AddingForm items={items2} addItem={addItem} />
      </div>

    </div >


  )
}

export default App;
