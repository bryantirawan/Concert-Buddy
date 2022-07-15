import axios from "axios";
import React, {useEffect, useState} from 'react';


function TestFile() {

    // const headers = {
    //     'Access-Control-Allow-Origin': '*',
    //     "x-api-key": `${process.env.REACT_APP_API_KEY}`,
    //     "Accept": "application/json"
    //   };

    // const getConcertsApi = () => {
    //     const options = {
    //       method: 'GET',
    //       url: 'https://api.setlist.fm/rest/1.0/search/setlists?cityNameSan%20Francisco&p=1',
    //       headers: headers,
    //       mode: 'no-cors'
    //     }
    //   axios.request(options).then((response) => {
    //       console.log("hello",response.data.data)
    //   })
    // }

    useEffect( () => {

        const fetchConcert = async () => {
            const concertResponse = await fetch('http://localhost:8080/api/selectconcertsforcity/', {mode: 'no-cors'});
            console.log(concertResponse);
        }

    }, []

    );




    return (
        <div>
            <p></p>
        <h2>Autosale History</h2>
        </div>
    );
}



export default TestFile
