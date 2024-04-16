import NavBar from '@renderer/layout/NavBar'
import '../styles/detailScreen.css'
const UserDetailScreen = ({ participantData, qrValue, handleGoBack, handlePrint, printStatus }) => {
  const Hall = 'Sur Sudha Sargam Hall'
  return (
    <>
      <NavBar />
      <div className={`flex w-[97vw]  m-auto  h-fit  py-4  ${printStatus.message.length > 0 ? "justify-between" : "justify-end"} gap-x-3`}>
       { printStatus.message.length > 0 && <div
          className={`lg:w-[85vw] md:w-[80vw] w-[80vw] h-fit p-2 flex    ${printStatus.state === true ? 'bg-green-500' : 'bg-red-400'}`}
        >
         { <span className={`font-bold  text-white`}>{printStatus.message}</span>}
        </div>}
        <button onClick={handleGoBack} className="bg-[#1D4389] text-white px-4 py-2 rounded-md">
          Go Back
        </button>
      </div>
      <div className="bg-white w-[97vw] flex lg:flex-row md:flex-row flex-col p-4  lg:items-start md:items-start items-center  justify-between h-fit mt-1  m-auto border-2 border-black rounded-md">
        {/* User Data Section */}

        <div className=" max-h-fit w-1/2 p-2">
          <h1 className="text-left text-3xl mb-4 font-bold">Participant Information</h1>

          <div className="flex lg:flex-row md:flex-row flex-col h-full w-full  items-start  justify-between">
            <div className="h-full">
              <p className="font-bold mt-2">Full Name</p>
              <p>{participantData.full_name}</p>

              <p className="font-bold mt-4">Email</p>
              <p>{participantData.email}</p>

              <p className="font-bold  mt-4">Phone no.</p>
              <p>{participantData.phone.length === 0 ? 'Not Available' : participantData.phone}</p>
              <p className="font-bold  mt-4">Country</p>
              <p>{participantData.country_name}</p>
              <p className="font-bold  mt-4">Payment Method</p>
              <p>{participantData.payment_method}</p>
              <p className="font-bold  mt-4">What interests you to invest in Nepal?</p>
              <p>
                {participantData.What_interests_you_to_invest_in_Nepal === null
                  ? ''
                  : participantData.What_interests_you_to_invest_in_Nepal}
              </p>
              <p className="font-bold  mt-4">Have you participant in past event?</p>

              <p>
                {participantData.have_you_participant_in_past_event === null
                  ? ''
                  : participantData.have_you_participant_in_past_event}
              </p>
              <p className="font-bold  mt-4">Have any inventment in nepal?</p>

              <p>
                {participantData.have_any_inventment_in_nepal === null
                  ? ''
                  : participantData.have_any_inventment_in_nepal}
              </p>
            </div>
            <span></span>
            <div className="">
              <p className="font-bold">Position</p>
              <p>{participantData.position}</p>

              <p className="font-bold  mt-4">Organization Name</p>
              <p>{participantData.organization_name}</p>
              <p className="font-bold  mt-4">Organization Website</p>
              <p>{participantData.organization_website}</p>
              <p className="font-bold  mt-4">Hall </p>
              <p>{participantData.hall}</p>
              <p className="font-bold  mt-4">Registration Type </p>
              <p>Individual</p>
              <p className="font-bold  mt-4">LinkedIn Profile URL </p>
              <p>{participantData.Linkein_url}</p>
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
      <div className="w-[97vw]  flex m-auto my-4 h-fit flex-row justify-end items-center">
        <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Print QR
        </button>
      </div>
    </>
  )
}

export default UserDetailScreen
