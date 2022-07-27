import React, {useEffect, useState} from 'react';
import {
  Navigate,
    useParams
  } from "react-router-dom";
import { useContext } from 'react'
import AuthContext from './context/AuthContext';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

export default function ConcertDetail() {
    let { concert_id } = useParams();

    const [data, setData] = useState({});
    const [concerts, setConcerts] = useState([]);
    const [tickets, setTickets] = useState([]);
    let {user} = useContext(AuthContext)
    //const [sell, setSell] = useState();


    //useEffect( () => {
     //   const fetchConcert = async () => {
            //const concertResponse = await fetch(`http://localhost:8080/api/selectconcerts`);
    //         const concertData = await concertResponse.json();
    //         setConcerts(concertData.setlist);
    //     }
    //     fetchConcert()
    // }, []
    // );

    useEffect(() => {
        const fetchConcertDetail = async () => {
            const concertResponse = await fetch(`http://localhost:8080/api/concert/${concert_id}`)
            const concertData = await concertResponse.json();

            const ticketResponse = await fetch(`http://localhost:8090/api/tickets/`)
            const ticketData = await ticketResponse.json();

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
    }, []
    );



      const submitAddtoCart = async (e, ticket) => {
        // e.preventDefault();

        const data = {
          user: user.user_id,
          ticket: ticket,
          address_for_order_item: user.user_id,
          buyer_venmo: "testing"
        }
        const submit = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
        console.log(submit)
        let res = await fetch(`http://localhost:8090/api/orderitems/`, submit);
        console.log(data)
        console.log('Submitted')

        Navigate(`checkout/${ticket}`)

      }



      return (
        <>

            <>
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
        <th>Date</th>
        <td> { new Date(data.date).toLocaleDateString('en-US')}</td>

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

<table  className="table table-striped table-bordered ">
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
          {tickets && tickets.map((ticket,idx) => (

                <tr key={idx}>
                    <td>{ticket.price}</td>
                    <td>{ticket.section}</td>
                    <td>{ticket.row} </td>
                    <td>{ticket.seat} </td>

                    <td>

                    <button className="btn btn-primary btn-lg btn-block" onClick={(e) => submitAddtoCart(e, ticket.id)}>
           Buy
          </button>
                    </td>
                </tr>
            ))
        }

        </tbody>
    </table>




            </>

        </>
      );
    };
