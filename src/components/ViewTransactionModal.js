import React from 'react'
import Modal from '../common/Modal/Modal'
import Table from '../common/Table/Table'

const ViewTransactionModal = ({
  showModal,
  setShowModal,
  currentTransactionDetails,
  setCurrentTransactionDetails
}) => {

  const handleOnClose = () => {
    setShowModal(false)
    setCurrentTransactionDetails([])
  }

  const ModalBody = (
    <div>
      <Table
        headers={{
          date: "Date",
          amount: "Amount",
        }}
        data={currentTransactionDetails || []}
        handleAccountNumberClick={() => {}}
      />
    </div>
  )
  return (
    <div
      className='max-h-[90%]'
    >
      <Modal
        showModal={showModal}
        heading='View Transaction'
        body={ModalBody}
        handleOnClose={handleOnClose}
      />
    </div>
  )
}

export default ViewTransactionModal