import React, {useEffect, useState} from 'react'
import {useSwitch} from "../../hooks";
import {HeaderPage, TableSwitches} from "../../components/Admin";
import {Loader} from "semantic-ui-react";
import {ModalBasic} from "../../components/Common";
import {AddEditSwitchForm} from "../../components/Admin";
import {SendCommandForm} from "../../components/Admin";
import {SendCommandFromFile} from "../../components/Admin/SendCommandFromFile/SendCommandFromFile";

export function Switches() {
    const { loading, switches, getSwitches, deleteSwitch } = useSwitch()

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const [refetch, setRefetch] = useState(false)


    useEffect(() => {
        getSwitches()
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev)
    const onRefetch = () => setRefetch((prev) => !prev)

    const addSwitch = () => {
        setTitleModal("New switch")
        setContentModal(<AddEditSwitchForm onClose={openCloseModal} onRefetch={onRefetch}/>)
        openCloseModal()
    }

    const updateSwitch = (data) => {
        setTitleModal("Edit switch")
        setContentModal(<AddEditSwitchForm
            onClose={openCloseModal}
            onRefetch={onRefetch}
            nd_switch={data}/>)
        openCloseModal()
    }

    const sendCommand = (data) => {
        setTitleModal("Send command")
        setContentModal(<SendCommandForm
            onClose={openCloseModal}
            onRefetch={onRefetch}
            nd_switch={data}/>)
        openCloseModal()
    }

    const configFromFile = (data) => {
        setTitleModal("Send command")
        setContentModal(<SendCommandFromFile
            onClose={openCloseModal}
            onRefetch={onRefetch}
            nd_switch={data}/>)
        openCloseModal()
    }

    const onDeleteSwitch = async (data) => {
        const result = window.confirm(`Delete switch ${data.hostname}?`)
        if (result){
            try {
                await deleteSwitch(data.id)
                onRefetch();
            } catch (error) {
                console.log('Error')
            }
        }
    }
    return (
        <>
            <HeaderPage title={'Switches'} btnTitle={"Add a switch"} btnClick={addSwitch}/>
            {loading ?(
                <Loader active inline={"centered"}>
                    Loading...
                </Loader>
            ):(
                <TableSwitches switches={switches} updateSwitch={updateSwitch} onDeleteSwitch={onDeleteSwitch} sendCommand={sendCommand} configFromFile={configFromFile}/>
            )}
            <ModalBasic
                show={showModal}
                title={titleModal}
                children={contentModal}
                onClose={openCloseModal}
            />
        </>
    )
}