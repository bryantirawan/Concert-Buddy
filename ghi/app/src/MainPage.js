import axios from "axios";

function MainPage() {
  console.log(axios.get('http://buddy-api:8000/api/selectconcerts'))
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Concert Buddy</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for aconcert buddy management
        </p>
      </div>
    </div>
  );
}

export default MainPage;
