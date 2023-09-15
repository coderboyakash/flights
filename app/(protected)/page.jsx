'use client'
import React, { useState, useCallback } from 'react'
import classNames from 'classnames'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import { Button, Col, Row, Form, Card } from 'react-bootstrap';
import styles from '../styles/home.module.css'
import { LuArrowRightLeft } from 'react-icons/lu'
import SelectPlace from '../components/SelectPlace'
import SelectPersons from '../components/SelectPersons'
import FlightClasses from '../components/FlightClasses'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import useAxios from '../hooks/useAxios'
import { signOut } from 'next-auth/react'

const Home = () => {
	const [flights, setFlights] = useState([])
	const { loading, axiosRequest } = useAxios()
	const handleSubmit = async (values) => {
		console.log(values);
		try {
			const apiResponse = await axiosRequest("POST", "flight/flight-search-list", values)
			if (apiResponse?.res_code) {
				setFlights(apiResponse?.data)
			}
		} catch (error) {
			console.log(error);
		}
	}
	const SearchFormSchema = Yup.object().shape({
		from_airport: Yup.string()
			.required("From Airport field is required"),
		to_airport: Yup.string()
			.required("To Airport field is required"),
		departure_date: Yup.string()
			.required("Departure Date field is required"),
		adults: Yup.string()
			.required("Members count connot be 0"),
		class_type: Yup.string()
			.required("Preferred Class field is required")
	});

	const formik = useFormik({
		initialValues: {
			from_airport: "",
			to_airport: "",
			departure_date: moment().toDate(),
			return_date: "",
			adults: 0,
			childs: 0,
			infants: 0,
			class_type: "",
			travel_type: "oneway",
			max_result: 100,
			user_id: 0,
		},
		validationSchema: SearchFormSchema,
		onSubmit: handleSubmit,
	});

	const setInputValue = useCallback((type, value) => {
		formik.setValues({
			...formik.values,
			[type]: value,
		})
	}, [formik]);

	return (
		<div className={styles.search_wrapper}>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<div style={{ height: '300px', border: '1px solid #000', padding: '30px 40px', borderRadius: '10px' }}>
						<Form onSubmit={formik.handleSubmit}>
							<div className={styles.section}>
								<div className={styles.search_select_to_from}>
									<SelectPlace
										label="Flying From"
										error={formik.errors.from_airport}
										data_key={'from_airport'}
										setInputValue={setInputValue}
									/>
									<div className={styles.form_input_wrap}>
										<LuArrowRightLeft size={32} />
									</div>
									<SelectPlace
										label="Flying To"
										error={formik.errors.to_airport}
										data_key={'to_airport'}
										setInputValue={setInputValue}
									/>
								</div>
								<div className={styles.form_datepicker_input_wrap}>
									<label>Departure Date</label>
									<DatePicker
										dateFormat="E d MMM Y"
										selected={moment(formik.values.departure_date).add(1, 'days').toDate()}
										onChange={(date) => setInputValue('departure_date', moment(date).format("YYYY-MM-DD"))}
										className={classNames("form-control")}
									/>
									<span className="text-danger">{formik.errors.departure_date}</span>
								</div>
							</div>
							<div className={styles.section}>
								<div className={styles.form_input_wrap}>
									<SelectPersons
										members={formik.values}
										setInputValue={setInputValue}
									/>
									<span className="text-danger">{formik.errors.adults}</span>
								</div>
								<div className={styles.form_input_wrap}>
									<FlightClasses
										setInputValue={setInputValue}
									/>
									<span className="text-danger">{formik.errors.class_type}</span>
								</div>
							</div>
							<div className={styles.submit_section}>
								<Button type="submit">Submit</Button>
							</div>
						</Form>
					</div>
				</Col>
				<Col md={{ span: 8, offset: 2 }}>
					{!loading && <Card className='p-4'>
						{flights.map((flight) => <div key={flight.flight_id} className={'mt-2'}>
							{flight?.flightitineraries.map((flightitinerarie, index) =>
								<>
									<span>
										{flightitinerarie.duration_text}
										&nbsp;
										{moment(formik.values.departure_date).format('D MMM Y')}
										&nbsp;
										{formik.values.class_type}
									</span>
									<hr />
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<img style={{ width: '100px' }} src={flightitinerarie.airline_logo} alt="icon" />
											<span>{flightitinerarie.airline_name}</span>
										</div>
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<span>{moment(flightitinerarie.arrival_at).format('D MMM Y')}</span>
											<span>{moment(flightitinerarie.arrival_at).format('hh:mm')}</span>
											<span>{flightitinerarie.arrival_code}</span>
											<span>{flightitinerarie.arrival_airport}</span>
											<span>{flightitinerarie.arrival_location}</span>
										</div>
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<span>{moment(flightitinerarie.departure_at).format('D MMM Y')}</span>
											<span>{moment(flightitinerarie.departure_at).format('hh:mm')}</span>
											<span>{flightitinerarie.departure_code}</span>
											<span>{flightitinerarie.departure_airport}</span>
											<span>{flightitinerarie.departure_location}</span>
										</div>
										<Button>Book</Button>
									</div>
								</>
							)}
						</div>)}
					</Card>}
				</Col>
			</Row>
			<button onClick={signOut}>Logout</button>
		</div>
	)
}

export default Home