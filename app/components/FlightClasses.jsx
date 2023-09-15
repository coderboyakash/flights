import React from 'react'
import { classes } from '../utils/classes'
import { FormSelect } from 'react-bootstrap'

const FlightClasses = ({ setInputValue }) => {
    return (
        <div>
            <label>Select Preferred Class</label>
            <FormSelect style={{ width: "250px" }} required={true} onChange={e => setInputValue('class_type', e.target.value)}>
                <option value={''}>Preferred Class</option>
                {classes.map((item, index) => <option value={item.value} key={index}>{item.label}</option>)}
            </FormSelect>
        </div>
    )
}

export default FlightClasses