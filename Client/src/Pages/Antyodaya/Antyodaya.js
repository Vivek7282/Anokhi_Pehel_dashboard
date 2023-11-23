import React from "react";
import "./antyodaya.css";
import hero from "../../../src/image/LOGO (1).png";
import hero1 from "../../../src/image/Antodaya1.png";
export default function Antyodaya() {
  return (
    <div>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <a href="index.html">Antyodaya</a>
          </h1>
          {/* Uncomment below if you prefer to use an image logo */}
          {/* <a href="index.html" className="logo">
            <img src={hero} alt="" className="img-fluid" />
          </a> */}
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto" href="/aboutAntyodaya">
                  About
                </a>
              </li>

              <li>
                <a className="nav-link scrollto" href="/schoolAntyodaya">
                  Schools
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/eventsAntyodaya">
                  Events
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="getstarted scrollto" href="/registerAntyodaya">
                  Get Registered
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
      <section id="hero" className="d-flex align-items-center">
        <div className="container-fluid" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Antyodaya: Kids' Carnival by Anokhi Pehel</h1>
              <h2 style={{ color: "black", fontWeight: "bold" }}>
                We cordially invite all underprivileged students to become a
                part of the "Antyodaya" To secure your place in this exceptional
                event:
              </h2>

              <div>
                <a href="#about" className="btn-get-started scrollto">
                  Get Started
                </a>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <img src={hero} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
