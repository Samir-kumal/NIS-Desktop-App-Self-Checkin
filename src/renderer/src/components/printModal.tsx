import React from "react"

interface PrintModalProps {
    handlePrintWithWarning: () => void
    handleModalClose: () => void
}
const PrintModal:React.FC<PrintModalProps> = ({handlePrintWithWarning, handleModalClose}) => {
  return (
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
  )
}

export default PrintModal