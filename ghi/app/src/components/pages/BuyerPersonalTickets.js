/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react'

function TicketColumn() {

const [my_concerts, setMyConcerts] = useState([]);
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
      <div className="col">
        {/* {props.list.map(data => {
          const conference = data.conference;
          return (
            <div key={conference.href} className="card mb-3 shadow">
              <img src={conference.location.picture_url} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{conference.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {conference.location.name}
                </h6>
                <p className="card-text">
                  {conference.description}
                </p>
              </div>
              <div className="card-footer">
                {new Date(conference.starts).toLocaleDateString()}
                -
                {new Date(conference.ends).toLocaleDateString()}
              </div>
            </div>
          );
        })} */}
      </div>
    );
  }

function BuyerConcerts() {

    TicketColumn();

    return (
        <>
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
          {/* <h2>Upcoming conferences</h2> */}
          <div className="row">
            {/* {this.state.conferenceColumns.map((conferenceList, index) => {
              return (
                <ConferenceColumn key={index} list={conferenceList} />
              );
            })} */}
          </div>
        </div>
        </div>
        </div>
        </>
    )

    }

    export default BuyerConcerts;
