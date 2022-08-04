/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react'
import Footer from '../Footer';

function TicketColumn() {

const [my_concerts, setMyConcerts] = useState([]);
let {user} = useContext(AuthContext)
const buyer = user.user_id
const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date());


useEffect( () => {
    const fetchTickets = async() => {
        const ticketResponse = await fetch(`${process.env.REACT_APP_TICKET_API}/api/tickets/`);
        const ticketData = await ticketResponse.json();
        let concerts_list = []
        for (let ticket of ticketData.tickets) {
            if (ticket.buyer === null) {
                continue
            } else {
            let person = ticket.buyer.import_href.slice(11)
            if (person == buyer) {
                concerts_list.push(ticket)
            } else {
                continue
            }
        }
        }
        concerts_list.sort((a,b) => Date.parse(a.concert.date) - Date.parse(b.concert.date))
        setMyConcerts(concerts_list)
    }
    fetchTickets()
}, []
);
    return (

    <div  style={{color: 'black' }} className="col">
        <h3 className="display-6 fw-bold">Upcoming</h3>
        <table  className="table table-dark table-striped table-bordered ">
            <thead>
                <tr>
                <th>Date</th>
                <th>Artist</th>
                <th>Price</th>
                <th>Section</th>
                <th>Row</th>
                <th>Seat</th>
                </tr>
            </thead>
            <tbody>
            {my_concerts.filter(ticket => ((Date.parse(ticket.concert.date))) >= yesterday).map((ticket,idx) => (
                    <tr key={idx}>
                        <td>{new Date(ticket.concert.date).toLocaleDateString(undefined, {timeZone: "UTC"})}</td>
                        <td>{ticket.concert.artist}</td>
                        <td>{ticket.price}</td>
                        <td>{ticket.section}</td>
                        <td>{ticket.row} </td>
                        <td>{ticket.seat} </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        <h3 className="display-6 fw-bold">Past</h3>
        <table  className="table table-dark table-striped table-bordered ">
            <thead>
                <tr>
                <th>Date</th>
                <th>Artist</th>
                <th>Price</th>
                <th>Section</th>
                <th>Row</th>
                <th>Seat</th>
                </tr>
            </thead>
            <tbody>
            {my_concerts.filter(ticket => ((Date.parse(ticket.concert.date))) <= yesterday).reverse().map((ticket,idx) => (
                    <tr key={idx}>
                        <td>{new Date(ticket.concert.date).toLocaleDateString(undefined, {timeZone: "UTC"})}</td>
                        <td>{ticket.concert.artist}</td>
                        <td>{ticket.price} </td>
                        <td>{ticket.section}</td>
                        <td>{ticket.row} </td>
                        <td>{ticket.seat} </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </div>
    );
  }

function BuyerTickets() {

    TicketColumn();

    return (
        <>
        <div className="tabletoavoidfooter">

            <div style={{
                backgroundColor: 'white',
                width: 'auto',
                height: 'auto'
            }}>
                <div className="my-4 container bg-light">
                    <div className="px-4 py-4 my-4 mt-0 text-center bg-secondary">
                    <img className="bg-black rounded shadow d-block mx-auto mb-1" alt="" width="600" />
                    <h1 className="display-6 fw-bold">SEE WHAT'S NEW</h1>
                    <p>Looking for something to do? See what events are coming up and book tickets.</p>
                    <div className="col-lg-6 mx-auto">
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/selectconcerts" className="btn btn-light btn-lg px-4 gap-3">Search Events</Link>
                        </div>
                    </div>
                    </div>
                    <div className="container">
                    <div className="row">
                    {TicketColumn()}
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )

    }

    export default BuyerTickets;
