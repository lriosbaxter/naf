import React, { useEffect } from 'react'
import { Button, Dropdown, Form, Modal} from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import './AddEditFolderForm.scss'
import { toast } from "react-toastify";
import { useSourceFolder } from '../../../../hooks';

export function AddEditFolderForm(props) {
    const { addSourceFolder, updateSourceFolder  } = useSourceFolder();
    const { onClose, onRefetch, folder } = props;
    const formik = useFormik({
        initialValues: initialValues(folder),
        validationSchema: Yup.object(folder? updateSchema() : validationSchema()),
        onSubmit: async (formValue) => {
            try {
                if(folder){
                    await updateSourceFolder(folder.id, formValue)
                } else await addSourceFolder(formValue)
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
                name={"name_source"}
                placeholder={"Source Name"}
                value={formik.values.name_source}
                onChange={formik.handleChange}
                error={formik.errors.name_source}
            />
            <Form.Input
                name={"type_folder"}
                placeholder={"Folder type"}
                value={formik.values.type_folder}
                onChange={formik.handleChange}
                error={formik.errors.type_folder}
            />
            <Button type={"submit"} content={"Add folder"} primary fluid/>
        </Form>
    )
}

function initialValues(folder) {
    return {
        name_source: folder?.name_source || "",
        type_folder: folder?.type_folder || "",
    }
}

function validationSchema() {
    return {
        name_source: Yup.string().required(true),
        type_folder: Yup.string().required(true),
    }
}

function updateSchema() {
    return {
        name_source: Yup.string().required(true),
        type_folder: Yup.string().required(true),
    } 
}