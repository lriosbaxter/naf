import React, {useState} from 'react';
import './MacAdressSearchForm.scss'
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, Form} from "semantic-ui-react";
import {searchMacAddressApi} from "../../../api/connections";
import {ModalBasic} from "../../Common";
import {MacAddressFormat} from "../MacAddressFormat";

export function MacAdressSearchForm() {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const openCloseModal = () => setShowModal((prev) => !prev)

    const check_mac_address_result = (data) => {
        setTitleModal("Mac Address - " + data.mac_address)
        setContentModal(<MacAddressFormat data={data}/>)
        openCloseModal()
    }

    const formik = useFormik({
        initialValues: InitialValues(),
        validationSchema: newValidationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const response = await searchMacAddressApi(formValues)
                check_mac_address_result(response)
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Form className={"search_mac_address_form"} onSubmit={formik.handleSubmit}>
            <Form.Input
                name={"mac_address"}
                placeholder={"Introduce the device mac address"}
                value={formik.values.mac_address}
                onChange={formik.handleChange}
                error={formik.errors.mac_address}
            />
            <ModalBasic
                show={showModal}
                title={titleModal}
                children={contentModal}
                onClose={openCloseModal}
            />
            <Button type={"submit"} content={"Send"} primary fluid/>
        </Form>
    );
}

function InitialValues() {
    return {
        mac_address: "",
    };
}

function newValidationSchema() {
    return Yup.object({
        mac_address: Yup.string(),
    });
}

