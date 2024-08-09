import React, { useEffect } from 'react'
import { Button, Dropdown, Form, Modal} from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import './SWScriptForm.scss'
import { toast } from "react-toastify";
import { useScript } from '../../../hooks';
import { map, result } from 'lodash';
import { ModalBasic } from '../../Common';
import { useState } from 'react';

export function SWScriptForm() {
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


    const automationScriptsDropdown = getScriptsById(1)?.map((script) => (
        script.source_folder_id === 1 &&
            {
                key: script.id,
                text: script.title,
                value: script.id
            }
        ));

    const openCloseModal = () => setShowModal((prev) => !prev)

    const loadScriptData = (data) => {
        console.log(data)
        setTitleModal("Solarwinds")
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

        <Form className={"sw_script_form"} onSubmit={formik.handleSubmit}>
            <h3>SW Script</h3>
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
                name={"ip_address"}
                placeholder={"NPM server IP Address"}
                value={formik.values.ip_address}
                onChange={formik.handleChange}
                error={formik.errors.ip_address}
            />
            <Dropdown
                placeholder='Solarwinds scripts'
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
        ip_address: "",
    }
}

function validationSchema() {
    return {
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        ip_address: Yup.string().required(true),
    }
}