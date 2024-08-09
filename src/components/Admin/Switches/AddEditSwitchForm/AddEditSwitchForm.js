import React, {useEffect} from 'react';
import './AddEditSwitchForm.scss'
import {Button, Dropdown, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useSwitch, useSite} from "../../../../hooks";
import {device_os} from "../../../../utils/constants";


export function AddEditSwitchForm(props) {
    const { onClose, onRefetch, nd_switch } = props;
    const { addSwitch, updateSwitch } = useSwitch();

    const { sites, getSites } = useSite();
    const findById = (id) => {
        return sites.find(site => site.id === id);
    };
    useEffect(() => {
        getSites();
    }, []);

    const siteDropdown = sites?.map((site) => ({
        key: site.id,
        text: site.site_name,
        value: site.id
    })) || [];




    const formik = useFormik({
        initialValues: InitialValues(nd_switch),
        validationSchema: Yup.object(nd_switch ? updateSchema(): newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                if (nd_switch){
                    console.log(formValue)
                    await updateSwitch(nd_switch.id, formValue)
                } else await addSwitch(formValue)
                onRefetch()
                onClose()
            } catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <Form className={"add_edit_switch_form"} onSubmit={formik.handleSubmit}>
            <Form.Input
                name={"hostname"}
                placeholder={"Hostname"}
                value={formik.values.hostname}
                onChange={formik.handleChange}
                error={formik.errors.hostname}
            />
            <Form.Input
                name={"admin_vlan"}
                placeholder={"Admin VLAN"}
                value={formik.values.admin_vlan}
                onChange={formik.handleChange}
                error={formik.errors.admin_vlan}
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
                placeholder={"SSH Domain name"}
                value={formik.values.domain_ssh}
                onChange={formik.handleChange}
                error={formik.errors.domain_ssh}
            />
            <Form.Input
                name={"vtp_role"}
                placeholder={"VTP Role"}
                value={formik.values.vtp_role}
                onChange={formik.handleChange}
                error={formik.errors.vtp_role}
            />
            <Form.Input
                name={"vtp_domain_name"}
                placeholder={"VTP Domain name"}
                value={formik.values.vtp_domain_name}
                onChange={formik.handleChange}
                error={formik.errors.vtp_domain_name}
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
            />
            <Button type={"submit"} content={nd_switch ? "Update":"Create"} primary fluid/>
        </Form>
    );
}

function InitialValues(nd_switch) {
    return {
        hostname: nd_switch?.hostname || "",
        admin_vlan: nd_switch?.admin_vlan || "",
        ip_address: nd_switch?.ip_address || "",
        domain_ssh: nd_switch?.domain_ssh || "",
        vtp_role: nd_switch?.vtp_role || "",
        vtp_domain_name: nd_switch?.vtp_domain_name || "",
        device_type: nd_switch?.device_type || "",
        site: nd_switch?.site || "",
    };
}

function newValidationSchema() {
    return {
        hostname: Yup.string().required(true),
        admin_vlan: Yup.string(),
        ip_address: Yup.string().required(true),
        vtp_role: Yup.string(),
        vtp_domain_name: Yup.string(),
        device_type: Yup.string().required(true),
        site: Yup.string(),
    }
}

function updateSchema() {
    return {
        hostname: Yup.string().required(true),
        admin_vlan: Yup.string(),
        ip_address: Yup.string().required(true),
        vtp_role: Yup.string(),
        vtp_domain_name: Yup.string(),
        device_type: Yup.string().required(true),
        site: Yup.string(),
    }
}