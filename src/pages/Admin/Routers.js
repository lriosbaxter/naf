import React, {useEffect, useState} from 'react'
import {HeaderPage, TableRouters, AddEditRouterForm, CommandSendedFormat} from "../../components/Admin";
import {Loader} from "semantic-ui-react";
import {useRouter} from "../../hooks";
import {ModalBasic} from "../../components/Common";
import {SendCommandForm} from "../../components/Admin";
import {SendCommandFromFile} from "../../components/Admin/SendCommandFromFile/SendCommandFromFile";


export function Routers() {
    const { loading, routers, getRouters, deleteRouter } = useRouter()

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        getRouters()
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev)
    const onRefetch = () => setRefetch((prev) => !prev)

    const addRouter = () => {
        setTitleModal("New router")
        setContentModal(<AddEditRouterForm onClose={openCloseModal} onRefetch={onRefetch}/>)
        openCloseModal()
    }

    const updateRouter = (data) => {
        setTitleModal("Edit router")
        setContentModal(<AddEditRouterForm
            onClose={openCloseModal}
            onRefetch={onRefetch}
            nd_router={data}/>)
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

    const commandSended = (data) => {
        setTitleModal("Result of commands")
        setContentModal(<CommandSendedFormat
            onClose={openCloseModal}
            onRefetch={onRefetch}
            nd_switch={data}/>)
        openCloseModal()
    }

    const configFromFile = (data) => {
        setTitleModal("Send command from file")
        setContentModal(<SendCommandFromFile
            onClose={openCloseModal}
            onRefetch={onRefetch}
            commandSended={commandSended}
            nd_switch={data}/>)
        openCloseModal()
    }


    const onDeleteRouter = async (data) => {
        const result = window.confirm(`Delete router ${data.hostname}?`)
        if (result){
            try {
                await deleteRouter(data.id)
                onRefetch();
            } catch (error) {
                console.log('Error')
            }
        }
    }
    return (
        <>
            <HeaderPage title={'Routers'} btnTitle={"Add a router"} btnClick={addRouter}/>
            {loading ?(
                <Loader active inline={"centered"}>
                    Loading...
                </Loader>
            ):(
                <TableRouters routers={routers} updateRouter={updateRouter} onDeleteRouter={onDeleteRouter} sendCommand={sendCommand} configFromFile={configFromFile} commandSended={commandSended}/>
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