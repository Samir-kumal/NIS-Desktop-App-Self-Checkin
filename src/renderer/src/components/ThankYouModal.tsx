// import { NameFormatter } from '@renderer/hoc/NameFormatter'
import { motion } from 'framer-motion'
const ThankYouModal = ({ participantData }) => {

  return (
    <div className="grid place-content-center h-screen w-fit m-auto px-4    mb-10 justify-center items-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="h-[50vh] bg-primary flex flex-col items-center justify-center px-20  shadow-lg p-4  "
      >
        <h1 className="text-4xl  text-white font-bold text-center mt-0 mb-5 ">
          Thank you for Participating
        </h1>

        <h1 className="text-4xl text-white font-bold text-center mt-0 mb-5 ">in</h1>
        <h1 className="text-4xl text-white  font-bold text-center mt-0 mb-5 ">
          Nepal Investment Summit 2024
        </h1>
        <br />
        <h1 className="text-5xl flex flex-row gap-x-4 text-white font-bold text-center mt-0 mb-5 ">
          {participantData.title.toUpperCase()}{participantData.full_name.toUpperCase()}{/* {participantData.full_name} */}
        </h1>
        <img src="https://investinnepal.gov.np/wp-content/themes/eventeo/assets/images/line_inner.png" alt="logo" className="h-auto w-1/3 " />
      </motion.div>
    </div>
  )
}

export default ThankYouModal
