import React, { useEffect } from 'react'
import { Button, Dropdown, Form, Modal} from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import './AddEditScriptForm.scss'
import { toast } from "react-toastify";
import { useScript, useSourceFolder } from '../../../../hooks';

export function AddEditScriptForm(props) {
    const { onClose, onRefetch, script } = props;
    const { sourceFolders, getAllSourceFolders } = useSourceFolder();
    const { addScript, updateScript } = useScript();
    useEffect(() => {
        getAllSourceFolders()
        console.log(sourceFolders)
    }, [onRefetch])

    const sourceFolderDropdown = sourceFolders?.map((source_folder) => (
        {
            key: source_folder.id,
            text: source_folder.name_source,
            value: source_folder.id
        }
    )) || [];
    console.log(sourceFolderDropdown)

    const formik = useFormik({
        initialValues: initialValues(script),
        validationSchema: Yup.object(script? updateSchema() : validationSchema()),
        onSubmit: async (formValue) => {
            try {
                if(script){
                    console.log(script.id)
                    console.log(formValue)
                    await updateScript(script.id, formValue)
                } else await addScript(formValue)
                onRefetch()
                onClose()
            } catch (error) {
                toast.error(error.message)
            }
        }
    });

    return(

        <Form className={"sw_script_form"} onSubmit={formik.handleSubmit}>
            <h3>Add Script</h3>
            <Form.Input
                name={"title"}
                placeholder={"Title"}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />
            <Form.Input
                name={"repository_name"}
                placeholder={"Repository name"}
                value={formik.values.repository_name}
                onChange={formik.handleChange}
                error={formik.errors.repository_name}
            />
            <Form.Input
                name={"py_archive_name"}
                placeholder={"Archive name (.py)"}
                type={'py_archive_name'}
                value={formik.values.py_archive_name}
                onChange={formik.handleChange}
                error={formik.errors.py_archive_name}
            />
            <Form.Input
                name={"type_script"}
                placeholder={"Script type"}
                value={formik.values.type_script}
                onChange={formik.handleChange}
                error={formik.errors.type_script}
            />
            <Dropdown
                placeholder='Source Folders'
                fluid
                selection
                options={sourceFolderDropdown}
                value={formik.values.source_folder_id}
                onChange={(e, { value }) => formik.setFieldValue('source_folder_id', value)}
                error={formik.errors.source_folder_id}
            />
            <Button type={"submit"} content={"Add Script"} primary fluid/>
        </Form>
    )
}

function initialValues(script) {
    return {
        title: script?.title || "",
        repository_name: script?.repository_name || "",
        py_archive_name: script?.py_archive_name || "",
        type_script: script?.type_script || "",
        source_folder_id: script?.source_folder_id || ""
    }
}

function validationSchema() {
    return {
        title: Yup.string().required(true),
        repository_name: Yup.string().required(true),
        py_archive_name: Yup.string().required(true),
        type_script: Yup.string().required(true),
        source_folder_id: Yup.string()
    }
}

function updateSchema() {
    return {
        title: Yup.string().required(true),
        repository_name: Yup.string().required(true),
        py_archive_name: Yup.string().required(true),
        type_script: Yup.string().required(true),
        source_folder_id: Yup.string()
    } 
}