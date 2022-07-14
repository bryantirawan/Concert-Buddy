import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



function Concerts(){
    let r = axios.get('http://localhost:8080/api/selectconcerts/')
        .then(console.log)
    return (
        <div>
            <p>{r['setlist']}</p>
        </div>
    )
}

export default Concerts
