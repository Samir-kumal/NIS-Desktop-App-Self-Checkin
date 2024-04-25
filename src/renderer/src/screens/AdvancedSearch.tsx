import { authToken, BASE_URL } from '@renderer/context/AuthContext'
// import useAuthProvider from '@renderer/hooks/useAuthProvider'
// import NavBar from '@renderer/layout/NavBar'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import UserDetailScreen from './UserDetailScreen'
import QrPrintComponent from '@renderer/components/QrPrintComponent'
import LoaderComponent from '@renderer/components/LoaderComponent'
// import SearchForm from '@renderer/components/AdvancedSearch/SearchForm'
// import FormTable from '@renderer/components/AdvancedSearch/FormTable'
import SearchForm from '@renderer/components/SearchForm'
import FormTable from '@renderer/components/FormTable'
import NavBar2 from '@renderer/layout/NavBar2'
import { useNavigate } from 'react-router-dom'
import { isValidEmail } from '@renderer/utility/isEmailValid'
import ThankYouModal from '@renderer/components/ThankYouModal'

export interface CountryData {
  id: number
  name: string
}

export interface participantList {
  full_name: string
  email: string
  phone: string
  card_printed: string
  qr_code: string
}

export interface RegistrationCategory {
  category: string

  currency: string
  event_id: string
  id: string
  is_active: string
  name: string
  rate: string
  show_in_registration_page: string
  type: string
}

export interface HallData {
  id: number
  title: string
}



const AdvancedSearch = () => {
  const token = authToken;
  // const { user } = useAuthProvider()
  const navigate = useNavigate()
  const [participantList, setParticipantList] = useState<[] | null>(null)
  const [participantData, setParticipantData] = useState<any | null>(null)
  const [countryData, setCountryData] = useState<CountryData[] | null>([])
  const [registrationCategory, setRegistrationCategory] = useState<RegistrationCategory[] | null>(
    []
  )
  const [showThankyouMessage, setShowThankyouMessage] = useState(false)

  const [hallData, setHallData] = useState<HallData[] | null>([])
  const [isPrint, setIsPrint] = useState(false)
  const [isAlreadyPrinted, setIsAlreadyPrinted] = useState(false)
  const [qrValue, setQrValue] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [printModal, setPrintModal] = useState(false)
  const [printStatus, setPrintStatus] = useState({
    state: false,
    message: ''
  })
  const [error, setError] = useState({
    state: false,
    message: ''
  })
  const [input, setInput] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    reg_category: '',
    organization: '',
    contact: '',
    regNo: '',
    qr_code: '',
    country: '',
    hall: ''
  })
  const [inputError, setInputError] = useState({
    fnameError: false,
    fnameMessage: '',
    mnameError: false,
    mnameMessage: '',
    lnameError: false,
    lnameMessage: '',
    emailError: false,
    emailMessage: '',
    // reg_categoryError: true,
    // reg_categoryMessage: '',
    // organizationError: true,
    // organizationMessage: '',
    contactError: false,
    contactMessage: '',
    regNoError: true,
    regNoMessage: ''
    // qr_codeError: true,
    // qr_codeMessage: '',
    // countryError: true,
    // countryMessage: ''
    // hallError: true,
    // hallMessage: ''
  })
  const [pageSize, setPageSize] = useState(0)
  const [totalDataCount, setTotalDataCount] = useState(0)

  const isValid = () => {
    if (
      input.fname.length === 0 &&
      input.lname.length === 0 &&
      input.email.length === 0
      // &&
      // input.contact.length === 0
    ) {
      setInputError((prevState) => ({
        ...prevState,
        fnameError: true,
        fnameMessage: 'First Name is required',

        lnameError: true,
        lnameMessage: 'Last Name is required',
        emailError: true,
        emailMessage: 'Email is required'
        // contactError: true,
        // contactMessage: 'Contact is required'
      }))
      return false
    }
    if (
      input.fname.length !== 0 &&
      input.lname.length === 0 &&
      input.email.length === 0
      //  &&
      // input.contact.length === 0
    ) {
      setInputError((prevState) => ({
        ...prevState,

        lnameError: true,
        lnameMessage: 'Last Name is required',
        emailError: true,
        emailMessage: 'Email is required'
        // contactError: true,
        // contactMessage: 'Contact is required'
      }))
      return false
    }
    if (
      input.fname.length === 0 &&
      input.lname.length === 0 &&
      input.email.length !== 0 &&
      !isValidEmail(input.email)
      //  &&
      // input.contact.length === 0
    ) {
      setInputError((prevState) => ({
        ...prevState,
        fnameError: true,
        fnameMessage: 'First Name is required',
        lnameError: true,
        lnameMessage: 'Last Name is required',

        emailError: true,
        emailMessage: 'Email is not Valid'
        // contactError: true,
        // contactMessage: 'Contact is required'
      }))
      return false
    }
    if (
      input.fname.length !== 0 &&
      input.lname.length === 0 &&
      input.email.length !== 0 &&
      !isValidEmail(input.email)
      // &&
      // input.contact.length === 0
    ) {
      setInputError((prevState) => ({
        ...prevState,
        lnameError: true,
        lnameMessage: 'Last Name is required',

        emailError: true,
        emailMessage: 'Email is not Valid'

        // contactError: true,
        // contactMessage: 'Contact is required'
      }))
      return false
    }
    if (
      input.fname.length !== 0 &&
      input.lname.length === 0 &&
      input.email.length !== 0 &&
      !isValidEmail(input.email)
      //  &&
      // input.contact.length !== 0
    ) {
      setInputError((prevState) => ({
        ...prevState,
        lnameError: true,
        lnameMessage: 'Last Name is required',
        emailError: true,
        emailMessage: 'Email is not Valid'
      }))
      return false
    }

    if (
      input.fname.length === 0 &&
      input.lname.length === 0 &&
      input.email.length !== 0
      //  &&
      // input.contact.length !== 0
    ) {
      setInputError((prevState) => ({
        ...prevState,

        fnameError: true,
        fnameMessage: 'First Name is required',

        lnameError: true,
        lnameMessage: 'Last Name is required'
      }))
      return false
    } else if (input.fname.length === 0) {
      setInputError((prevState) => ({
        ...prevState,
        fnameError: true,
        fnameMessage: 'First Name is required'
      }))
      return false
    }
    // else if (input.mname.length === 0) {
    //   setInputError((prevState) => ({
    //     ...prevState,
    //     mnameError: true,
    //     mnameMessage: 'Middle Name is required'
    //   }))
    //   return false
    // }
    else if (input.lname.length === 0) {
      setInputError((prevState) => ({
        ...prevState,
        lnameError: true,
        lnameMessage: 'Last Name is required'
      }))
      return false
    } else if (input.email.length === 0) {
      setInputError((prevState) => ({
        ...prevState,
        emailError: true,
        emailMessage: 'Email is required'
      }))
      return false
    } else if (!isValidEmail(input.email)) {
      setInputError((prevState) => ({
        ...prevState,
        emailError: true,
        emailMessage: 'Email is not valid'
      }))
      return false
    }
    // else if (input.contact.length === 0) {
    //   setInputError((prevState) => ({
    //     ...prevState,
    //     contactError: true,
    //     contactMessage: 'Contact is required'
    //   }))
    //   return false
    // }
    else if (input.contact.length > 10) {
      setInputError((prevState) => ({
        ...prevState,
        contactError: true,
        contactMessage: 'Contact Number Should Not be more than 10 digits'
      }))
      return false
    } else if (input.contact.length > 0 && input.contact.length < 10) {
      setInputError((prevState) => ({
        ...prevState,
        contactError: true,
        contactMessage: 'Contact Number Should Not be less than 10 digits'
      }))
      return false
    } else {
      return true
    }
  }

  const UpdateQRCodePrintStatus = async (qr_code) => {
    try {
      const result = await axios.get(`${BASE_URL}/api/update-print-status`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
      // UpdateQRCodePrintCount(user.id);
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        // setPrintStatus({
        //   state: false,
        //   message: error.response?.data.message
        // })
      }
    } finally {
      // setTimeout(() => {
      //   setIsPrint(false)
      // }, 500)
    }
  }

  // const UpdateQRCodePrintCount = async (userID) => {
  //   try {
  //     const result = await axios.get(`${BASE_URL}/api/add-print-count`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       },
  //       params: {
  //         user_id: userID
  //       }
  //     })
  //     const data = result.data
  //     console.log(data, 'print count Updated')
  //   } catch (error) {
  //     console.log(error)
  //     if (error instanceof AxiosError) {
  //       // setPrintStatus({
  //       //   state: false,
  //       //   message: error.response?.data.message
  //       // })
  //     }
  //   } finally {
  //     setTimeout(() => {
  //       setIsPrint(false)
  //     }, 500)
  //   }
  // }

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
        setInput({
          fname: '',
          mname: '',
          lname: '',
          email: '',
          reg_category: '',
          organization: '',
          contact: '',
          regNo: '',
          qr_code: '',
          country: '',
          hall: ''
        })
        setParticipantList(null)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      state: false,
      message: ''
    })

    setInputError((prevState) => ({
      ...prevState,
      [`${e.target.name}Error`]: false,
      [`${e.target.name}Message`]: ''
    }))
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setError({
      state: false,
      message: ''
    })
    // handle the option change here
    setInput({
      ...input,
      reg_category: e.target.value
    })
  }
  const handleChangeOptionHall = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setError({
      state: false,
      message: ''
    })
    // handle the option change here
    setInput({
      ...input,
      hall: e.target.value
    })
  }
  const handleChangeOptionCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setError({
      state: false,
      message: ''
    })
    // handle the option change here
    setInput({
      ...input,
      country: e.target.value
    })
  }

  const dataHeader = [
    'SN',
    'Full Name',
    'Contact',
    'Designation',
    'Organization',
    'Hall',
    'QR Code',
    'Actions'
  ]
  const URL = `${BASE_URL}/api/search-list?fname=${input.fname}&mname=${input.mname}&lname=${input.lname}&email=${input.email}&registration_category_new=${input.reg_category}&organization=${input.organization}&phone=${input.contact}&registration_no=${input.regNo}&qr_code=${input.qr_code}&payment_method=&country=${input.country}&hall=${input.hall}&page=${pageSize}`


  
  const fetchData = async (URL, pageSize = 0) => {
    try {
      setIsLoading(true)
      const result = await axios.get(`${URL}&page=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(result.data, 'result from the advanced search')
      setParticipantList(result.data.data)
      const totalCount = JSON.parse(result.data.total_count)
      setTotalDataCount(totalCount)
    } catch (error) {
      console.error('Error fetching data:', error)
      if (error instanceof AxiosError) {
        setError({
          state: true,
          message: error.response?.data.message
        })
      }
    } finally {
      // setInput({
      //   fname: '',
      //   mname: '',
      //   lname: '',
      //   email: '',
      //   organization: '',
      //   contact: '',
      //   regNo: '',
      //   payment: ''
      // })
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }
  const fetchCountryData = async () => {
    try {
      setIsLoading(true)
      const result = await axios.get(`${BASE_URL}/api/country-list`, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      })
      console.log(result.data, 'result from the country data')

      setCountryData(result.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      if (error instanceof AxiosError) {
        setError({
          state: true,
          message: error.response?.data.message
        })
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }
  const fetchRegistrationCategory = async () => {
    try {
      setIsLoading(true)
      const result = await axios.get(`${BASE_URL}/api/list-category`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(result.data, 'result from the registration category data')
      // setCountryData(result.data.data)
      setRegistrationCategory(result.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      if (error instanceof AxiosError) {
        setError({
          state: true,
          message: error.response?.data.message
        })
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  const fetchHallData = async () => {
    try {
      setIsLoading(true)
      const result = await axios.get(`${BASE_URL}/api/list-halls`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(result.data, 'result from the hall data')
      // setCountryData(result.data.data)
      setHallData(result.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      if (error instanceof AxiosError) {
        setError({
          state: true,
          message: error.response?.data.message
        })
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValid()) {
      setIsSubmitted(true)
      console.log(input)
      fetchData(URL)
    }
  }

  useEffect(() => {
    // fetchData(URL)
    fetchCountryData()
    fetchRegistrationCategory()
    fetchHallData()
  }, [token])

  console.log(isAlreadyPrinted, 'is already printed')

  const handlePrint = () => {
    console.log('printing')
    if (participantData.card_printed === 'yes' || isAlreadyPrinted) {
      setPrintModal(true)
      setPrintStatus({
        state: false,
        message: 'Card already printed'
      })
      setIsAlreadyPrinted(true)
      return
    }
    if (!isAlreadyPrinted) {
      setIsPrint(true)
      ipcHandle()
      ipcResponseSuccess()
      ipcResponseError()
    }
  }

  const handleGoBack = () => {
    setParticipantData(null)
    setPrintStatus({
      state: false,
      message: ''
    })
    setIsAlreadyPrinted(false)
    // fetchData(URL)
  }

  const handlePrintWithWarning = () => {
    setPrintModal(false)
    setIsPrint(true)
    ipcHandle()
    ipcResponseSuccess()
    ipcResponseError()
  }

  const handleModalClose = () => {
    setPrintModal(false)
  }
  if (!isLoading && participantData && !isPrint) {
    return (
      <>
        {printModal && (
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
        )}
        {!showThankyouMessage ? (
          <UserDetailScreen
            participantData={participantData}
            qrValue={qrValue}
            handleGoBack={handleGoBack}
            handlePrint={handlePrint}
            printStatus={printStatus}
          />
        ) : (
          <ThankYouModal participantData={participantData} />
        )}
        {/* <UserDetailScreen
          participantData={participantData}
          qrValue={qrValue}
          handlePrint={handlePrint}
          printStatus={printStatus}
          handleGoBack={handleGoBack}
        /> */}
      </>
    )
  }

  if (isPrint && participantData) {
    console.log(qrValue, 'qr value')
    return <QrPrintComponent participantData={participantData} qrValue={qrValue} />
  }

  const handleFetchUserDetail = async (qr_code) => {
    try {
      setIsLoading(true)
      const result = await axios.get(`${BASE_URL}/api/search-qr-code?qr_code=${qr_code}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = result.data
      console.log(data.data, 'result from the user detail')
      setParticipantData(data.data.particiapnt)
      setQrValue(data.data.qr_code_link)
      setIsLoading(false)
      if (data.data.particiapnt.card_printed === 'yes') {
        setIsAlreadyPrinted(true)
        setPrintStatus({
          state: false,
          message: 'Card already printed'
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      if (error instanceof AxiosError) {
        setError({
          state: true,
          message: error.response?.data.message
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDataRefresh = async () => {
    console.log('refreshing data')
    setInput({
      fname: '',
      mname: '',
      lname: '',
      email: '',
      reg_category: '',
      organization: '',
      contact: '',
      regNo: '',
      qr_code: '',
      country: '',
      hall: ''
    })
    // setIsSubmitted(true)
    setIsLoading(true)
    setParticipantList(null)

    setError({
      state: false,
      message: ''
    })
    setInputError({
      fnameError: false,
      fnameMessage: '',
      mnameError: false,
      mnameMessage: '',
      lnameError: false,
      lnameMessage: '',
      emailError: false,
      emailMessage: '',
      contactError: false,
      contactMessage: '',
      regNoError: false,
      regNoMessage: ''
    })
    // const URL = `${BASE_URL}/api/search-list?fname=&mname=&lname=&email=&registration_category_new=&organization=&phone=&registration_no=&qr_code=&payment_method=&country=`
    setPageSize(0)
    // fetchData(URL)
    // setIsLoading(false);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <NavBar2 />

      <div className="w-full h-fit pb-4  relative">
        <div className=" h-fit flex justify-end px-5 mx-auto">
          <button
            onClick={() => navigate('/main')}
            className=" m-1 bg-primary text-white  top-0 z-10 my-2 right-0 p-2 px-4"
          >
            Self Checkin
          </button>
        </div>
        <p className='absolute left-4 top-3  text-red-500'> Note: Please Fill your First name, Last name and Email to Proceed.</p>

        <h1 className="font-bold text-2xl p-4 ml-2">Advanced Search</h1>

        <SearchForm
          input={input}
          inputError={inputError}
          handleChange={handleChange}
          handleChangeOption={handleChangeOption}
          handleChangeOptionHall={handleChangeOptionHall}
          handleChangeOptionCountry={handleChangeOptionCountry}
          handleSubmit={handleSubmit}
          handleDataRefresh={handleDataRefresh}
          countryData={countryData}
          registrationCategory={registrationCategory}
          hallType={hallData}
        />
      </div>
      {participantList && participantList?.length >= 0 && (
        <FormTable
          handleFetchUserDetail={handleFetchUserDetail}
          participantList={participantList}
          totalDataCount={totalDataCount}
          error={error}
          isSubmitted={isSubmitted}
          isLoading={isLoading}
          dataHeader={dataHeader}
          paginationValue={pageSize}
        />
      )}
      {participantList && participantList?.length > 0 && (
        <div className="paginationComponent h-14 w-[97vw] m-auto bg-white flex border-t-4 border-black items-center gap-x-10 justify-end ">
          {pageSize !== 0 && (
            <button
              className="flex items-center justify-center  bg-gray-500  text-white p-2"
              onClick={() => {
                if (pageSize > 0) {
                  setPageSize((prev) => prev - 50)
                  console.log(
                    pageSize,
                    'page size for the participant list is from the previous button'
                  )
                  window.scrollTo(0, 0)
                  fetchData(URL, pageSize - 50)
                }
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M98.4748 11.2747C97.6135 10.8217 96.6445 10.6135 95.6732 10.6727C94.7018 10.732 93.7653 11.0564 92.9654 11.6107L23.6321 59.6107C22.9258 60.1036 22.3489 60.7599 21.9506 61.5236C21.5522 62.2873 21.3442 63.136 21.3442 63.9973C21.3442 64.8587 21.5522 65.7073 21.9506 66.4711C22.3489 67.2348 22.9258 67.891 23.6321 68.384L92.9654 116.384C93.7656 116.938 94.7019 117.262 95.6731 117.322C96.6443 117.381 97.6133 117.174 98.4752 116.722C99.337 116.271 100.059 115.592 100.563 114.76C101.067 113.927 101.333 112.973 101.333 112V16C101.334 15.0265 101.067 14.0715 100.563 13.2385C100.059 12.4055 99.3372 11.7264 98.4748 11.2747ZM90.6668 101.819L36.0374 64L90.6668 26.1813V101.819Z"
                  fill="white"
                />
              </svg>
              <p>Previous Page</p>
            </button>
          )}
          {participantList && participantList?.length >= 50 && totalDataCount >= pageSize && (
            <button
              className="flex items-center justify-center  bg-gray-500 shadow-lg  text-white p-2"
              onClick={() => {
                setPageSize((prev) => prev + 50)
                window.scrollTo(0, 0)

                console.log(pageSize, 'page size for the participant list is from ')
                fetchData(URL, pageSize + 50)
              }}
            >
              <p>Next page </p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.5252 116.725C30.388 117.174 31.3566 117.379 32.3272 117.319C33.2979 117.259 34.2338 116.936 35.0345 116.384L104.368 68.384C105.076 67.8932 105.655 67.238 106.055 66.4744C106.455 65.7109 106.664 64.8619 106.664 64C106.664 63.1381 106.455 62.2891 106.055 61.5256C105.655 60.7621 105.076 60.1068 104.368 59.616L35.0345 11.616C34.2353 11.0584 33.2983 10.731 32.3257 10.6694C31.3531 10.6078 30.3823 10.8143 29.5191 11.2666C28.6558 11.7188 27.9333 12.3994 27.4303 13.2341C26.9273 14.0687 26.6631 15.0255 26.6665 16V112C26.6664 112.974 26.9327 113.929 27.4366 114.762C27.9405 115.594 28.6628 116.274 29.5252 116.725ZM37.3332 26.1813L91.9625 64L37.3332 101.819V26.1813Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      {isLoading && <LoaderComponent />}
    </>
  )
}

export default AdvancedSearch
