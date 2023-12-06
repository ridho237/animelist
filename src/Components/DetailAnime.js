import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { id } = useParams();

  const [data, datachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/animeList/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        datachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="card row p-2" style={{ textAlign: "left" }}>
          <div className="card-title p-2">
            <h2>Anime Details</h2>
          </div>
          {data && (
            <div className="card-body p-2">
              <h2>
                Judul Anime : <b>{data.judul}</b> ({data.id})
              </h2>

              <h5>Genre : {data.genre}</h5>
              <h5>Rating : {data.rating}</h5>
              <Link className="btn btn-danger p-9" to="/">
                Kembali
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* </div>
            </div> */}
    </div>
  );
};

export default EmpDetail;
