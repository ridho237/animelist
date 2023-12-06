import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ListAnime = () => {
  const [data, datachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/anime/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/anime/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Apakah Kamu ingin menghapus Anime ini?")) {
      fetch("http://localhost:8000/animeList/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Anime Berhasil Dihapus ^_^");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/animeList")
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
    <div className="container">
      <div className="card">
        <div className="card-title p-4 d-flex justify-content-between">
          <h2>Anime List</h2>
          <Link to="anime/create" className="btn btn-success">
            Tambah <FontAwesomeIcon icon={faPlusSquare} size="lg"></FontAwesomeIcon>
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead className="bg-info text-white">
              <tr>
                <td>ID</td>
                <td>Judul</td>
                <td>Genre</td>
                <td>Rating</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.judul}</td>
                    <td>{item.genre}</td>
                    <td>{item.rating}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-warning"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.id);
                        }}
                        className="btn btn-info text-light"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListAnime;
