'use client'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { HiMinusSm, HiPlus } from 'react-icons/hi'

const PersonType = ({ label, type, count, memberChangeHandler }) => {
    const [counter, setCounter] = useState(count)
    const handleDecrease = () => {
        setCounter(prev => prev > 0 ? prev - 1 : 0)
    }
    const handleIncrease = () => {
        setCounter(prev => prev + 1)
    }
    useEffect(()=>{
        memberChangeHandler(type, counter)
    },[counter])
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <span>{label}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button onClick={handleDecrease}>
                        <HiMinusSm />
                    </Button>
                    <div style={{ width: '40px', marginLeft: '5px', marginRight: '5px', textAlign: 'center' }}>{counter}</div>
                    <Button onClick={handleIncrease}>
                        <HiPlus />
                    </Button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default PersonType