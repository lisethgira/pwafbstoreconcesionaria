import { differenceBy } from 'lodash';
import React from 'react';
import firestore from './firestore';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nroplaca: '',
      marca: '',
      modelo: '',
      fechacompra: '',
      precio: '',
      id: '',
      avehiculo: []
    };
  }

  // método para capturar los caracteres de cada dato (user, name, email, password)

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addVehiculo = e => {
    e.preventDefault();
    const db = firestore.firestore();
    /*db.settings({
      timestampInSnapshots: true
    });*/
    const vehiculoRef = db.collection('vehiculo').add({
      nroplaca: this.state.nroplaca,
      marca: this.state.marca,
      modelo: this.state.modelo,
      fechacompra: this.state.fechacompra,
      precio: this.state.precio,
    });
    // Borrar la info de los inputs
    this.setState({
      nroplaca: '',
      marca: '',
      modelo: '',
      fechacompra: '',
      precio: '',
    });
  }

  searchVehiculo = (e) => {
    e.preventDefault();
    const db = firestore.firestore();
    db.collection("vehiculo")
      .where("nroplaca", "==", this.state.nroplaca)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          this.setState({
            marca: doc.data().marca,
            modelo: doc.data().modelo,
            fechacompra: doc.data().fechacompra,
            precio: doc.data().precio,
            id: doc.id
          })
        })
      })
      .catch((error) => {
        console.log("Error, al recuperar el registro", error);
      })
  }

  updateVehiculo = (e) => {
    e.preventDefault();
    const db = firestore.firestore();
    var vehiculoRefU = db.collection("vehiculo")
      .doc(this.state.id);
    return vehiculoRefU.update({
      nroplaca: this.state.nroplaca,
      marca: this.state.marca,
      modelo: this.state.modelo,
      fechacompra: this.state.fechacompra,
      precio: this.state.precio,
    })
      .then(() => {
        console.log("Vehiculo actualizado correctamente...");
        // Borrar la info de los inputs
        this.setState({
          nroplaca: '',
          marca: '',
          modelo: '',
          fechacompra: '',
          precio: '',
        });
      })
      .catch((error) => {
        console.log("Error, al actualizar el Vehiculo", error);
      })

  }

  deleteVehiculo = e => {
    e.preventDefault();
    const db = firestore.firestore();
    db.collection("vehiculo")
      .doc(this.state.id)
      .delete()
      .then(() => {
        console.log("Vehiculo eliminado correctamente...");
        // Borrar la info de los inputs
        this.setState({
          nroplaca: '',
          marca: '',
          modelo: '',
          fechacompra: '',
          precio: '',
        });
      })
      .catch((error) => {
        console.log("Error, al eliminar el vehiculo", error);
      })
  }

  getAllVehiculos = e => {
    e.preventDefault();
    let list = [];
    const db = firestore.firestore();
    db.collection("vehiculo")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let id = doc.id;
          let nroplaca = doc.data().nroplaca;
          let marca = doc.data().marca;
          let modelo = doc.data().modelo;
          let fechacompra = doc.data().fechacompra;
          let precio = doc.data().precio;
          let obj = { id, nroplaca, marca, modelo, fechacompra, precio };
          list.push(obj)
        })
        this.setState({
          avehiculo: list
        })
      })
  }
  render() {
    return (
      <div>
        {/* Carrousel */}
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "200px",
            backgroundImage:
              "url(https://img.autosblogmexico.com/2019/07/24/hLe5IGAV/autos-depreciacion-valor-02-2df1.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
        </div>
        {/* NAVIGATION */}
        <nav className="bg-info"><h1 Style="margin-left:270px">Firebase React PWA - CRUD - Concesionaria</h1></nav>

        <div className="container" style={{ background: 'gray' }}>
          <h2 Style="margin-left:370px">Actualización de Vehiculos</h2>
          <form onSubmit={this.addVehiculo}>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="nroplaca"
                label="N° de Placa"
                placeholder="N° de Placa"
                onChange={this.updateInput}
                value={this.state.nroplaca}
              >
              </input>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="marca"
                label="Marca de Vehiculo"
                placeholder="Marca de Vehiculo"
                onChange={this.updateInput}
                value={this.state.marca}
              >
              </input>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                name="modelo"
                label="Modelo de Vehiculo"
                placeholder="Modelo de Vehiculo"
                onChange={this.updateInput}
                value={this.state.modelo}
              >
              </input>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="date"
                name="fechacompra"
                label="Fecha de Compra"
                placeholder="fecha de compra"
                onChange={this.updateInput}
                value={this.state.fechacompra}
              >
              </input>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="number"
                name="precio"
                label="Precio del Vehiculo"
                placeholder="precio del vehiculo"
                onChange={this.updateInput}
                value={this.state.precio}
              >
              </input>
            </div>
            <div>
              <hr></hr>
            </div>
            <button type="submit" className="btn btn-primary" Style="float:left;margin-left:5px;margin-Top:5px">Guardar</button>
          </form>
          <form onSubmit={this.searchVehiculo}>
            <button type="submit" className="btn btn-success" Style="float:left;margin-left:5px;margin-Top:5px">Buscar</button>
          </form>
          <form onSubmit={this.updateVehiculo}>
            <button type="submit" className="btn btn-warning" Style="float:left;margin-left:5px;margin-Top:5px">Actualizar</button>
          </form>
          <form onSubmit={this.deleteVehiculo}>
            <button type="submit" className="btn btn-danger" Style="float:left;margin-left:5px;margin-Top:5px">Eliminar</button>
          </form>
          <form onSubmit={this.getAllVehiculos}>
            <button type="submit" className="btn btn-primary" Style="float:left;margin-left:5px;margin-Top:5px" data-bs-toggle="modal" data-bs-target="#exampleModal">Listar</button>
          </form>

          {/*Formulario Modal */}
          <div className="modal fade  bg-info card card-content" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content ligth bg-success card card-content">
                <div className="modal-header">
                  <h3 className="modal-title" id="exampleModalLabel" Style="color: red; margin-left:100px">Listado de Vehiculos</h3>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <table clasName="table table-hover">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center", color: "white" }}>Numero Placa</th>
                        <th style={{ textAlign: "center", color: "white" }}>Marca Vehiculo</th>
                        <th style={{ textAlign: "center", color: "white" }}>Modelo Vehiculo</th>
                        <th style={{ textAlign: "center", color: "white" }}>Fecha de Compra </th>
                        <th style={{ textAlign: "center", color: "white" }}>Precio Vehiculo</th>
                      </tr>
                      <tr></tr>
                    </thead>
                    <tbody>
                      {
                        this.state.avehiculo.map(mvehiculo => (
                          <tr key={mvehiculo.id} className="table-dark">
                            <td style={{ textAlign: "center"}}>{mvehiculo.nroplaca}</td>
                            <td style={{ textAlign: "center"}}>{mvehiculo.marca}</td>
                            <td style={{ textAlign: "center"}}>{mvehiculo.modelo}</td>
                            <td style={{ textAlign: "center"}}>{mvehiculo.fechacompra}</td>
                            <td style={{ textAlign: "center"}}>{mvehiculo.precio}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
          {/*Fin formulario modal */}
        </div>
      </div>
    )
  }
}
export default App;
