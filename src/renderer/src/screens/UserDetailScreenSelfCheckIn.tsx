import { separateChar } from '@renderer/utility/seperateChar'
import '../styles/detailScreen.css'
import NavBar2 from '@renderer/layout/NavBar2'
import { NameFormatter } from '@renderer/hoc/NameFormatter'
const UserDetailScreenSelfCheckIn = ({ participantData, qrValue, handleGoBack, handlePrint, printStatus }) => {
  const Hall = 'Sur Sudha Sargam Hall'
  const fullNameArray = participantData.full_name.toUpperCase().split(' ');

  return (
    <>
      <NavBar2 />
      <div className={`flex w-[97vw] relative  m-auto  h-fit  py-4 justify-items-start  items-center gap-x-3`}>
      <h1 className="text-left text-3xl  font-bold">
          Welcome to Nepal Investment Summit 2024
        </h1>
        <div
        className={`w-1/3 absolute right-0   flex m-auto my-4 h-fit flex-row ${printStatus.message.length > 0 ? 'justify-between' : 'justify-end'}  items-center`}
      >
        {printStatus.message.length > 0 && (
          <div
            className={`    h-fit p-2 flex    ${printStatus.state === true ? '' : ' w-fit'}`}
          >
            {
              <span
                className={`font-bold ${printStatus.state === true ? 'text-green-500' : 'text-red-500'} `}
              >
                {printStatus.message}
              </span>
            }
          </div>
        )}
        <button onClick={handleGoBack} className="bg-primary text-white px-4 py-2 rounded-md">
          Go Back
        </button>
      </div>
        
        
      </div>

      <div className="bg-white w-[97vw] flex lg:flex-row md:flex-row flex-col py-4  lg:items-start md:items-start items-center  justify-between h-fit mt-1  m-auto   rounded-md">
        {/* User Data Section */}

        <div className=" max-h-fit w-1/2  p-2">
          <h1>
            <p className="font-bold text-2xl flex flex-row gap-x-2 mb-6 text-primary">
              {participantData.title}
              {/* {participantData.full_name} */}
              <NameFormatter fullName={participantData.full_name} />
            </p>
          </h1>

          <div className="flex lg:flex-row md:flex-row flex-col h-full w-full  items-start  justify-between">
            <div className="h-full">
              <p className="font-bold">Position</p>
              <p>{participantData.position ===null ? "-": participantData.position}</p>

              <p className="font-bold  mt-4">Organization Name</p>
              <p>{participantData.organization_name === null ? "-": participantData.organization_name}</p>
              <p className="font-bold  mt-4">Phone no</p>
              <p>{participantData.phone === null || participantData.phone.length === 0 ? '-' : participantData.phone}</p>
              <p className="font-bold  mt-4">Email</p>
              <p>{participantData.email.length === 0 ? '-' : participantData.email}</p>

              <p className="font-bold  mt-4 bg-yellow-300 w-fit px-1">
                {' '}
                {separateChar(participantData.registration_fee_detail, '(')}
              </p>
            </div>
            <span></span>
            <div className="">
              <p className="font-bold  mt-4">Hall </p>
              <p>{participantData.hall}</p>
              <p className="font-bold  mt-4">Country</p>
              <p>{participantData.country_name}</p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div>
          <div className="flex items-center border-2 bg p-4 mt-6  rounded-md border-black/40 justify-center w-[75mm] gap-x-2  h-[50mm]   pl-2 ">
            <div className="flex flex-col w-1/2 items-center relative justify-center">
              {participantData.hall === Hall && (
                <div className="h-1 w-1 absolute top-1 bg-black"></div>
              )}
              <img
                src={qrValue}
                alt="qr-code"
                // className={`  h-auto ${participantData.full_name.length < 15 ? 'w-16 mt-5' : 'w-28'}`}
                className="w-[20mm] h-[25mm] object-contain "
              />
              <p className="text-[8px] absolute bottom-0">{participantData.qr_code}</p>
            </div>
            {/* <p></p> */}
            <div className="w-fit ">
              <h1 style={{ wordBreak: 'break-word' }} className={`userTitle font-serif ${fullNameArray[0].length > 12 ? 'text-[14px] ' : " text-lg"}`}>
                {' '}
                {participantData.title.toUpperCase()} {participantData.full_name.toUpperCase()}
              </h1>
              <div className="">
                <h1 className={`userPosition font-serif  ${fullNameArray[0].length > 12 ? 'text-[12px]' : ""} `}> {participantData.position}</h1>

                <h1 className={`userOrganization font-serif ${fullNameArray[0].length > 12 ? 'text-[10px]' : ""}`}>
                  {' '}
                  {participantData.organization_name}
                </h1>
              </div>
            </div>
          </div>
          {participantData.card_printed !== 'yes'  && <button
            onClick={handlePrint}
            className={`bg-green-500 text-white px-4 w-full mt-2  py-3 rounded-md print`}
          >
            Print your Sticker
          </button>}
        </div>
      </div>
      {/* <div
        className={`w-[97vw] bg-slate-500  flex m-auto my-4 h-fit flex-row ${printStatus.message.length > 0 ? 'justify-between' : 'justify-end'} gap-x-3 items-center`}
      >
        {printStatus.message.length > 0 && (
          <div
            className={`    h-fit p-2 flex    ${printStatus.state === true ? ' lg:w-[85vw] md:w-[80vw] w-[80vw]' : ' w-full'}`}
          >
            {
              <span
                className={`font-bold ${printStatus.state === true ? 'text-green-500' : 'text-red-500'} `}
              >
                {printStatus.message}
              </span>
            }
          </div>
        )}
      </div> */}
    </>
  )
}

export default UserDetailScreenSelfCheckIn
