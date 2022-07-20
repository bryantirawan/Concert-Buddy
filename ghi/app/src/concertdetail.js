import React, {useEffect, useState} from 'react'; 
import {
    useParams
  } from "react-router-dom";

import { Link, BrowserRouter as Router, Route } from "react-router-dom";
  



//   const HomePage = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState();
  
//     useEffect(() => {
//       fetch("https://swapi.dev/api/people/", {})
//         .then((res) => res.json())
//         .then((response) => {
//           setData(response.results);
//           setIsLoading(false);
//         })
//         .catch((error) => console.log(error));
//     }, []);
  



export default function ConcertDetail() {
    let { concert_id } = useParams();

    const [data, setData] = useState({});
  
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
            setData(concertData);
            console.log(concertData)
        }
        fetchConcertDetail()
    }, []
    );
    // useEffect(() => {
    //     fetch(`http://localhost:8100/api/concert/${concert_id}`, {})
    //       .then((res) => res.json())
    //       .then((response) => {
    //         setData(JSON.stringify(response));
    //         //setIsLoading(false);
    //         console.log(response)
    //       })
    //       .catch((error) => console.log(error));
    //   }, [concert_id]);
    


    
      const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    
      

      return (
        <>
          
            <>
            <h1>Concert Details</h1>
              <h3>Venue:  {data.venue}</h3>
              <h3>City:  {data.city}</h3>
              <h3>Date:  { new Date(data.date).toLocaleDateString('en-US')}</h3>

              <h3>Artist:  {data.artist}</h3>
          




              <div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => openInNewTab('https://google.com')}>
           Buy
          </button>
        </div>

        <div>
          <button className="btn btn-primary btn-lg btn-block" onClick={() => openInNewTab('https://google.com')}>
        Sell
          </button>
        </div>
                
             
           
            </>
          
        </>
      );
    };
//}

    {/* useEffect( () => {
            const fetchConcertDetail = async () => {
                const concertResponse = await fetch(`http://localhost:8100/api/concert/${concert_id}`); 
                
                //const concertData = await concertResponse.json();
                .then((res) => res.json())
                .then((response) => {
                  setConcert(response);
                }

                //console.log(concertData)
                //return(concertData);
//                setConcerts(concertData.setlist);
            }
            fetchConcertDetail()
        });
     */}
    {/* /</>const handleLocationSubmit = (e) => { */}
    //     e.preventDefault();

        // ).then((concertResponse) => {
        //     if(concertResponse.ok) {
        //         return concertResponse.json();          
        //     }
        //     throw new Error('Invalid Concert');
        // })


