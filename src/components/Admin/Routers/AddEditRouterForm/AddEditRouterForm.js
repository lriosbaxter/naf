import React, {useEffect} from 'react';
import './AddEditRouterForm.scss'
import {Button, Checkbox, Dropdown, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import {useRouter, useSite} from "../../../../hooks";
import * as Yup from "yup";

const device_os = [
    { key: 'cisco_ios', text: 'cisco_ios', value: 'cisco_ios' },
    { key: 'cisco_wlc', text: 'cisco_wlc', value: 'cisco_wlc' },
    { key: 'cisco_nxos', text: 'cisco_nxos', value: 'cisco_nxos' },
];


export function AddEditRouterForm(props) {
    const { onClose, onRefetch, nd_router } = props;

    const { addRouter, updateRouter, deleteRouter } = useRouter();

    const { loading, sites, getSites } = useSite();

    useEffect(() => {
        getSites();
    }, []);

    const siteDropdown = sites?.map((site) => ({
        key: site.id,
        text: site.site_name,
        value: site.id
    })) || [];

    const formik = useFormik({
        initialValues: InitialValues(nd_router),
        validationSchema: Yup.object(nd_router? updateSchema() : newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                if (nd_router) {
                    await updateRouter(nd_router.id, formValue)
                } else await addRouter(formValue)
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
                name={"hostname"}
                placeholder={"Hostname"}
                value={formik.values.hostname}
                onChange={formik.handleChange}
                error={formik.errors.hostname}
            />
            <Form.Input
                name={"ip_address"}
                placeholder={"Ip address"}
                value={formik.values.ip_address}
                onChange={formik.handleChange}
                error={formik.errors.ip_address}
            />
            <Form.Input
                name={"domain_ssh"}
                placeholder={"SSH domain"}
                value={formik.values.domain_ssh}
                onChange={formik.handleChange}
                error={formik.errors.domain_ssh}
            />
            <Dropdown
                placeholder='Device OS'
                fluid
                selection
                options={device_os}
                value={formik.values.device_type}
                onChange={(e, { value }) => formik.setFieldValue('device_type', value)}
                error={!!formik.errors.device_type}
            />
            <Dropdown
                placeholder='Site'
                fluid
                selection
                options={siteDropdown}
                value={formik.values.site}
                onChange={(e, { value }) => formik.setFieldValue('site', value)}
                error={!!formik.errors.site}
                className="custom-dropdown" // Add custom class for styling
            />
            <Button type={"submit"} content={nd_router ? "Update":"Create"} primary fluid/>
        </Form>
    );
}

function InitialValues(nd_router) {
    console.log(nd_router?.site)
    return {
        hostname: nd_router?.hostname || "",
        ip_address: nd_router?.ip_address || "",
        domain_ssh: nd_router?.domain_ssh || "",
        device_type: nd_router?.device_type || "",
        site: nd_router?.site || "",
    };
}

function newValidationSchema() {
    return {
        hostname: Yup.string().required(true),
        ip_address: Yup.string().required(true),
        domain_ssh: Yup.string(),
        device_type: Yup.string().required(true),
        site: Yup.string().required(false),
    }
}

function updateSchema() {
    return {
        hostname: Yup.string().required(true),
        ip_address: Yup.string().required(true),
        domain_ssh: Yup.string(),
        device_type: Yup.string().required(true),
        site: Yup.string().required(false),
    }
}

