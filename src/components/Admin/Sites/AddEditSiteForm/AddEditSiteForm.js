import React, {useEffect} from 'react';
import './AddEditSiteForm.scss'
import {Button, Dropdown, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useSite, useUser} from "../../../../hooks";

export function AddEditSiteForm(props) {
    const { onClose, onRefetch, site } = props;

    const {addSite, updateSite, deleteSite} = useSite();
    const { loading, users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, []);

    const adminDropdown = users?.map((user) => ({
        key: user.id,
        text: user.email,
        value: user.id
    })) || [];

    const formik = useFormik({
        initialValues: InitialValues(site),
        validationSchema: Yup.object(site ? updateSchema() : newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                if (site) {
                    console.log(formValue)
                    await updateSite(site.id, formValue)
                } else await addSite(formValue)
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
                name={"site_name"}
                placeholder={"Site name"}
                value={formik.values.site_name}
                onChange={formik.handleChange}
                error={formik.errors.site_name}
            />
            <Form.Input
                name={"region"}
                placeholder={"Region"}
                value={formik.values.region}
                onChange={formik.handleChange}
                error={formik.errors.region}
            />
            <Form.Input
                name={"city"}
                placeholder={"City"}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.errors.city}
            />
            <Dropdown
                placeholder='Administrator'
                fluid
                selection
                options={adminDropdown}
                value={formik.values.administrator}
                onChange={(e, { value }) => formik.setFieldValue('administrator', value)}
                error={!!formik.errors.administrator}
            />
            <Button
                type={"submit"} content={site ? "Update":"Create"} primary fluid/>
        </Form>
    );
}

function InitialValues(site) {

    return {
        site_name: site?.site_name || "",
        region: site?.region || "",
        city: site?.city || "",
        administrator: site?.administrator || ""
    };
}

function newValidationSchema() {
    return {
        site_name: Yup.string().required(true),
        region: Yup.string(),
        city: Yup.string(),
        administrator: Yup.number().required(false)
    }
}

function updateSchema() {
    return {
        site_name: Yup.string().required(true),
        region: Yup.string(),
        city: Yup.string(),
        administrator: Yup.number().required(false)
    }
}

