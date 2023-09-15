'use client'
import React from 'react'
import AsyncSelect from 'react-select/async'
import styles from '../styles/home.module.css'
import useAxios from '../hooks/useAxios'

const SelectPlace = ({ label, error, data_key, setInputValue }) => {
    const { axiosRequest } = useAxios()

    const handleSearchPlace = async (value, callback) => {
        const apiResponse = await axiosRequest("POST", "flight/search-flight-airport", { search_key: value })
        callback(apiResponse?.data.map((option) => { return { value: option.iata, label: option.airport_name } }))
    }

    return (
        <div className={styles.form_input_wrap}>
            <label>{label}</label>
            <AsyncSelect
                loadOptions={handleSearchPlace}
                defaultOptions={[]}
                className={styles.search_select}
                onChange={data => setInputValue(data_key, data.value)}
            />
            <span className="text-danger">{error}</span>
        </div>
    )
}

export default SelectPlace