import React, {useState} from 'react';
import {Button, Form, Message} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './SendCommandFromFile.scss';
import { sendCommandFileDeviceApi } from "../../../api/connections";

export function SendCommandFromFile(props) {
    const { nd_switch } = props;
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: ValidationSchema,
        validateOnChange: false,
        onSubmit: async (formValues, { setSubmitting }) => {
            try {
                const formData = new FormData();
                formData.append('file', formValues.file);
                formData.append('device_data', JSON.stringify(nd_switch));

                const response = await sendCommandFileDeviceApi(formData);
                console.log(response);
                setSubmitSuccess(response); // Set submit success state
                setSubmitError(null); // Reset submit error state
            } catch (error) {
                console.error(error);
                // Handle error here, e.g., show an error message to the user
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
        <Form className="send_command_form" onSubmit={formik.handleSubmit}>
            <div className="dropbox-container">
                <label
                    htmlFor="file-input"
                    className="send_command_form_from_file dropbox"
                    onDrop={(event) => {
                        event.preventDefault();
                        const file = event.dataTransfer.files[0];
                        formik.setFieldValue('file', file);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                    }}
                >
                    <p>{formik.values.file ? formik.values.file.name : "Drop file here or click to upload"}</p>
                    <input
                        id="file-input"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            formik.setFieldValue('file', file);
                        }}
                    />
                </label>
            </div>
            <Button type="submit" content="Send" primary fluid />
        </Form>
        {submitSuccess && (submitSuccess.status === 'error' || submitSuccess.status === 'un-successful') && (
            <Message negative>
                <Message.Header>Error Sending Command</Message.Header>
                <p>Command sent: {submitSuccess.command_sended}</p>
                <p>Prompt result: {submitSuccess.prompt_result}</p>
            </Message>
        )}
        {submitSuccess && submitSuccess.status === 'successful' && (
            <Message positive>
                <Message.Header>Command Sent Successfully!</Message.Header>
                <p>Command sent: {submitSuccess.command_sended}</p>
                <p>Prompt result: {submitSuccess.prompt_result}</p>
            </Message>
        )}
        </>
    );
}

const InitialValues = {
    file: null
};

const ValidationSchema = Yup.object({
    file: Yup.mixed().required('File is required') // Use string for required message
});