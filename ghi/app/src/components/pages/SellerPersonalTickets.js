/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react'
import Toggle from '../Toggle';

// function TicketColumn() {

// const [unsold_tickets, setUnsoldTickets] = useState([]);
// const [sold_tickets, setSoldTickets] = useState([]);
// let {user} = useContext(AuthContext)
// const seller = user.user_id

// useEffect( () => {
//     const fetchTickets = async() => {
//         const ticketResponse = await fetch(`http://localhost:8090/api/tickets/`);
//         const ticketData = await ticketResponse.json();
//         let unsold_list = []
//         let sold_list = []
//         for (let ticket of ticketData.tickets) {
//             console.log(ticket)
//             let person = ticket.seller.import_href.slice(11)
//             if (person == seller && ticket.sold == false) {
//                 unsold_list.push(ticket)
//             } else if (ticket.seller.id == seller && ticket.sold == true) {
//                 sold_list.push(ticket)
//             } else {
//                 return "ERROR WITH FUNCTIONALITY"
//             }
//         }
//         console.log(sold_list, "sold list")
//         console.log(unsold_list, "unsold_list")
//         setUnsoldTickets(unsold_list)
//         setSoldTickets(sold_list)
//     }
//     fetchTickets()
// }, []
// );

// Add toggle button to change sold back to not sold & clear the buyer field if changed to not sold
// Delete button for ticket listing (if sold == False) -- (delete ticket from ticket model)

//     return (
//       <div className="col">
//         {sold_tickets.map((ticket, idx) => {
//           return (
//             <div key={idx} className="card mb-3 shadow">
//               {/* <img src={conference.location.picture_url} className="card-img-top" /> */}
//               <div className="card-body">
//                 <h5 className="card-title">{ticket.price}</h5>
//                 <h6 className="card-subtitle mb-2 text-muted">
//                   {ticket.section}
//                 </h6>
//                 <p className="card-text">
//                   {ticket.row}
//                 </p>
//               </div>
//               <div className="card-footer">
//                 {ticket.seat}
//                 -
//                 {new Date(ticket.concert.date).toLocaleDateString()}
//                 {ticket.sold}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

function SellerTicketList() {

    const [unsold_tickets, setUnsoldTickets] = useState([]);
    const [sold_tickets, setSoldTickets] = useState([]);
    let {user} = useContext(AuthContext)
    const seller = user.user_id

    useEffect( () => {
        const fetchTickets = async() => {
            const ticketResponse = await fetch(`http://localhost:8090/api/tickets/`);
            const ticketData = await ticketResponse.json();
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
            setUnsoldTickets(unsold_list)
            setSoldTickets(sold_list)
            console.log(sold_list, "sold list")
            console.log(unsold_list, "unsold_list")
        }
        fetchTickets();
    }, []
    );

    return (
        <>
        <div className="my-4 container bg-dark">
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
                            </p>
                        </div>
                        <div className="card-footer">
                            {new Date(ticket.concert.date).toLocaleDateString()} at {ticket.concert.venue}

                        </div>
                        </div>
                    );
                    })}
                </div>
            </div>
          </div>

        </div>
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
                            </p>
                        </div>
                        <div className="card-footer">
                            {new Date(ticket.concert.date).toLocaleDateString()} at {ticket.concert.venue}

                        </div>
                        </div>
                    );
                    })}
                </div>
            </div>
          </div>
        </div>
        </div>
        </>
    )
    }
    export default SellerTicketList;
