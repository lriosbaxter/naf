import React, {useEffect, useState} from 'react'
import {useUser} from "../../hooks";
import {HeaderPage, TableUsers, AddEditUserForm} from "../../components/Admin";
import {Loader} from "semantic-ui-react";
import {ModalBasic} from "../../components/Common";

export function UserAdmin() {
    const { loading, users, getUsers, deleteUser } = useUser()

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        getUsers()
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev)
    const onRefetch = () => setRefetch((prev) => !prev)
    const addUser = () => {
        setTitleModal("New user")
        setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch}/>)
        openCloseModal()
    }

    const updateUser = (data) => {
        setTitleModal("Edit user")
        setContentModal(<AddEditUserForm
                            onClose={openCloseModal}
                            onRefetch={onRefetch}
                            user={data}/>)
        openCloseModal()

    }

    const onDeleteUser = async (data) => {
        const result = window.confirm(`Delete user ${data.email}?`)
        if (result){
            try {
                await deleteUser(data.id)
                onRefetch();
            } catch (error) {
                console.log('Error')
            }
        }
    }

    return (
        <>
            <HeaderPage title={'Users'} btnTitle={"Add user"} btnClick={addUser}/>
            {loading ?(
                <Loader active inline={"centered"}>
                    Loading...
                </Loader>
            ):(
                <TableUsers users={users} updateUser={updateUser} onDeleteUser={onDeleteUser}/>
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