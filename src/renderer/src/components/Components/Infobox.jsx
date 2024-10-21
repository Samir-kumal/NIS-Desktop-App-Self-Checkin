import { MdCall, MdTimer } from "react-icons/md"
import { FaWhatsapp } from "react-icons/fa"

const Infobox = ({paymentMethod}) => {
    return (
        <div className="text-center">
            <div className='mb-4'>
                <h5><b>Available Payment Options</b></h5>
                <div className="aval-pay-w">
                {paymentMethod.map((elem,index)=>(
                    <img key={index} src={elem.imgUrl} alt={elem.name} className='img-fluid pay-img m-1' />
                ))}
                </div>
            </div>
            <div className="dotted-hr my-3"></div>
            <MdTimer className="lg-icon" />
            <h5><b>Schedule</b></h5>
            <p><b>Monday - Friday <br />
                    Lunch break 12:30 PM to 1:30 PM <br />
                    9:00 AM &nbsp; 6:00 PM</b>
            </p>
            <p>
                <b>Saturday - Sunday <br />
                    Public Holidays <br />
                    9:00 AM &nbsp; 6:00 PM</b>
            </p>
            <div className="dotted-hr my-3"></div>
            <h5><b>For technical support: </b></h5>
            <div>
                <a href="tel:071-534663" className="support-link" title="Call to 071-534663"> 
                    <MdCall /> 071-534663
                </a>
            </div>
            <div>
                <a href="whatsapp://71-534663" target="_blank" className="support-link" title="Whatsapp call to 071-534663">
                    <FaWhatsapp /> 071-534663
                </a>
            </div>
            <div className="dotted-hr my-3"></div>
            <h5 className="mt-3"><b>How to reach</b></h5>
            <div className="w-100">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.6820316621565!2d83.46210720565516!3d27.710205946958865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996871ce57c5caf%3A0x3d14e044e0b8b7d4!2sSiddhartha%20Cable%20Car%20Lower%20Station!5e0!3m2!1sen!2snp!4v1706859521824!5m2!1sen!2snp" 
                width="100%" height="300" style={{'border':'1px solid #ddd'}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default Infobox