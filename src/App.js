// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VideoConference from "./VideoConference";
import CollaboratedDocument from "./CollaboratedDocument";
import Todo from "./Todo";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="app-container bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-600 mt-8">Welcome to the Remote App</h1>
        <div className="buttons-container flex flex-wrap justify-center mt-8 space-x-4">
          <Link to="/video-conference" className="button-link">
            <button className="button bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200">
              Video Conference
            </button>
          </Link>
          <Link to="/collaborated-document" className="button-link">
            <button className="button bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200">
              Collaborated Document
            </button>
          </Link>
          <Link to="/task-management" className="button-link">
            <button className="button bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200">
              Task Management
            </button>
          </Link>
        </div>
        <div className="routes-container mt-12 w-full max-w-4xl px-4">
          <Routes>
            <Route path="/video-conference" element={<VideoConference />} />
            <Route path="/collaborated-document" element={<CollaboratedDocument />} />
            <Route path="/task-management" element={<Todo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
