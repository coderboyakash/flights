import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { BsChevronDown } from 'react-icons/bs'
import PersonType from './PersonType'
import styles from './../styles/home.module.css'

const SelectPersons = ({ setInputValue, members }) => {
    const [show, setShow] = useState(false)
    const handleMemberChange = (type, value) => {
        setInputValue(type, value)
    }
    return (
        <div className={styles.traveller_wrap}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
                <label>Traveller(s)</label>
                <div className={styles.traveller_input}>
                    <span>{members.adults} Adult</span>
                    <span>{members.childs} Children</span>
                    <span>{members.infants} Infants</span>
                    <BsChevronDown
                        onClick={() => setShow(!show)}
                    />
                </div>
                {show && <div className={styles.traveller}>
                    <PersonType
                        type={'adults'}
                        label={'Adult'}
                        count={members?.adults}
                        memberChangeHandler={handleMemberChange}
                    />
                    <PersonType
                        type={'childs'}
                        label={'Children (3-12 yrs)'}
                        count={members?.childs}
                        memberChangeHandler={handleMemberChange}
                    />
                    <PersonType
                        type={'infants'}
                        label={'Adult (0-2 yrs)'}
                        count={members?.infants}
                        memberChangeHandler={handleMemberChange}
                    />
                    <Button style={{ width: '100%' }} onClick={() => setShow(!show)}>Done</Button>
                </div>}
            </div>
        </div>
    )
}

export default SelectPersons