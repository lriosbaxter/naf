import React, { useEffect, useState } from 'react'
import { useSourceFolder } from '../../hooks'
import { HeaderPage } from '../../components/Admin';
import { Loader } from 'semantic-ui-react';
import TableFolders from '../../components/Admin/Folders/TableFolders/TableFolders';
import { ModalBasic } from '../../components/Common';
import { AddEditFolderForm } from '../../components/Admin/Folders';

export function Folders() {
  const { loading, sourceFolders, getAllSourceFolders, deleteFolder } = useSourceFolder();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getAllSourceFolders();
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addFolder = () => {
    setTitleModal("New Automation Folder")
    setContentModal(<AddEditFolderForm onClose={openCloseModal} onRefetch={onRefetch}/>)
    openCloseModal()
  }
  const updateFolder = (data) => {
    setTitleModal("Edit Automation Folder")
    setContentModal(<AddEditFolderForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        folder={data}/>)
    openCloseModal()
}

const onDeleteFolder = async (data) => {
    const result = window.confirm(`Delete folder ${data.name_source}?`)
    if (result){
        try {
            await deleteFolder(data.id)
            onRefetch();
        } catch (error) {
            console.log('Error')
        }
    }
}
  return (
  <>
    <HeaderPage title='Scripts' btnTitle={"Add a folder"} btnClick={addFolder}/>
    {loading ?(
      <Loader active inline="centered">
        Loading...
      </Loader>
    ): (
      <TableFolders sourceFolders={sourceFolders} addFolder={addFolder} updateFolder={updateFolder} onDeleteFolder={onDeleteFolder} />
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