import React, {useEffect, useState } from 'react';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import {
  useParams
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';



function TicketCheckout() {
    const [venmo, setVenmo] = useState("");
    const [street_address, setStreetAddress] = useState("")
    const [apartment_address, setApartmentAddress] = useState(0);
    const [country, setCountry] = useState("US")
    const [zip, setZip] = useState("")
    let { ticket_id } = useParams();
    let {user} = useContext(AuthContext);

    let navigate = useNavigate()

    const ticket = ticket_id

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                user: user.user_id,
                ticket: Number(ticket),
                shipping_address: user.user_id,
                buyer_venmo: venmo,
                street_address: street_address,
                apartment_address: apartment_address,
                country: country,
                zip: zip
              }
              const submit = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              }
              console.log(submit)
              let res = await fetch(`http://localhost:8090/api/orderitems/`, submit);
              console.log(data)
              console.log('Submitted')

        let resJson = await res.json();
      if (res.status === 200) {
        // setPrice("");
        // setSection("");
        // setRow("");
        // setSeat("");
        // setPicture("");
        navigate(-1)



      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.log(err);
    }
  }


//   if (res.status === 200){
//     console.log('concert added successfully and user attached to fellow user now needs to redirect')
//     navigate(`/concertdetail/${concID}`)
// } else {
//     alert('concert unable to be added')
// }


  // let handleSulbmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res = await fetch("https://httpbin.org/post", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: name,
  //         email: email,
  //         mobileNumber: mobileNumber,
  //       }),
  //     });
  //     let resJson = await res.json();
  //     if (res.status === 200) {
  //       setName("");
  //       setEmail("");
  //       setMessage("User created successfully");
  //     } else {
  //       setMessage("Some error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


return (
    <>
    <div className="my-5 container">
        <div className="row">
          <div className="col col-sm-auto">
            <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/images/img-8.jpg" />
          </div>
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="form" id="create-attendee-form">
                  <h1 className="card-title">Ticket for sale details</h1>
                  <p className="mb-3">
                    Fill us in on your ticket.
                  </p>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={(e) => setStreetAddress(e.target.value)} required placeholder="Street Address" type="text" value={street_address} id="street_address" name="street_address" className="form-control" />
                        <label htmlFor="street_address">Street Address</label>
                      </div>
                    </div>
                    <div className="col">
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setApartmentAddress(e.target.value)} required placeholder="Apartment Address" type="text" value={apartment_address} id="apartment_address" name="apartment_address" className="form-control" />
                        <label htmlFor="apartment_address">Apartment Address</label>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setCountry(e.target.value)} required placeholder="Country" type="text" value={country} id="country" name="country" className="form-control" />
                        <label htmlFor="country">Country</label>
                      </div>
                    </div>
                    <div className="col">
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setZip(e.target.value)} required placeholder="Zip" type="text" value={zip} id="zip" name="zip" className="form-control" />
                        <label htmlFor="zip">Zip</label>
                      </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setVenmo(e.target.value)} required placeholder="Venmo" type="text" value={venmo} id="venmo" name="venmo" className="form-control" />
                        <label htmlFor="venmo">Venmo</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary">Submit Listing</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
)

}

export default TicketCheckout;
