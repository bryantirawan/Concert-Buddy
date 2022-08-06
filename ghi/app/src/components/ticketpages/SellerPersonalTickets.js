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
    const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date());

    useEffect( () => {
        const fetchTickets = async() => {
            const ticketResponse = await fetch(`${process.env.REACT_APP_TICKET_API}/api/tickets/`);
            const ticketData = await ticketResponse.json();
            setAvailTickets(false)

            let unsold_list = []

            for (let ticket of ticketData.tickets) {
                let person = ticket.seller.import_href.slice(11)
                if (person == seller && ticket.sold == false) {
                    let ticketdate = ticket.concert.date.split("-")
                    let newticketdate = new Date(ticketdate[1] + "/" + ticketdate[2].slice(0,2) + "/" + ticketdate[0])
                    if (newticketdate >= yesterday) {
                    unsold_list.push(ticket)
                    setAvailTickets(true)
                }
                } else {
                    continue;
                }
            }
            setUnsoldTickets(unsold_list);
        }
        const fetchOrders = async() => {
            const orderitemResponse = await fetch(`${process.env.REACT_APP_TICKET_API}/api/orderitems/`)
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
        }
        fetchTickets();
        fetchOrders();
    }, []
    );

    const handleDeleteTicketSubmit = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${process.env.REACT_APP_TICKET_API}/api/tickets/${id}/`,);
            window.location.reload();
        } catch (e) {
            console.error('something went wrong!', e);
        }
    }

    const handleSoldTicketChange = async (e, id) => {
        e.preventDefault();
        try {
            const ticketChangeRes = await axios.put(`${process.env.REACT_APP_TICKET_API}/api/changetickets/${id}/`,
            {
                sold: false,
                buyer: null
            });
            window.location.reload();

            // have to change Sold from True --> False on Ticket
            // have to remove the Buyer from the Ticket (make null)
            // Order item kept intact for future reference

        } catch (e) {
            console.error('Error with Sold Ticket Change', e);
        }
    }

    return (
        <>
        <div className='imagebackground'>
  <div className="container bg-dark">
  <div className="px-4 py-4 my-4 mt-0 text-center bg-dark">
    <h1 className="display-6 fw-bold text-white">Ticket Listings</h1>
    <p className="text-white">Your tickets currently for sale and previously sold. Want to sell another?</p>
    <div className="col-lg-6 mx-auto">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <div className="col-lg-6 mx-auto">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link to="/selectconcerts" className="btn btn-light btn-md px-4 gap-3">Sell New Ticket</Link>
                </div>
              </div>
      </div>
    </div>
  </div>
  </div>



  <div className="tabletoavoidfooter">
  <div>
      <div className="container">
  <Toggle onChange={(e) => setToggled(e.target.checked)} />
  <p className="text-white"> Toggle to Search by {toggled ? "Sold": "Listed"}</p>
  </div>
      {toggled ?
      <>
      <div className="container">
      <h2 className="text-white">Listed Tickets</h2>

          {avail_tickets ?
          ( <div className="row">

              {unsold_tickets.map((ticket, idx) => {
              return (
                  <div className="col-md-3">
                  <div key={idx} className="card mb-3 shadow">
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
                  </div>
              );
              })}
              </div>):(<div className="col text-white">You have no tickets for sale.</div>)}
          </div>
          </>
    :
    <>
     <div className="container">
      <h2 className="text-white">Sold Tickets</h2>
          {sold_avail_tickets ?
          ( <div className="row">
              {sold_tickets.map((order, idx) => {
              return (
                  <div className="col-md-4">
                  <div key={idx} className="card mb-3 shadow">
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
                  <p>If the buyer hasn't venmo'd you within 2 hours, revert the ticket back to unsold.</p>
                  <div>Buyer Email: {order.ticket.buyer.email}</div>
                  <p>Buyer Venmo: {order.buyer_venmo}</p>
                  <form onSubmit={(e) => handleSoldTicketChange(e, order.ticket.id)}>
                  <button className="btn btn-warning" type="submit">
                  Revert to Unsold
                  </button>
                  </form>
                  </div>
                  </div>
                  </div>
              );
              })}
              </div>):(<div className="col text-white">You have no sold tickets.</div>)}

          </div>
          </>
  }

  </div>
</div>
  <Footer />
  </div>
  </>
)
}

    export default SellerTicketList;
