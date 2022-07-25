import React, {useEffect, useState } from 'react';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import {
  useParams
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';



function SellTicketForm() {
    const [price, setPrice] = useState('')
    const [section, setSection] = useState('')
    const [row, setRow] = useState('')
    const [seat, setSeat] = useState('')
    const [picture_url, setPicture] = useState('')
    let { concert_id } = useParams();
    let {user} = useContext(AuthContext) 
    let navigate = useNavigate()



    
    // const [concert, setConcert] = useState('63b2f63f')
    // const [seller, setSeller] = useState('admin@admin.com')
    // const [buyer, setBuyer] = useState(null)
    const concert =  concert_id
    const seller = user.user_id
    const buyer = null
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const form = {price, section, row, seat, picture_url, concert, seller, buyer}
       const a = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      console.log(a)
        let res = await fetch(`http://localhost:8090/api/tickets/`, a) ;
        //console.group(body)
        //.then(() => {
            console.log('Ticket Added');
        //})

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
                        <input onChange={(e) => setPrice(e.target.value)} required placeholder="Price" type="number" value={price} id="price" name="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={(e) => setSection(e.target.value)} required placeholder="Ticket Section" type="text" value={section} id="section" name="section" className="form-control" />
                        <label htmlFor="section">Ticket Section</label>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={(e) => setRow(e.target.value)} required placeholder="Ticket Row" type="text" value={row} id="row" name="row" className="form-control" />
                        <label htmlFor="row">Ticket Row</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={(e) => setSeat(e.target.value)} required placeholder="Ticket Seat" type="text" value={seat} id="seat" name="seat" className="form-control" />
                        <label htmlFor="seat">Ticket Seat</label>
                      </div>
                    </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={(e) => setPicture(e.target.value)} required placeholder="Picture Url" type="text" value={picture_url} id="picture_url" name="picture_url" className="form-control" />
                        <label htmlFor="picture_url">Ticket Picture Url</label>
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

export default SellTicketForm;
