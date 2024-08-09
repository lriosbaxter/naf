import React, { useState } from 'react';
import { Button, Checkbox, Form, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './SendCommandForm.scss';
import { sendCommandDeviceApi } from "../../../api/connections";

export function SendCommandForm(props) {
    const { nd_switch } = props;
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: ValidationSchema,
        validateOnChange: false,
        onSubmit: async (formValues, { setSubmitting, resetForm }) => {
            try {
                const formData = new FormData();
                formData.append('writed_command', formValues.writed_command);
                formData.append('access_mode', formValues.access_mode);
                formData.append('enable_mode', formValues.enable_mode);
                formData.append('conf_mode', formValues.conf_mode);
                formData.append('device_data', JSON.stringify(nd_switch));

                const response = await sendCommandDeviceApi(formData);
                console.log(response);
                resetForm(); // Clear the form after successful submission
                setSubmitSuccess(response); // Set submit success state
                setSubmitError(null); // Reset submit error state
            } catch (error) {
                console.error(error);
                setSubmitError(error.message || "An error occurred while sending the command.");
                setSubmitSuccess(false); // Set submit success state to false
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <Form className="send_command_form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    name="writed_command"
                    placeholder="Write your command"
                    value={formik.values.writed_command}
                    onChange={formik.handleChange}
                    error={formik.touched.writed_command && formik.errors.writed_command}
                    disabled={formik.values.from_file}
                    className={formik.values.from_file ? "disabled-input" : ""}
                />
                <Checkbox
                    toggle
                    checked={formik.values.enable_mode}
                    onChange={(_, data) => {
                        formik.setFieldValue('enable_mode', data.checked);
                        if (data.checked) {
                            formik.setFieldValue('conf_mode', false);
                        }
                    }}
                    label="Enable mode"
                />
                <Checkbox
                    toggle
                    checked={formik.values.conf_mode}
                    onChange={(_, data) => {
                        formik.setFieldValue('conf_mode', data.checked);
                        if (data.checked) {
                            formik.setFieldValue('enable_mode', false);
                        }
                    }}
                    label="Config mode"
                />
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
    writed_command: "",
    access_mode: true,
    enable_mode: false,
    conf_mode: false,
    from_file: false // You should define this field if it's used
};

const ValidationSchema = Yup.object({
    writed_command: Yup.string().required("Command is required"),
    access_mode: Yup.bool(),
    enable_mode: Yup.bool(),
    conf_mode: Yup.bool(),
});