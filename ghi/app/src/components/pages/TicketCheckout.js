import React, {useEffect, useState } from 'react';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import {
  useParams
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';



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
                address_for_order_item: user.user_id,
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
        navigate('/mytickets/')
      } else {
        alert('Ticket cannot be bought. Someone probably bought it just before you did.')
      }
    } catch (err) {
      console.log(err);
    }
  }


return (
    <>
    <div className="tabeltoavoidfooter">
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
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        </div>
      <Footer />
      </div>
    </>
)

}

export default TicketCheckout;
