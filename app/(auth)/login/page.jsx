'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { Button, Form } from 'react-bootstrap'
import styles from "../../styles/login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { setUser } from '../../store/Auth/AuthSlice'
import { useDispatch } from 'react-redux'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter();
    const { data: session, status } = useSession()


    useEffect(() => {
        if (status === "authenticated") {
            router.replace('/')
        }
    }, [status])

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const res = await signIn('credentials', { ...values, redirect: false })
            console.log(res);
            if (res.error) {
                setError('Please check your credentails')
            } else {
                router.replace('/')
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email field is required"),
        password: Yup.string()
            .min(8, "Password must be 8 characters at minimum")
            .required("Password field is required")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginFormSchema,
        onSubmit: handleSubmit,
    });

    const setInputValue = useCallback(
        (e) =>
            formik.setValues({
                ...formik.values,
                [e.target.name]: e.target.value,
            }),
        [formik]
    );

    return (
        <div className={styles.login_wrapper}>
            <Form onSubmit={formik.handleSubmit} className={styles.login_form}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={formik.values.email}
                        onChange={setInputValue}
                    />
                    <small className='text-warning'>{formik.errors.email}</small>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder='password'
                        value={formik.values.password}
                        onChange={setInputValue}
                    />
                    <small className='text-warning'>{formik.errors.password}</small>
                </Form.Group>
                <span className='text-danger'>
                    {error}
                </span>
                <Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                        disabled={loading}
                    >
                        {loading ? 'loading...' : 'Login'}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login