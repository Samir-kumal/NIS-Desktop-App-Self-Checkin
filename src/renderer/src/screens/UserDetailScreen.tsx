import { separateChar } from '@renderer/utility/seperateChar'
import '../styles/detailScreen.css'
import NavBar2 from '@renderer/layout/NavBar2'
const UserDetailScreen = ({ participantData, qrValue, handleGoBack, handlePrint, printStatus }) => {
  const Hall = 'Sur Sudha Sargam Hall'
  return (
    <>
      <NavBar2 />
      <div
        className={`flex w-[97vw]  m-auto  h-fit  py-4  ${'justify-between'} gap-x-3`}
      >
         <h1 className="text-left text-3xl mb-4 font-bold">
            Welcome to Nepal Investment Summit 2024
          </h1>
        <button onClick={handleGoBack} className="bg-[#1D4389] text-white px-4 py-2 rounded-md">
          Go Back
        </button>
      </div>
      
      <div className="bg-white w-[97vw] flex lg:flex-row md:flex-row flex-col p-4  lg:items-start md:items-start items-center  justify-between h-fit mt-1  m-auto border-2 border-black rounded-md">
        {/* User Data Section */}

        <div className=" max-h-fit w-1/2  p-2">
        <h1 className="text-left text-xl mb-4 font-bold text-transparent">
          </h1>
          <h1>
            <p className="font-bold text-2xl mb-6 text-[#1D4389]">
              {participantData.title}
              {participantData.full_name}
            </p>
          </h1>

          <div className="flex lg:flex-row md:flex-row flex-col h-full w-full  items-start  justify-between">
            <div className="h-full">
              <p className="font-bold">Position</p>
              <p>{participantData.position}</p>

              <p className="font-bold  mt-4">Organization Name</p>
              <p>{participantData.organization_name}</p>

              <p className="font-bold  mt-4"> {separateChar(participantData.registration_fee_detail, "(")}</p>
              <p></p>
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
        <div className="flex items-center justify-center w-[20rem] gap-x-2  h-fit  lg:mt-10 md:mt-10 pl-2 ">
          <div className="flex flex-col items-center justify-center">
            {participantData.hall === Hall && <div className="h-1 w-1 bg-black"></div>}
            <img src={qrValue} alt="qr-code" className=" h-full w-36" />
            <p className="text-[10px]">{participantData.qr_code}</p>
          </div>
          {/* <p></p> */}
          <div className="w-3/4 ">
            <h1 style={{ wordBreak: 'break-word' }} className="userTitle font-serif">
              {' '}
              {participantData.title.toUpperCase()} {participantData.full_name.toUpperCase()}
            </h1>
            <div className="">
              <h1 className="userPosition font-serif"> {participantData.position}</h1>

              <h1 className="userOrganization font-serif"> {participantData.organization_name}</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-[97vw]  flex m-auto my-4 h-fit flex-row ${printStatus.message.length > 0 ? 'justify-between' : 'justify-end'} gap-x-3 items-center`}
      >
        {printStatus.message.length > 0 && (
          <div
            className={`    h-fit p-2 flex    ${printStatus.state === true ? ' lg:w-[85vw] md:w-[80vw] w-[80vw]' : ' w-full'}`}
          >
            {<span className={`font-bold ${printStatus.state === true ? "text-green-500" : "text-red-500"} `}>{printStatus.message}</span>}
          </div>
        )}
      { printStatus.state === true || printStatus.message.length === 0  &&   <button  onClick={handlePrint} className={ `bg-green-500 text-white px-4 py-3 rounded-md print`}>
          Print QR
        </button>}
      </div>
    </>
  )
}

export default UserDetailScreen
