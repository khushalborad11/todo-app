import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { cartContext } from './ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export default function Task() {
    const { CartLength, setCartLength } = useContext(cartContext)
    const [Alldata, setAlldata] = useState([])
    const navigate = useNavigate('')
    useEffect(() => {
        if (localStorage.getItem('data')) {
            let Taskdata = JSON.parse(localStorage.getItem('data'))
            setAlldata(Taskdata)
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            Name: '',
            email: '',
            taskTip: '',
            isImportant: false,
        },
        validationSchema: Yup.object({
            Name: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),
            email: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),
            taskTip: Yup.string()
                .min(2, 'Minimum 2 characters'),
        }),
        onSubmit: (values) => {
            values['id'] = Date.now();
            values['currentDate'] = new Date();
            setAlldata([...Alldata, values]);
            console.log([...Alldata, values]);
            setCartLength([...Alldata, values].length)
            localStorage.setItem('data', JSON.stringify([...Alldata, values]));
            formik.resetForm()
            toast.success("Success Add Task ", {
                position: toast.POSITION.TOP_RIGHT,
            });

        },
    });

    return (
        <>
            <section>
                <Container>
                    <Row className='text-center mt-3'>
                        <Col>
                            <div className='create_title mb-4'>
                                <h3> Task </h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }}>
                            <div className='contact_form'>
                                <div className='App'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='text-start mb-4'>
                                            <label className='fw-medium mb-1'>Task Name :-</label>
                                            <br />
                                            <input
                                                type='text'
                                                name='Name'
                                                value={formik.values.Name}
                                                onChange={formik.handleChange}
                                                className='w-100 p-2 rounded'
                                                placeholder='Name'
                                            />
                                            {formik.errors.Name && formik.touched.Name && (
                                                <p>{formik.errors.Name}</p>
                                            )}
                                        </div>

                                        <div className='text-start mb-4'>
                                            <label className='fw-medium mb-1'>Task Email :-</label>
                                            <br />
                                            <input
                                                name='email'
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className='w-100 p-2 rounded'
                                                placeholder='Email'
                                            />
                                            {formik.errors.email &&
                                                formik.touched.email && (
                                                    <p>{formik.errors.email}</p>
                                                )}
                                        </div>

                                        <div className='text-start mb-4'>
                                            <label className='fw-medium'>
                                                <input
                                                    type='checkbox'
                                                    name='isImportant'
                                                    checked={formik.values.isImportant === true}
                                                    onChange={formik.handleChange}
                                                    className="form-check-input mystyle me-2"
                                                />{' '}
                                                completed/Notcompleted
                                            </label>
                                        </div>
                                        <div className='text-center mb-4'>
                                            <button className='btn btn-success' type='submit'>
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </section>
        </>
    );
}
