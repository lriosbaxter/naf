import React from 'react';
import { Modal } from "semantic-ui-react";
import './ModalBasic.scss';

export function ModalBasic(props) {
    const { show, size, title, children, onClose } = props;
    const modalSize = size || "small"; // Use provided size or default to "small"

    return (
        <Modal
            className="modal_basic"
            open={show}
            onClose={onClose}
            size={modalSize}
        >
            {title && <Modal.Header>{title}</Modal.Header>}
            <Modal.Content>{children}</Modal.Content>
        </Modal>
    );
}

ModalBasic.defaultProps = {
    size: "small"
};