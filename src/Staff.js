import React, { useEffect, useState } from "react";
import icon from './Pic/kittyZone.png'
import icon4 from './Pic/kittyZone2.png'

function handleClick(cer){
  window.location= `/edit?no=${cer}`
}

function handleLogout(){
  localStorage.removeItem('token');
   window.location.href = '/';
}

function Staff() {

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('https://witty-housecoat-lion.cyclic.app/authen', {
      method: 'POST',
      headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },        
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
      }else{
        window.location = '/'
      }
    })
  })


  const [infomation, setInfo] = useState([])
  useEffect(() => {
    fetch('https://witty-housecoat-lion.cyclic.app/info')
      .then(res => res.json())
      .then((result) => {
        const sortedData = result.sort((a, b) => b.certificateNo - a.certificateNo);
        setInfo(sortedData)
      })
  }, [])

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  const i = <img src={icon} alt="icon" height="55" />
  const i4 = <img src={icon4} alt="icon" height="62" />
  return (
    <div >
      <nav className="navbar bg-body-tertiary fixed-top" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          {i}
          <h1 className="navbar-brand" style={{ fontFamily: "Fc Lamoon", fontSize: "46px" }}>Staff Zone </h1>
          <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments-star" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M6 4v4"></path>
              <path d="M6 12v8"></path>
              <path d="M12 4v9.5"></path>
              <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M18 4v1"></path>
              <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"></path>
              <path d="M18 9v1"></path>
            </svg>

          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ fontFamily: "MN Kha Ki", fontSize: "40px" }}>Staff Zone&ensp;{i4}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" >
                <li className="nav-item" >
                  <a className="nav-link active" aria-current="page" href="/staff" style={{ fontFamily: "MN Kha Ki", fontSize: "26px" }}>Home Page</a>
                </li>
                <br></br>
                <li className="nav-item">
                  <a className="nav-link" href="/certification" style={{ fontFamily: "MN Kha Ki", fontSize: "26px" }}>Record Form</a>
                </li>
                <br></br>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontFamily: "MN Kha Ki", fontSize: "26px" }}>
                    More . . .
                  </a>
                  <ul className="dropdown-menu" >
                    <li><a className="dropdown-item" href="/#" style={{ fontFamily: "MN Kha Ki", fontSize: "26px" }} >Account</a></li>
                    <li><a className="dropdown-item" href="/#" style={{ fontFamily: "MN Kha Ki", fontSize: "26px" }}>Setting</a></li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li><a href="/" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ fontFamily: "MN Kha Ki", fontSize: "26px" }}>Log out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm" style={{fontFamily:"Futura"}}>
          <div className="modal-content">
            <div className="modal-header">
              Staff Zone log out
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            Are you sure you want to log out
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
              <button onClick={handleLogout} type="button" className="btn btn-dark">Log out</button>
            </div>
          </div>
        </div>
      </div>
      <table className="table " style={{ fontFamily: "Futura", fontSize: "18px", marginTop: "6rem" }}>
        <thead className="table-dark" style={{ fontFamily: "MN Kha Ki", fontSize: "30px" }}>
          <tr>
            <th scope="col">Certificte No.</th>
            <th scope="col">Product/Service</th>
            <th scope="col">Company</th>
            <th scope="col">Standard</th>
            <th scope="col">Approval Date</th>
            <th scope="col">Valid Until</th>
            <th scope="col">
              <a className="text-white" type="button" href="/certification">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-text-plus" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "0.3rem" }}>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19 10h-14"></path>
                  <path d="M5 6h14"></path>
                  <path d="M14 14h-9"></path>
                  <path d="M5 18h6"></path>
                  <path d="M18 15v6"></path>
                  <path d="M15 18h6"></path>
                </svg>
              </a>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {infomation.map((item) => (
            <tr key={item.certificateNo}>
              <td>{item.certificateNo}</td>
              <td>{item.scope}</td>
              <td>{item.company}</td>
              <td>{item.standard}</td>
              <td>{formatDate(item.approval)}</td>
              <td>{formatDate(item.until)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light btn-link text-black"
                  onClick={()=>handleClick(item.certificateNo)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
}
export default Staff;