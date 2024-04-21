interface SearchFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void
//   input: {
//     fname: string
//     mname: string
//     lname: string
//     email: string
//     organization: string
//     contact: string
//     regNo: string
//     payment: string
//   }
  input:any
}

const SearchForm:React.FC<SearchFormProps> = ({ handleSubmit, handleChange, handleChangeOption, input }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 relative sm:grid-cols-2 grid-cols-1 flex-wrap w-[97%] m-auto gap-4 ">
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            First name
          </label>
          <input
            className="border-[1px] border-black p-2 text-sm"
            type="text"
            placeholder="First name"
            name="fname"
            value={input.fname}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            Middle name
          </label>
          <input
            className="border-[1px] border-black p-2 text-sm"
            type="text"
            placeholder="Middle name"
            name="mname"
            value={input.mname}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            Last name
          </label>
          <input
            className="border-[1px] border-black p-2 text-sm"
            type="text"
            placeholder="Last name"
            name="lname"
            value={input.lname}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            Email
          </label>
          <input
            className="border-[1px] border-black p-2 text-sm"
            type="text"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        {/* ===== 2nd row ======== */}
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            Organization
          </label>
          <input
            className="border-[1px] border-black p-2 text-sm"
            type="text"
            placeholder="Organization"
            name="organization"
            value={input.organization}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            Contact no.
          </label>
          <input
            className="border-[1px] border-black p-2 text-sm"
            type="text"
            placeholder="Contact no"
            name="contact"
            value={input.contact}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            Registration no
          </label>
          <input
            className="border-[1px] border-black p-2 text-sm"
            type="text"
            placeholder="Registration no"
            name="regNo"
            value={input.regNo}
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex flex-col">
          <label className="font-semibold" htmlFor="search">
            Choose Payment method
          </label>
          <select
            className="border-[1px] border-black p-2 text-sm"
            value={input.payment}
            onChange={handleChangeOption}
            name="payment"
            id="payment"
          >
            <option value="">Choose</option>
            <option value="cash">Cash</option>
            <option value="free">free</option>
            <option value="bank">Bank Transfer</option>
            <option value="Himalayan Bank">Himalayan Bank</option>
          </select>
        </div> */}
      </div>
      <div className=" h-fit  col-span-8  px-6  relative my-2 flex justify-end  w-full m-auto  ">
        <button type="submit" className="bg-[#1D4389] p-2 px-6 text-white">
          Search
        </button>
      </div>
      <div className=" h-fit  col-span-8  px-6  relative my-2 flex justify-end  w-full m-auto  "></div>
    </form>
  )
}

export default SearchForm
