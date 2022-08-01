/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react'
import Footer from '../Footer';

function TicketColumn() {

const [my_concerts, setMyConcerts] = useState([]);
const [past_concerts, setpastConcerts] = useState([]);

let {user} = useContext(AuthContext)
const buyer = user.user_id

useEffect( () => {
    const fetchTickets = async() => {
        const ticketResponse = await fetch(`http://localhost:8090/api/tickets/`);
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
        console.log(concerts_list, "concerts list")
        setMyConcerts(concerts_list)
    }
    fetchTickets()
}, []
);
    return (
      
<div  style={{color: 'white' }} className="col">


<h3 className="display-6 fw-bold">Upcoming</h3>

{/* {myconcerts.length !== 0 ? ( */}
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
        {my_concerts.filter(ticket => ((Date.parse(ticket.concert.date))) >= (Date.now())).map((ticket,idx) => (

          // {my_concerts.map((ticket,idx) => (
                <tr key={idx}>
                    <td>{new Date(ticket.concert.date).toLocaleDateString()}</td>
                    <td>{ticket.concert.artist}</td>
                    <td>{ticket.price}</td>
                    <td>{ticket.section}</td>
                    <td>{ticket.row} </td>
                    <td>{ticket.seat} </td>
                    {/* <td>
                    <Link to={`/checkout/${ticket.id}`} className="current btn-lg   btn-block   ">
                    <button className="btn btn-primary btn-lg btn-block">
           Buy
          </button>
          </Link>
                    </td> */}
                </tr>
            ))
        }
        </tbody>
    </table>

    <h3 className="display-6 fw-bold">Past</h3>
{/*          */}
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
        {my_concerts.filter(ticket => ((Date.parse(ticket.concert.date))) <= (Date.now())).map((ticket,idx) => (

          // {my_concerts.map((ticket,idx) => (
                <tr key={idx}>
                    <td>{new Date(ticket.concert.date).toLocaleDateString()}</td>
                    <td>{ticket.concert.artist}</td>
                    <td>{ticket.price}</td>
                    <td>{ticket.section}</td>
                    <td>{ticket.row} </td>
                    <td>{ticket.seat} </td>
                    {/* <td>
                    <Link to={`/checkout/${ticket.id}`} className="current btn-lg   btn-block   ">
                    <button className="btn btn-primary btn-lg btn-block">
           Buy
          </button>
          </Link>
                    </td> */}
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
                <div className="tabeltoavoidfooter">

        <div style={{
            backgroundColor: 'black',
            width: 'auto',
            height: 'auto'
        }}>
        <div className="my-4 container bg-dark">
        <div className="px-4 py-4 my-4 mt-0 text-center bg-light">
          <img className="bg-white rounded shadow d-block mx-auto mb-1" alt="" width="600" />
          <h1 className="display-6 fw-bold">SEE WHAT'S NEW</h1>
          <p>Looking for something to do? See what events are coming up and book tickets.</p>
          <div className="col-lg-6 mx-auto">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/selectconcerts" className="btn btn-dark btn-lg px-4 gap-3">Search Events</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">

          {TicketColumn()}


            {/* {this.state.conferenceColumns.map((conferenceList, index) => {
              return (
                <ConferenceColumn key={index} list={conferenceList} />
              );
            })} */}
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
