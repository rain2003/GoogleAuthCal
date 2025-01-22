/* eslint-disable no-unused-vars */
import { useState } from 'react'  
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/login';
import CalendarEvents from './components/CalendarEvents';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
const clientId = "999587599632-qplbd5gbnp4cctf1scn8vc6e41iqjgqv.apps.googleusercontent.com";


function App() {
  useEffect(() => {
    const initClient = () => {
      gapi.load("client:auth2", () => {
        gapi.auth2.init({
          clientId: clientId,
          scope: "https://www.googleapis.com/auth/calendar.readonly",
        });
      });
    };
    initClient();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/calendar" element={<CalendarEvents />} />
      </Routes>
    </Router>
  );
}
export default App
