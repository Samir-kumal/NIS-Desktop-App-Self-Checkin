import { CountryData, HallData, RegistrationCategory } from '@renderer/screens/AdvancedSearch'
import React from 'react'

interface SearchFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleChangeOptionHall: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleChangeOptionCountry: (e: React.ChangeEvent<HTMLSelectElement>) => void
  countryData: CountryData[] | null
  registrationCategory: RegistrationCategory[] | null
  input: any
  inputError: any
  hallType: HallData[] | null
  handleDataRefresh: () => void
}
const SearchForm: React.FC<SearchFormProps> = ({
  handleSubmit,
  handleChange,
  handleChangeOption,
  handleChangeOptionHall,
  handleChangeOptionCountry,
  handleDataRefresh,
  countryData,
  registrationCategory,
  hallType,
  input,
  inputError
}) => {
  const filteredData = [
    'Nepal',
    'India',
    'China',
    'Japan',
    'Australia',
    'United States of America',
    'United Kingdom',
    'Bangladesh',
    'Germany'
  ]

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 relative sm:grid-cols-2 grid-cols-1 flex-wrap w-[97vw] m-auto gap-4 ">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              First name
            </label>
            <input
              className={` ${inputError.fnameError === true ? 'border-red-500' : 'border-black'} border-[1px]  p-2 text-sm`}
              type="text"
              placeholder="First name"
              name="fname"
              value={input.fname}
              onChange={handleChange}
            />
            <p className='text-xs text-red-500 font-semibold'>{inputError.fnameMessage}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              Middle name
            </label>
            <input
              className={` ${inputError.mnameError === true ? 'border-red-500' : 'border-black'} border-[1px]  p-2 text-sm`}
              type="text"
              placeholder="Middle name"
              name="mname"
              value={input.mname}
              onChange={handleChange}
            />
            <p className='text-xs text-red-500 font-semibold'>{inputError.mnameMessage}</p>

          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              Last name
            </label>
            <input
              className={` ${inputError.lnameError === true ? 'border-red-500' : 'border-black'} border-[1px]  p-2 text-sm`}
              type="text"
              placeholder="Last name"
              name="lname"
              value={input.lname}
              onChange={handleChange}
            />
            <p className='text-xs text-red-500 font-semibold'>{inputError.lnameMessage}</p>

          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              Email
            </label>
            <input
              className={` ${inputError.emailError === true ? 'border-red-500' : 'border-black'} border-[1px]  p-2 text-sm`}
              type="text"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            <p className='text-xs text-red-500 font-semibold'>{inputError.emailMessage}</p>

          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              Registration Category
            </label>
            {/* <input
                className="border-[1px] border-black p-2 text-sm"
                type="text"
                placeholder="Email"
                name="reg_category"
                value={input.reg_category}
                onChange={handleChange}
              /> */}
            <select
              className="border-[1px] border-black p-2 text-sm"
              value={input.reg_category}
              onChange={handleChangeOption}
              name="reg_category"
            >
              <option value="">Choose</option>
              {registrationCategory &&
                registrationCategory.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              {/* <option value="1">Delegate(free)</option>
              <option value="2">Speaker Group(free)</option>
              <option value="4">Speaker (free)</option>
              <option value="5">Organizer (free)</option>
              <option value="6">VIP (free)</option>
              <option value="7">Volunteer (free)</option>
              <option value="8">Delegate Group (free)</option>
              <option value="9">Organizer Group (free)</option>
              <option value="10">Volunteer Group (free)</option>
              <option value="11">VIP Group (free) Bank</option> */}
            </select>
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
              className={` ${inputError.contactError === true ? 'border-red-500 border-2' : 'border-black'} border-[1px]  p-2 text-sm`}
              type="text"
              placeholder="Contact no"
              name="contact"
              value={input.contact}
              onChange={handleChange}
            />
            <p className='text-xs text-red-500 font-semibold'>{inputError.contactMessage}</p>

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
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              Qr Code
            </label>
            {/* <select
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
              </select> */}
            <input
              type="text"
              className="border-[1px] border-black p-2 text-sm"
              name="qr_code"
              value={input.qr_code}
              onChange={handleChange}
            />
          </div>
          {/* <select
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
              </select> */}

          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              Country
            </label>
            <select
              className="border-[1px] border-black p-2 text-sm"
              value={input.country}
              onChange={handleChangeOptionCountry}
              name="country"
              id="country"
            >
              <option className="font-bold bg-gray-300 py-2" value="">
                Choose
              </option>

              {/* {filteredCountries &&
                filteredCountries.length > 0 &&
                filteredCountries.map((country, index) => (
                  <option key={index} value={country.id}>
                    {country.name}
                  </option>
                ))} */}
              {filteredData.map((countryName, index) => {
                const country = countryData && countryData.find((c) => c.name === countryName)
                if (country) {
                  return (
                    <option key={index} value={country.id}>
                      {country.name}
                    </option>
                  )
                }
                return null
              })}
              <optgroup label=""></optgroup>
              <hr />
              <optgroup label=""></optgroup>

              {countryData &&
                countryData.length > 0 &&
                countryData.map((country, index) => (
                  <option key={index} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="search">
              Hall
            </label>
            <select
              className="border-[1px] border-black p-2 text-sm"
              value={input.hall}
              onChange={handleChangeOptionHall}
              name="hall"
              id="hall"
            >
              <option value="">Choose</option>

              {hallType && hallType.map((hall) => <option value={hall.title}>{hall.title}</option>)}
            </select>
          </div>
        </div>
        <div className=" h-fit    col-span-8  px-6  relative my-2 flex justify-end items-center  w-full m-auto  ">
          <button type="submit" className="bg-primary h-full p-2 px-6 text-white">
            Search
          </button>
        </div>
        {/* <div className=" h-fit  col-span-8  px-6  relative my-2 flex justify-end  w-full m-auto  "></div> */}
      </form>
      {/* <div className='w-[97vw] h-fit flex  bg-slate-400 justify-end mx-auto'> */}
      <button
        onClick={handleDataRefresh}
        className="bg-[#19a277] m-2   p-2 px-8 absolute  bottom-4 z-10 right-32 text-white"
      >
        Reset
      </button>
      {/* </div> */}
    </>
  )
}

export default SearchForm
