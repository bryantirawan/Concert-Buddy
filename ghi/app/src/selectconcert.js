import React, {useEffect, useState} from 'react'; 
import { useParams } from 'react-router-dom';
import axios from 'axios'; 

//const [useState] = React; 

const fetchConcert = () => {
    return axios.get('http://localhost:8080/api/selectconcerts/')
    .then(res => {
        console.log(res);
        return res 
    })
}




export default function Concerts() {
    const [concerts, setConcerts] = useState(0); 

    return (
        <>
        <div>
            <p>
            Hi
            </p>
            <button onClick = {() => {
                fetchConcert();
            }}>Fetch concert 

            </button>
        </div>
        
        </>
    )

}







// function Concerts(){
//     let r = axios.get('http://localhost:8080/api/selectconcerts/')
//         .then(console.log)
//     return (
//         <div>
//         <tbody>
//        {this.state.salerecords.map(salerecord => {
//         return (
//           <tr key={salerecord.id}>
//             <td>{salerecord.saleperson.name}</td>
//             <td>{salerecord.saleperson.number}</td>
//             <td>{salerecord.customer.name}</td> 
//             <td>{salerecord.price}</td>
//             <td>{salerecord.automobile.vin}</td>
//           </tr>
//         )
//        })}
//       </tbody>
//         </div>
//     )
// }

