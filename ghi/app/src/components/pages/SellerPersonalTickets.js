/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react'
import Toggle from '../Toggle';
import axios from 'axios';
import Footer from '../Footer';

function SellerTicketList() {

    const [unsold_tickets, setUnsoldTickets] = useState([]);
    const [sold_tickets, setSoldTickets] = useState([]);
    const [toggled, setToggled] = useState(false);
    const [avail_tickets, setAvailTickets] = useState(false)
    let {user} = useContext(AuthContext)
    const seller = user.user_id

    useEffect( () => {
        const fetchTickets = async() => {
            const ticketResponse = await fetch(`http://localhost:8090/api/tickets/`);
            const ticketData = await ticketResponse.json();
            if (ticketData.length > 0) {
                setAvailTickets(true)
            }
            let unsold_list = []
            let sold_list = []
            for (let ticket of ticketData.tickets) {
                let person = ticket.seller.import_href.slice(11)
                if (person == seller && ticket.sold == false) {
                    unsold_list.push(ticket)
                } else {
                    sold_list.push(ticket)
                }
            }
            setUnsoldTickets(unsold_list);
            setSoldTickets(sold_list);
            
            

            console.log(user, "user")
            console.log(sold_tickets, "sold_tickets+state")
            console.log(sold_list, "sold list")
            console.log(unsold_tickets, "unsold_list_state")
        }
        fetchTickets();

    }, []
    );

    const handleDeleteTicketSubmit = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8090/api/tickets/${id}/`,);
            console.log(response.status)
            window.location.reload();
        } catch (e) {
            console.log('something went wrong!', e);
        }
        // const ticketURL = await fetch(`http://localhost:8090/api/tickets/${id}/`);
        // console.log(ticketURL)
        // let fetchConfig = {
        //     method: "DELETE",
        // }
        // const response = await fetch(ticketURL, fetchConfig);
    }

    return (
        <>
        <div className="tabeltoavoidfooter">
        <div className="my-4 container bg-secondary">
        <div className="px-4 py-4 my-4 mt-0 text-center bg-secondary">
          <img className="bg-white rounded shadow d-block mx-auto mb-1" alt="" width="600" />
          <h1 className="display-6 fw-bold">Ticket Listings</h1>
          <div className="col-lg-6 mx-auto">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/selectconcerts" className="btn btn-dark btn-lg px-4 gap-3">Sell new ticket</Link>
            </div>
          </div>
        </div>
        </div>
        <div>
            <div className="container">
        <Toggle onChange={(e) => setToggled(e.target.checked)} />
        <p> Search by {toggled ? "Listed": "Sold"}</p>
        </div>
            {toggled ?
            <>
            <div className="container">
            <h2>Listed Tickets</h2>

            <div className="row">
            <div className="col">
                <div className="col">
                    {unsold_tickets.map((ticket, idx) => {
                    return (
                        <div key={idx} className="card mb-3 shadow">
                        {/* <img src={ticket.picture_url} className="card-img-top" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{ticket.concert.artist}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                            ${ new Intl.NumberFormat().format(ticket.price)}
                            </h6>
                            <p className="card-text">
                            Section: {ticket.section}
                            <br></br>
                            Row: {ticket.row}
                            <br></br>
                            Seat: {ticket.seat}
                            <br>
                            </br>
                            {new Date(ticket.concert.date).toLocaleDateString(undefined, {timeZone: "UTC"})} at {ticket.concert.venue}
                            </p>
                        </div>
                        <div className="card-footer">
                        <form onSubmit={(e) => handleDeleteTicketSubmit(e, ticket.id)}>
                    <button className="btn btn-danger" type="submit">
                        Delete Listing
                        </button>
                        </form>
                        </div>
                        </div>
                    );
                    })}
                </div>
                </div>
                </div>
                </div>
                </>
          :
          <>
           <div className="container">
            <h2>Sold Tickets</h2>
            <div className="row">
            <div className="col">
                <div className="col">
                    {sold_tickets.map((ticket, idx) => {
                    return (
                        <div key={idx} className="card mb-3 shadow">
                        {/* <img src={ticket.picture_url} className="card-img-top" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{ticket.concert.artist}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                            ${ new Intl.NumberFormat().format(ticket.price)}
                            </h6>
                            <p className="card-text">
                            Section: {ticket.section}
                            <br></br>
                            Row: {ticket.row}
                            <br></br>
                            Seat: {ticket.seat}
                            <br></br>
                            {new Date(ticket.concert.date).toLocaleDateString(undefined, {timeZone: "UTC"})} at {ticket.concert.venue}
                            </p>
                        </div>
                        <div className="card-footer">
                        Buyer's Email: {ticket.buyer.email}
                        </div>
                        </div>
                    );
                    })}
                </div>
                </div>
                </div>
                </div>
                </>
        }

        </div>

        {/* <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0
        }}
      > */}
      </div>
        <Footer />
        {/* </div> */}
        </>
    )
    }
    export default SellerTicketList;
