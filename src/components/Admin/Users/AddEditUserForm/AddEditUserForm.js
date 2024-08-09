import React from 'react';
import {Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useUser } from "../../../../hooks";
import './AddEditUserForm.scss'

export function AddEditUserForm(props) {
    const { onClose, onRefetch, user } = props;
    const { updateUser, addUser, loading } = useUser();
    const formik = useFormik({
        initialValues: InitialValues(user),
        validationSchema: Yup.object(user ? updateSchema() : newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                if (user){
                    await updateUser(user.id, formValue)
                } else await addUser(formValue)
                onRefetch()
                onClose()
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <Form className={"add_edit_user_form"} onSubmit={formik.handleSubmit}>
            <Form.Input
                name={"username"}
                placeholder={"Username"}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username}
            />
            <Form.Input
                name={"email"}
                placeholder={"Email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                name={"first_name"}
                placeholder={"First name"}
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.errors.first_name}
            />
            <Form.Input
                name={"last_name"}
                placeholder={"Last name"}
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={formik.errors.last_name}
            />

            <Form.Input
                name={"password"}
                type={"password"}
                placeholder={"Password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <div className={"add_edit_user_form_active"}>
                <Checkbox
                    toggle
                    checked={formik.values.is_active}
                    onChange={(_, data) => formik.setFieldValue('is_active', data.checked)}
                /> Active user
            </div>
            <div className={"add_edit_user_form_staff"}>
                <Checkbox
                    toggle
                    checked={formik.values.is_staff}
                    onChange={(_, data) => formik.setFieldValue('is_staff', data.checked)}
                /> Administrator user
            </div>
            <Button type={"submit"} content={user ? "Update":"Create"} primary fluid/>
        </Form>
    );
}

function InitialValues(user) {
    return {
        username: user?.username || "",
        email: user?.email || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        password: "",
        is_active: !!user?.is_active,
        is_staff: !!user?.is_staff
    };
}

function newValidationSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string().required(true),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}

function updateSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}

