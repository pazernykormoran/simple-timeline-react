
import React from 'react';
import { Item } from '../interfaces/item_interface';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { MediaType } from 'react-chrono/dist/models/TimelineMediaModel';

export interface tableInterface {
    items: Array<any>
    addItem: CallableFunction
}

const form_state = {
    name: "",
    image: "",
    type: 1,
    short_description: "",
    long_description: "",
    start_date: undefined,
    end_date: undefined
}

const TYPES = [1, 2]

const AddingForm: React.FC<tableInterface> = ({ items, addItem }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.files)
        const new_item: Item = {
            name: form_state.name,
            image: form_state.image,
            type: form_state.type,
            short_description: form_state.short_description,
            long_description: form_state.long_description,
            start_date: form_state.start_date,
            end_date: form_state.end_date
        }
        console.log('new_item', new_item)
        addItem(new_item)
    }
    const handleFileInput = (e) => {
        console.log('file selected', e.target.files[0])
        let files = e.target.files;
        // var allFiles = [];
        let file = files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file,
            };
            console.log('fileInfo', fileInfo)
            form_state.image = fileInfo.base64 as string
            // allFiles.push(fileInfo);
        }
        console.log('form_state', form_state)
    }

    const onChangeName = (e) => {
        form_state.name = e.target.value
        console.log('form_state', form_state)

    }

    const onChangeType = (e) => {
        form_state.type = e.target.value
        console.log('form_state', form_state)

    }

    const onChangeShortDescription = (e) => {
        form_state.short_description = e.target.value
        console.log('form_state', form_state)

    }
    const onChangeLongDescription = (e) => {
        form_state.long_description = e.target.value
        console.log('form_state', form_state)

    }
    const onChangeStartDate = (e) => {
        form_state.start_date = e.target.value
        console.log('form_state', form_state)

    }
    const onChangeEndDate = (e) => {
        form_state.end_date = e.target.value
        console.log('form_state', form_state)
    }

    return (
        <div>siema
            <form onSubmit={handleSubmit}>
                file:
                <input type="file" onChange={handleFileInput} style={{ display: "block", margin: "5px" }} />
                name:
                <input type="text" onChange={onChangeName} style={{ display: "block", margin: "5px" }} />
                type:
                <input type="number" onChange={onChangeType} style={{ display: "block", margin: "5px" }} />
                short description:
                <input type="text" onChange={onChangeShortDescription} style={{ display: "block", margin: "5px" }} />
                long description:
                <input type="text" onChange={onChangeLongDescription} style={{ display: "block", margin: "5px" }} />
                start date:
                <input type="date" onChange={onChangeStartDate} style={{ display: "block", margin: "5px" }} />
                end date:
                <input type="date" onChange={onChangeEndDate} style={{ display: "block", margin: "5px" }} />
                submit:
                <input type="submit" value="Submit" style={{ display: "block", margin: "5px" }} />
            </form>
            {/* <FormControl style={{ display: "block" }}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Provide event name</FormHelperText>
            </FormControl>
            <FormControl style={{ display: "block" }}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl style={{ display: "block" }}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl> */}

        </div>
    );
}

export default AddingForm