const Customerinfo = ({customer}) => {
    return (
        <div>
            <div className="row mb-3">
                <label className="col-md-5 fw-bold">Name :</label>
                <div className="col-md-7">
                    {customer.customer_name}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-5 fw-bold">Email :</label>
                <div className="col-md-7">
                    {customer.email}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-5 fw-bold">Phone :</label>
                <div className="col-md-7">
                    {customer.phone}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-5 fw-bold">Address :</label>
                <div className="col-md-7">
                    {customer.address}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-5 fw-bold">Customer PAN :</label>
                <div className="col-md-7">
                    {customer.customer_pan}
                </div>
            </div>
        </div>
    )
}

export default Customerinfo