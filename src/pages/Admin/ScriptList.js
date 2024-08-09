import React, { useEffect, useState } from 'react'
import { useScript } from '../../hooks'
import { HeaderPage } from '../../components/Admin';
import { Loader } from 'semantic-ui-react';
import TableScripts from '../../components/Admin/Scripts/TableScripts/TableScripts';
import { ModalBasic } from '../../components/Common';
import { AddEditScriptForm, SourceCode } from '../../components/Admin/Scripts';

export function ScriptList() {
  
  const { loading, scripts, getAllScripts, deleteScript  } = useScript();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);


  useEffect(() => {
    getAllScripts();
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addScript = () => {
    setTitleModal("New Automation Script")
    setContentModal(<AddEditScriptForm onClose={openCloseModal} onRefetch={onRefetch}/>)
    openCloseModal()
  }
  const updateScript = (data) => {
    setTitleModal("Edit Automation Script")
    setContentModal(<AddEditScriptForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        script={data}/>)
    openCloseModal()
}

const loadSourceCode = (script) => {
  setTitleModal(`Source code`)
  setContentModal(<SourceCode
    onClose={openCloseModal}
    onRefetch={onRefetch}
    script={script}/>)
  openCloseModal()
}

const onDeleteScript = async (data) => {
    const result = window.confirm(`Delete script ${data.title}?`)
    if (result){
        try {
            await deleteScript(data.id)
            onRefetch();
        } catch (error) {
            console.log('Error')
        }
    }
}
  return (
    <>
      <HeaderPage title='Scripts' btnTitle={"Add a script"} btnClick={addScript}/>
      {loading ?(
        <Loader active inline="centered">
          Loading...
        </Loader>
      ): (
        <TableScripts scripts={scripts} addScript={addScript} updateScript={updateScript} onDeleteScript={onDeleteScript} loadSourceCode={loadSourceCode}/>
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