import React, { useEffect, useState } from 'react'
import Header from './Header'
import Table from '../common/Table/Table'
import { map } from 'lodash'
import { postRequestAsync } from '../utils/apiInstance'
import urls from '../utils/apiUrls'
import ViewTransactionModal from './ViewTransactionModal'
import moment from 'moment'
import { notifyError, notifySuccess } from '../utils/alert'

const Home = () => {

  const [customerDetails, setCustomerDetails] = useState([])
  const [showTransaction, setShowTransaction] = useState(false)
  const [currentTransactionDetails, setCurrentTransactionDetails] = useState([])
  const [products, setProducts] = useState([])
  const [belowAmount, setBelowAmount] = useState('')
  const [belowAccountDetails, setBelowAccountDetails] = useState([])

  useEffect(() => {
    const getActiveCustomer = async () => {
      try {
        const response = await postRequestAsync(urls.GET_CUSTOMER, {})
        if(response.success) {
          const temp = map(response.data, (item) => {
            return {
              id: item._id,
              name: item.name,
              address: item.address,
              accountNumber: item.account,
            }
          })
          setCustomerDetails(temp)
        } else {
          notifyError("Something went wrong")
          console.log(response)
        }
      } catch (error) {
        notifyError("Something went wrong")
        console.log("error", error)
      }
    }

    const getAvailableProducts = async () => {
      try {
        const response = await postRequestAsync(urls.GET_PRODUCTS, {})
        if(response.success) {
          setProducts(response.data)
        } else {
          notifyError("Something went wrong")
          console.log(response)
        }
      } catch (error) {
        notifyError("Something went wrong")
        console.log(error)
      }
    }

    getActiveCustomer()
    getAvailableProducts()
  }, [])

  useEffect(() => {
    if(!belowAmount) {
      setBelowAccountDetails([])
    }
  }, [belowAmount])

  const viewTransaction = async (accountNumber) => {
    try {
      const response = await postRequestAsync(urls.GET_TRANSACTION, {
        accountID: accountNumber
      })
      if(response.success) {
        if(response?.data?.transactions) {
          const temp = map(response.data.transactions, (item) => {
            return {
              id: item._id,
              date: moment(item.date).format('MMMM Do YYYY, h:mm:ss a'),
              amount: item.amount
            }
          })
          setCurrentTransactionDetails(temp)
        }
        
      }
    } catch (error) {
      notifyError("Something went wrong")
      console.log(error)
    }
  }

  const handleAccountNumberClick = (accountNumber) => {
    setShowTransaction(true)
    if(accountNumber) {
      viewTransaction(accountNumber)
    }
  }

  const getTransactionBelow = async () => {
    try {
      const response = await postRequestAsync(urls.GET_TRANSACTION_BELOW, {
        amount: belowAmount
      })
      if(response.success) {
        if(response?.data) {
          const temp = map(response.data, (item) => {
            return {
              accountNumber: item
            }
          })
          setBelowAccountDetails(temp)
        }
        
      }
    } catch (error) {
      notifyError("Something went wrong")
      console.log(error)
    }
  }

  return (
    <div>
      <Header />
      
      <ViewTransactionModal 
        showModal={showTransaction}
        setShowModal={setShowTransaction}
        currentTransactionDetails={currentTransactionDetails}
        setCurrentTransactionDetails={setCurrentTransactionDetails}
      />

      {/* Active Customer Details */}
      <div className='my-10 md:mx-10 mx-2'>
        <h1 className='text-2xl font-semibold'>Active Customer Details</h1>
        <div className='flex justify-center my-5'>
          <div className='min-w-72 w-full'>
              <Table
                headers={{
                  name: "Name",
                  address: "Address",
                  accountNumber: "Account Number"
                }}
                data={customerDetails}
                handleAccountNumberClick={handleAccountNumberClick}
              />
          </div>
        </div>
      </div>

      {/* List */}
      <div className='my-10 md:mx-10 mx-2'>
        <span className='text-2xl font-semibold'>List of Account Number which has made at least one transaction below: </span>
        <input
          value={belowAmount}
          placeholder='Add amount'
          type="number"
          className='p-2 border border-black rounded-lg ml-2'
          onChange={(e) => {
            setBelowAmount(e.target.value)
          }}
        />
        <button
          disabled={!belowAmount}
          onClick={getTransactionBelow}
          className={`p-2 bg-blue-500 text-white rounded-lg ml-2 ${!belowAmount ? "cursor-not-allowed bg-slate-400" : ""}`}
        >Search</button>
        <div>
          {/* <h3 className='text-xl'>Account Number List</h3> */}
          <div>

            {belowAccountDetails.length ? 
              map(belowAccountDetails, (i) => <li key={i.accountNumber}>{i.accountNumber}</li>) : 
              <span>No account number found</span>
            }
          </div>
        </div>
      </div>



      {/* Available Products */}
      <div className='my-10 md:mx-10 mx-2'>
        <h1 className='text-2xl font-semibold'>Distinct Products Available</h1>
        <div>
          {map(products, (i) => <li key={i}>{i}</li>)}
        </div>
        
      </div>
      
    </div>
  )
}

export default Home