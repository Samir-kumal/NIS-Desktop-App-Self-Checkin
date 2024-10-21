const Tickettable = ({tableData, footData}) => {
    return (
        <div className="border-rt-dot pe-3">
            <div className="table-responsive">
            <table className="table table-striped mt-2 table-transp">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Particulars</th>
                        <th scope="col">Rate (Rs.)</th>
                        <th scope="col-span-1">Quantity</th>
                        <th scope="col">Price (Rs.)</th>
                    </tr>
                </thead>
                <tbody id="table-value">
                    {tableData.map((elem,index) => (
                    <tr key={index}>
                        <td>{index +1}</td>
                        <td>{elem.customer_ticket_type.name}</td>
                        <td>{elem.amount}</td>
                        <td>1</td>
                        <td>{elem.amount}</td>
                    </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b id="total-rate">Sub Total: </b></td>
                        <td><b id="total-price">{footData.subTotal}</b></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b id="total-rate">Discount: </b></td>
                        <td><b id="total-price">{footData.discount}</b></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b id="total-rate">Taxable Amount: </b></td>
                        <td><b id="total-price">{footData.taxable}</b></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b id="total-rate">VAT 13%: </b></td>
                        <td><b id="total-price">{footData.vat}</b></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b id="total-rate">Total: </b></td>
                        <td><b id="total-price">{footData.total}</b></td>
                    </tr>
                </tfoot>
            </table>
            </div>
        </div>
    )
}

export default Tickettable