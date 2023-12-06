import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAnime = () => {
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/animeList/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        judulchange(resp.judul);
        genrechange(resp.genre);
        ratingchange(resp.rating);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [animeid, idchange] = useState("");
  const [judul, judulchange] = useState("");
  const [genre, genrechange] = useState("");
  const [rating, ratingchange] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const data = { animeid, judul, genre, rating };

    fetch("http://localhost:8000/animeList/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Anime Berhasil Di Edit!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title d-flex justify-content-center p-2">
                <h2>Edit Anime Detail</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled="disabled" className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Judul</label>
                      <input required value={judul} onMouseDown={(e) => valchange(true)} onChange={(e) => judulchange(e.target.value)} className="form-control"></input>
                      {judul.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Genre</label>
                      <input value={genre} onChange={(e) => genrechange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Rating</label>
                      <input value={rating} onChange={(e) => ratingchange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-2">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Simpan
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Kembali
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAnime;
