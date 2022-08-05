import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from '../Footer';

export default function ConcertDetail() {
    let { concert_id } = useParams();
    const [data, setData] = useState({});
    const [tickets, setTickets] = useState([]);


    useEffect(() => {
        const fetchConcertDetail = async () => {
            const concertResponse = await fetch(`${process.env.REACT_APP_BUDDY_API}/api/concert/${concert_id}/`)
            const concertData = await concertResponse.json();
            console.log(concertData, "Concert Data in Concert Detail")
            console.log(`${process.env.REACT_APP_BUDDY_API}/api/concert/${concert_id}/`, "Logging the URL")
            const ticketResponse = await fetch(`${process.env.REACT_APP_TICKET_API}/api/tickets/`)
            const ticketData = await ticketResponse.json();
            console.log(ticketData, "TicketData in ConcertDetail")

            let ticket_list = [];
            for (let tick of ticketData.tickets){
              if (tick.concert_id === concertData.concert_id){
                ticket_list.push(tick)
              }
            }
            setTickets(ticket_list);
            setData(concertData);

            // catch error for empty ticket error
        }
        fetchConcertDetail()
    }, [concert_id]
    );

      return (
        <>
        <br></br>
        <div className="tabletoavoidfooter">
          <div className="container">

            <h1>Concert Details</h1>
              <table className="table table-striped table-bordered ">
              <thead>
              </thead>
    <tbody>
              <tr>
        <th>Venue</th>
        <td> {data.venue}</td>

    </tr>
    <tr>
        <th>City</th>
        <td>{data.city}</td>

    </tr>
    <tr>
        <th>Date </th>
        <td> { new Date(data.date).toLocaleDateString(undefined, {timeZone: "UTC"})}</td>
    </tr>

    <tr>
        <th>Artist</th>
        <td>{data.artist}</td>

    </tr>

    <tr>
        <th>   <Link to={`/tickets/${concert_id}`} className="current btn-lg   btn-block   "><button className="btn btn-success btn-lg btn-block"type="button">
          Sell Tickets
     </button></Link> </th>
     <td> </td>

    </tr>

    </tbody>
    </table>
    {tickets.length !== 0 ? (<table  className="table table-striped table-bordered ">
    <thead>
        <tr>
             <th>Price</th>
            <th>Section</th>
            <th>Row</th>
            <th>Seat</th>
            <th>Buy</th>

        </tr>
    </thead>
        <tbody>
        {tickets.filter(ticket => ticket.sold !== true ).map((ticket,idx) => (

          // {tickets.map((ticket,idx) => (
                <tr key={idx}>
                    <td>{ticket.price} {ticket.sold}</td>
                    <td>{ticket.section}</td>
                    <td>{ticket.row} </td>
                    <td>{ticket.seat} </td>
                    <td>
                    <Link to={`/checkout/${ticket.id}`} className="current btn-lg   btn-block   ">
                    <button className="btn btn-primary btn-lg btn-block">
           Buy
          </button>
          </Link>
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
    ):(<><br></br><h1 className = "text-white" align="center">Sorry no tickets available</h1></>)}
          <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        </div>
        </div>
        </div>
        <Footer />
        </>
      );
    };
