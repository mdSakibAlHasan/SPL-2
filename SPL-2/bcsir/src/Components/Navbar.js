import React from 'react'
//import HomeMain from './HomeMain'

export default function Navbar() {
  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-info bg-gradient">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">BCSIR </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">About BCSIR</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            BCSIR Stucture
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/">Overview</a></li>
            <li><a className="dropdown-item" href="/">Institution</a></li>
          </ul>
        </li>
        <li className="nav-item d-flex">
          
        </li>
      </ul>
      
      <a href="/Login" className="btn btn-outline-light">User Login</a>
    </div>
  </div>
</nav>
    </div>
  )
}
