import React, { useEffect, useState } from 'react'
// import { PosPrinter, PosPrintData, PosPrintOptions } from 'electron-pos-printer'
// import * as path from 'path'
// import QRCode from 'react-qr-code'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { Error_MESSAGE, LiveServer, Server, TestServer } from '@renderer/context/AuthContext'
// import useAuthProvider from '@renderer/hooks/useAuthProvider'
import NavBar from '@renderer/layout/NavBar'
import LoaderComponent from '@renderer/components/LoaderComponent'
// import UserDetailScreen from './UserDetailScreen'
import QrPrintComponent from '@renderer/components/QrPrintComponent'
import ThankYouModal from '@renderer/components/ThankYouModal'
import useAuthProvider from '@renderer/hooks/useAuthProvider'
import UserDetailScreenSelfCheckIn from './UserDetailScreenSelfCheckIn'

// interface dataProps {
//   name: string
// }

const UserSearch = () => {
  console.log('Main Page rendered')
  const { server, setServer } = useAuthProvider()
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState({
    state: false,
    message: ''
  })
  // const [result, setResult] = useState<dataProps[] | null>(null)
  // const [isSubmitted, setIsSubmitted] = useState(false)
  // const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAlreadyPrinted, setIsAlreadyPrinted] = useState(false)
  const [printModal, setPrintModal] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isPrint, setIsPrint] = useState(false)
  const [error, setError] = useState({
    state: false,
    message: ''
  })
  const [printStatus, setPrintStatus] = useState({
    state: false,
    message: ''
  })

  console.log(printModal)

  const [qrValue, setQrValue] = useState<any | null>(null)
  // const { token } = useAuthProvider()
  const navigate = useNavigate()
  const [participantData, setParticipantData] = useState<any | null>(null)
  // const [server, setServer] = useState(() => {
  //   if (window.localStorage.getItem('server') === 'test') {
  //     axios.defaults.baseURL = TestServer.BASE_URL

  //     return {
  //       state: 'test'
  //     }
  //   } else {
  //     axios.defaults.baseURL = LiveServer.BASE_URL
  //     return {
  //       state: 'live'
  //     }
  //   }
  // })
  const [showThankyouMessage, setShowThankyouMessage] = useState(false)
  const ipcHandle = () => window.electron.ipcRenderer.invoke('QR-Generate')
  const ipcResponseSuccess = () =>
    window.electron.ipcRenderer.on('print-success', (args) => {
      console.log(args)
      setShowThankyouMessage(true)
      UpdateQRCodePrintStatus(participantData.qr_code)
      setIsPrint(false)
      setIsAlreadyPrinted(true)
      setTimeout(() => {
        setParticipantData(null)
        setShowThankyouMessage(false)
        setIsAlreadyPrinted(false)
        setError({
          state: false,
          message: ''
        })
        setPrintStatus({
          state: false,
          message: ''
        })
      }, 2000)
    })
  const ipcResponseError = () =>
    window.electron.ipcRenderer.on('print-error', (args) => {
      console.log(args)
      setIsPrint(false)
      setPrintStatus({
        state: false,
        message: JSON.stringify(args)
      })
    })

  // Call the function with the URL of the image you want to load

  //handle change server function
  const handleChangeServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'test') {
      setServer({
        state: Server.test
      })
      axios.defaults.baseURL = TestServer.BASE_URL
      axios.defaults.data = { token: TestServer.token }
      window.localStorage.setItem('token', TestServer.token)
      window.localStorage.setItem('server', 'test')
    } else {
      setServer({
        state: Server.live
      })
      axios.defaults.baseURL = LiveServer.BASE_URL
      axios.defaults.data = { token: LiveServer.token }
      window.localStorage.setItem('token', LiveServer.token)
      window.localStorage.setItem('server', 'live')
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('server') === 'test') {
      setServer({
        state: Server.test
      })
      axios.defaults.baseURL = TestServer.BASE_URL
    } else {
      setServer({
        state: Server.live
      })
      axios.defaults.baseURL = LiveServer.BASE_URL
    }
  }, [])
  // handle change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      state: false,
      message: ''
    })
    setInputError({
      state: false,
      message: ''
    })
    if (e.target.value.length >= 6) {
      setIsLoading(true)
      fetchUserDetail(e.target.value)
    }
    setInput(e.target.value)
  }

  const fetchUserDetail = async (value) => {
    try {
      const result = await axios.get(
        `${axios.defaults.baseURL}/api/search-qr-code?qr_code=${value}`,
        {
          headers: {
            'Content-Type': 'application/json'
            // Authorization: `Bearer ${token}`
          }
        }
      )
      const data = result.data
      console.log(data)

      setParticipantData(data.data.particiapnt)
      setQrValue(data.data.qr_code_link)
      if (data.data.particiapnt.card_printed === 'yes') {
        setPrintStatus({
          state: false,
          message: 'Card Already Printed'
        })
        setIsAlreadyPrinted(true)
      }
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        setError({
          state: true,
          message: error.response?.data.message
        })
        setInput('')
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }
  const UpdateQRCodePrintStatus = async (qr_code) => {
    try {
      const result = await axios.get(`${axios.defaults.baseURL}/api/update-print-status`, {
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer ${token}`
        },
        params: {
          qr_code: qr_code
        }
      })
      const data = result.data
      setPrintStatus({
        state: true,
        message: 'Card Printed Successfully'
      })
      console.log(data, 'print status Updated')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        setPrintStatus({
          state: false,
          message: error.response?.data.message
        })
      }
    } finally {
      setTimeout(() => {
        setIsPrint(false)
      }, 500)
    }
  }

  const validate = () => {
    let isValid = true

    if (input.length !== 0 && input.length < 6) {
      setInputError({
        state: true,
        message: 'Please enter a valid QR code'
      })
      isValid = false
      setInput('')
      return isValid
    } else if (input.length === 0) {
      setInputError({
        state: true,
        message: 'Please enter a QR code'
      })
      isValid = false
      return isValid
    }
    return isValid
  }

  // handle submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    setIsLoading(true)
    fetchUserDetail(input)
  }

  const handleGoBack = () => {
    // navigate('/main')
    setParticipantData(null)
    setPrintStatus({
      state: false,
      message: ''
    })
    setIsAlreadyPrinted(false)
    setInput('')
  }

  const handlePrint = () => {
    console.log('printing')
    if (participantData.card_printed === 'yes' || isAlreadyPrinted) {
      setPrintModal(true)
      setPrintStatus({
        state: false,
        message: 'Card Already Printed'
      })
      setIsAlreadyPrinted(true)

      if (server.state === Server.test) {
        setIsPrint(true)
        ipcHandle()
        ipcResponseSuccess()
        ipcResponseError()
        setInput('')
      }
      return
    }
    if (!isAlreadyPrinted) {
      setIsPrint(true)
      ipcHandle()
      ipcResponseSuccess()
      ipcResponseError()
      setInput('')
      // setTimeout(() => {
      //   setIsPrint(false)
      // }, 2000)
    }
  }
  // const handlePrintWithWarning = () => {
  //   setPrintModal(false)
  //   setIsPrint(true)
  //   ipcHandle()
  //   ipcResponseSuccess()
  //   ipcResponseError()
  //   setInput('')
  // }

  // const handleModalClose = () => {
  //   setPrintModal(false)
  // }
  if (participantData && !isPrint && !isLoading) {
    console.log(participantData)
    console.log(qrValue)
    return (
      <>
        {!showThankyouMessage ? (
          <UserDetailScreenSelfCheckIn
            participantData={participantData}
            qrValue={qrValue}
            handleGoBack={handleGoBack}
            handlePrint={handlePrint}
            printStatus={printStatus}
          />
        ) : (
          <ThankYouModal participantData={participantData} />
        )}
        {/* {printModal && (
          <div className="absolute grid place-items-center inset-0 bg-black/20 ">
            <div className="w-1/4 rounded-lg bg-white flex flex-col justify-start gap-y-6 pt-10 items-center h-1/3">
              <h1 className="font-bold text-xl">This Card is Already Printed</h1>
              <h1 className="font-semibold text-lg">Do you Want to Print it again?</h1>
              <div className="w-full  flex m-auto my-4 h-fit flex-row justify-around items-center">
                <button
                  onClick={handlePrintWithWarning}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={handleModalClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )} */}
      </>
    )
  }

  if (isPrint && qrValue) {
    return <QrPrintComponent participantData={participantData} qrValue={qrValue} />
  }

  return (
    <>
      <NavBar />
      <div className="flex w-full h-fit justify-between ">
        <select className=" outline-none" value={server.state} onChange={handleChangeServer}>
          {/* <option value="">Choose</option> */}
          <option value={Server.live}>live server</option>
          <option value={Server.test}>test server</option>
        </select>
        {/* <button
          className="bg-primary text-white  p-2  m-1 mx-4"
          onClick={() => navigate('/advanced-search')}
        >
          Advanced Search
        </button> */}
      </div>
      <div className=" bg-transparent">
        <h1 className="text-4xl font-bold text-center mt-20 mb-4  text-primary">
          Self Check-In Form
        </h1>
      </div>
      <div className="flex flex-col h-fit   mb-10 justify-center items-center">
        <h1 className="text-xl opacity-50 font text-center mt-0 mb-5 ">
          {' '}
          Please enter or scan the QR code to Print your pass{' '}
        </h1>
        <div className=" w-10/12 m-auto h-fit flex flex-col py-6 items-center bg-gray-100 shadow-lg rounded-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center justify-center"
          >
            <div className="flex h-fit w-11/12 flex-row justify-center items-center gap-x-3 ">
              <input
                autoFocus={true}
                name="name"
                value={input}
                onChange={handleChange}
                type="text"
                className={`w-full h-10 rounded-md border p-4 ${inputError.state === true ? 'border-red-500' : 'border-gray-300'} `}
                placeholder="Enter your QR code here "
              />
              <button type="submit" className="w-20 h-10 bg-green-600 text-white rounded-md ">
                Submit
              </button>
            </div>
            {<p className="text-red-500"> {inputError.message}</p>}
          </form>
        </div>
        <div className="w-full h-40 flex flex-col items-center justify-center">
          <p className="text-red-500 text-sm">{error.state && error.message}</p>
          {error.state && error.message === Error_MESSAGE && (
            <button
              onClick={() => navigate('/')}
              className="text-white bg-blue-900 p-2 m-1 text-sm"
            >
              Login Again
            </button>
          )}
          {printStatus.state}
        </div>
        {isLoading && <LoaderComponent />}
      </div>
    </>
  )
}

export default UserSearch
