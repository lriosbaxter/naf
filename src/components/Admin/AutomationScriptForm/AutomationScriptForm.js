import React, { useEffect } from 'react'
import { Button, Dropdown, Form, Modal} from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import './AutomationScriptForm.scss'
import { toast } from "react-toastify";
import { useScript } from '../../../hooks';
import { map, result } from 'lodash';
import { ModalBasic } from '../../Common';
import { useState } from 'react';

const device_os = [
    {key: "cisco_ios", text: "cisco_ios", value: "cisco_ios"},
    {key: "cisco_wlc", text: "cisco_wlc", value: "cisco_wlc"},
    {key: "cisco_nxos", text: "cisco_nxos", value: "cisco_nxos"},
    {key: "autodetect", text: "autodetect", value: "autodetect"},
]

export function AutomationScriptForm() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)

    const { scripts, runscriptresult, runScript, getAllScripts } = useScript();

    useEffect(() => {
        getAllScripts()
        console.log(runscriptresult)
    }, [])

    const getScriptsById = (id) => {
        if (!scripts || typeof scripts !== 'object') {
            return []
        }
        const matchingScripts = []
        for (const script of scripts) {
            if (script.source_folder_id === id) {
                matchingScripts.push(script)
            }
        }
        return matchingScripts
    }


    const automationScriptsDropdown = getScriptsById(2)?.map((script) => (
        script.source_folder_id === 2 &&
            {
                key: script.id,
                text: script.title,
                value: script.id
            }
        ));

    const openCloseModal = () => setShowModal((prev) => !prev)

    const loadScriptData = (data) => {
        console.log(data)
        setTitleModal("BGP Resolved ticket")
        setContentModal(data)
        openCloseModal()
    }
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                await runScript(formValue, formValue.script_id)
                console.log(runscriptresult)
                loadScriptData(runscriptresult)
            } catch (error) {
                toast.error(error.message)
            }
        },
    });
    return(

        <Form className={"automation_script_form"} onSubmit={formik.handleSubmit}>
            <h3>NW Automation Script</h3>
            <Form.Input
                name={"username"}
                placeholder={"Username"}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.errors.username}
            />
            <Form.Input
                name={"password"}
                placeholder={"Password"}
                type={'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Form.Input
                name={"secret"}
                placeholder={"Secret"}
                type={'password'}
                value={formik.values.secret}
                onChange={formik.handleChange}
                error={formik.errors.secret}
            />
            <Form.Input
                name={"ip_address"}
                placeholder={"IP Address"}
                value={formik.values.ip_address}
                onChange={formik.handleChange}
                error={formik.errors.ip_address}
            />            
            <Dropdown
                placeholder='Device OS'
                fluid
                selection
                options={device_os}
                value={formik.values.device_type}
                onChange={(e, { value }) => formik.setFieldValue('device_type', value)}
                error={formik.errors.device_type}
            />
            <Dropdown
                placeholder='Automation scripts'
                fluid
                selection
                options={automationScriptsDropdown}
                value={formik.values.script_id}
                onChange={(e, { value }) => formik.setFieldValue('script_id', value)}
                error={formik.errors.script_id}
            />

            <ModalBasic 
                    show={showModal}
                    title={titleModal}
                    children={contentModal}
                    onClose={openCloseModal}
            />
            <Button type={"submit"} content={"Correr script"} primary fluid/>
        </Form>
    )
}

function initialValues() {
    return {
        username: "",
        password: "",
        secret: "",
        ip_address: "",
        device_type: "",
        nwa_script: "",
    }
}

function validationSchema() {
    return {
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        secret: Yup.string().required(true),
        ip_address: Yup.string().required(true),
        un_ip_address: Yup.string().required(true),
        device_type: Yup.string().required(true),
    }
}