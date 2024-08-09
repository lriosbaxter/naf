import React, {useEffect, useState} from 'react'
import {AddEditSiteForm, HeaderPage, TableSites} from "../../components/Admin";
import {Loader} from "semantic-ui-react";
import {useSite} from "../../hooks";
import {ModalBasic} from "../../components/Common";

export function Sites() {
    const { loading, sites, devices, getSites,deleteSite, retrieveAllDevices } = useSite()

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const [refetch, setRefetch] = useState(false)


    useEffect(() => {
        getSites()
        retrieveAllDevices()
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev)
    const onRefetch = () => setRefetch((prev) => !prev)

    const addSite = () => {
        setTitleModal("New site")
        setContentModal(<AddEditSiteForm onClose={openCloseModal} onRefetch={onRefetch}/>)
        openCloseModal()
    }

    const updateSite = (data) => {
        setTitleModal("Edit site")
        setContentModal(<AddEditSiteForm
            onClose={openCloseModal}
            onRefetch={onRefetch}
            site={data}/>)
        openCloseModal()
    }

    const onDeleteSite = async (data) => {
        const result = window.confirm(`Delete site ${data.site_name}?`)
        if (result){
            try {
                await deleteSite(data.id)
                onRefetch();
            } catch (error) {
                console.log('Error')
            }
        }
    }
    return (
        <>
            <HeaderPage title={'Sites'} btnTitle={"Add a site"} btnClick={addSite}/>
            {loading ?(
                <Loader active inline={"centered"}>
                    Loading...
                </Loader>
            ):(
                <TableSites sites={sites} updateSite={updateSite} onDeleteSite={onDeleteSite} devices={devices}/>
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