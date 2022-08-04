import React, { useState } from 'react';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';


function SellTicketForm() {
    const [price, setPrice] = useState('')
    const [section, setSection] = useState('')
    const [row, setRow] = useState('')
    const [seat, setSeat] = useState('')
    const [picture_url, setPicture] = useState('')
    let { concert_id } = useParams();
    let {user} = useContext(AuthContext)
    let navigate = useNavigate()
    const concert =  concert_id
    const seller = user.user_id
    const buyer = null
    let imagepic = require('./Images/img-8.jpg')


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const form = {price, section, row, seat, picture_url, concert, seller, buyer}
        const a = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
        let res = await fetch(`${process.env.REACT_APP_TICKET_API}/api/tickets/`, a);
        if (res.status === 200) {
          alert('Ticket successfully listed')
          navigate(`/concertdetail/${concert}`)
        } else {
          console.error(res.status);
          alert('Error processing ticket. Please try again in a few seconds.')
        }
      } catch (err) {
        console.error('error', err);
      }
    }


return (
    <>
    <div className="tabletoavoidfooter">
    <div className="my-5 container">
        <div className="row">
          <div className="col col-sm-auto">
            <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" alt="concert_image" src={imagepic}/>
          </div>
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="form" id="create-attendee-form">
                  <h1 className="card-title">Ticket for sale details</h1>
                  <p className="mb-3">
                    Fill us in on your ticket. You must sell each ticket individually.
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
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        </div>
      <Footer/>
      </div>
    </>
)

}

export default SellTicketForm;
