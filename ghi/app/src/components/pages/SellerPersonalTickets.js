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
    const [sold_avail_tickets, setSoldAvailTickets] = useState(false)
    let {user} = useContext(AuthContext)
    const seller = user.user_id

    useEffect( () => {
        const fetchTickets = async() => {
            const ticketResponse = await fetch(`http://localhost:8090/api/tickets/`);
            const ticketData = await ticketResponse.json();
            setAvailTickets(false)

            let unsold_list = []

            for (let ticket of ticketData.tickets) {
                let person = ticket.seller.import_href.slice(11)
                if (person == seller && ticket.sold == false) {
                    unsold_list.push(ticket)
                    setAvailTickets(true)
                } else {
                    continue;
                }
            }
            setUnsoldTickets(unsold_list);
            console.log(unsold_list, "unsold_list")
        }
        const fetchOrders = async() => {
            const orderitemResponse = await fetch(`http://localhost:8090/api/orderitems/`)
            const orderitemData = await orderitemResponse.json();
            setSoldAvailTickets(false)

            let sold_list = []

            for (let order of orderitemData.order_item) {
                let person = order.ticket.seller.import_href.slice(11)
                let order_sold = order.ticket.sold;
                if (person == seller && order_sold == true) {
                    sold_list.push(order)
                    setSoldAvailTickets(true)
                }
            }
            setSoldTickets(sold_list);
            console.log(sold_list, "sold_list")
        }
        fetchTickets();
        fetchOrders();
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
    }

    const handleSoldTicketChange = async (e, id) => {
        e.preventDefault();
        try {
            const ticketChangeRes = await axios.put(`http://localhost:8090/api/changetickets/${id}/`,
            {
                sold: false,
                buyer: null
            });
            console.log(ticketChangeRes)

            // have to change Sold from True --> False on Ticket
            // have to remove the Buyer from the Ticket (make null)
            // Order item kept intact for future reference

        } catch (e) {
            console.log('Error with Sold Ticket Change', e);
        }
    }

    return (
        <>
        <div className="tabletoavoidfooter">
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
                {avail_tickets ? (<div className="col">
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
                    </div>):(<div className="col">No Tickets for Sale</div>)}
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
                {sold_avail_tickets ? (<div className="col">
                    {sold_tickets.map((order, idx) => {
                    return (
                        <div key={idx} className="card mb-3 shadow">
                        {/* <img src={ticket.picture_url} className="card-img-top" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{order.ticket.concert.artist}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                            ${ new Intl.NumberFormat().format(order.ticket.price)}
                            </h6>
                            <p className="card-text">
                            Section: {order.ticket.section}
                            <br></br>
                            Row: {order.ticket.row}
                            <br></br>
                            Seat: {order.ticket.seat}
                            <br></br>
                            {new Date(order.ticket.concert.date).toLocaleDateString(undefined, {timeZone: "UTC"})} at {order.ticket.concert.venue}
                            </p>
                        </div>
                        <div className="card-footer">
                        <form onSubmit={(e) => handleSoldTicketChange(e, order.ticket.id)}>
                        <button className="btn btn-warning" type="submit">
                        Revert to Unsold
                        </button>
                        </form>
                        </div>
                        </div>
                    );
                    })}
                    </div>):(<div className="col">No Tickets Sold</div>)}
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
