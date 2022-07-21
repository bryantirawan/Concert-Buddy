import React, {useEffect, useState } from 'react';

function SellTicketForm() {
    const [price, setPrice] = useState('')
    const [section, setSection] = useState('')
    const [row, setRow] = useState('')
    const [seat, setSeat] = useState('')
    const [picture_url, setPicture] = useState('')
    // const [concert, setConcert] = useState('63b2f63f')
    // const [seller, setSeller] = useState('admin@admin.com')
    // const [buyer, setBuyer] = useState(null)
    const concert = '63b2f63f'
    const seller = 'admin@admin.com'
    const buyer = null

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {price, section, row, seat, picture_url, concert, seller, buyer}

        fetch(`http://localhost:8090/api/tickets/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }) .then(() => {
            console.log('Ticket Added')
        })
    }

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
