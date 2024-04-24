// import { Error_MESSAGE } from '@renderer/context/AuthContext'
// import useAuthProvider from '@renderer/hooks/useAuthProvider'
import { NameFormatter } from '@renderer/hoc/NameFormatter'
import React from 'react'
// import { useNavigate } from 'react-router-dom'

export interface FormTableProps {
  dataHeader: string[]
  participantList: any
  handleFetchUserDetail: (qr_code: string) => void
  isLoading: boolean
  isSubmitted: boolean
  error: any
  paginationValue?: number
  totalDataCount?: number
}

const FormTable: React.FC<FormTableProps> = ({
  dataHeader,
  participantList,
  handleFetchUserDetail,
  isLoading,
  isSubmitted,
  error,
  paginationValue,
  totalDataCount
}) => {
//   const navigate = useNavigate()
//   const { handleLogout } = useAuthProvider()
//   const handleLogoutHandler = () => {
//     handleLogout()
//     navigate('/')
//   }
  const marginRightValue = (value) =>{
    const length = value.toString().length;
    if (length === 1) return length * 2 + "rem"
    return length * 1 + "rem"
   
  }
  return (
    <div>
      <h1 className="w-[97vw] m-auto text-xl font-bold mb-4">Participant ({totalDataCount})</h1>
      <div className="flex w-[97vw] mx-auto h-fit justify-between bg-primary">
        {dataHeader.map((header, index) => (
          <div
          style={{marginRight: marginRightValue(paginationValue) }}
            key={index}
            className={` ${index === 0 ? 'w-fit' : 'w-full'} text-white p-1 py-2`}
          >
            {header}
          </div>
        ))}
      </div>
      <div>
        {participantList &&
        paginationValue !== null &&
        paginationValue !== undefined &&
        participantList.length > 0 ? (
          participantList.map((data: any, index: number) => {
            // if()
            return (
              <div
                key={index}
                className={` w-[97vw] mx-auto h-fit ${data.card_printed === 'yes' ? 'bg-green-200' : ''} flex justify-between bg-gray-100`}
              >
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2  justify-start mr-6  min-w-fit  "
                >
                  {1 + paginationValue + index}.
                </div>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2 flex flex-row flex-wrap justify-start  break-words  text-wrap h-fit w-full"
                >
                  {/* {data.full_name} */}
                  <NameFormatter fullName={data.full_name} />
                </div>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2 flex flex-col flex-wrap justify-start  break-words px-2  text-wrap h-fit w-full"
                >
                  {data.email}
                  <p>{data.phone}</p>
                </div>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2 flex flex-row flex-wrap justify-start px-2  break-words text-wrap h-fit w-full"
                >
                  {data.position}
                </div>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2 flex flex-row flex-wrap justify-start break-words px-2 text-wrap h-fit w-full"
                >
                  {data.organization_name}
                </div>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2 flex flex-row flex-wrap justify-start  break-words px-2 text-wrap h-fit w-full"
                >
                  {data.hall}
                </div>

                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2 flex flex-row flex-wrap justify-start break-words px-2 text-wrap h-fit w-full"
                >
                  {data.qr_code}
                </div>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="p-2 flex flex-row flex-wrap justify-start break-words px-2 text-wrap h-fit w-full"
                >
                  <button
                    onClick={() => handleFetchUserDetail(data.qr_code)}
                    className="bg-primary p-2 px-4 text-white"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            )
          })
        ) : participantList &&
          participantList.length === 0 &&
          !isLoading &&
          isSubmitted &&
          error.state !== true ? (
          <div className="w-full h-fit mt-4 flex justify-center items-center">
            <p className="text-red-500 text-md">No data found</p>
          </div>
        ) : error.state === true ? (
          <div className="w-full h-60  mt-4 flex flex-col justify-center items-center">
            <p className="text-red-500 text-md">{error.message}</p>
          
          </div>
        ) : (
          isLoading &&
          isSubmitted && (
            <div className="w-full h-fit mt-4 flex justify-center items-center">
              <div className=" animate-spin h-32 "></div>
              <p className="text-black text-lg">Loading...</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default FormTable
