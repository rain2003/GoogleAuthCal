// components/CalendarEvents.js
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import '../styles/calendarStyles.css'
const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchEvents = async () => {
    try {
      setIsFetching(true); 

      await gapi.client.load("calendar", "v3");

      const response = await gapi.client.calendar.events.list({
        calendarId: "primary", 
        timeMin: new Date().toISOString(), 
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      });

      const allEvents = response.result.items || [];
      setEvents(allEvents); 
      setFilteredEvents(allEvents); 
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    } finally {
      setIsFetching(false); 
    }
  };

  const filterEventsByDate = (date) => {
    setSelectedDate(date);
  
    if (!date) {
      setFilteredEvents(events);
      return;
    }
  
    const selectedDateIST = new Date(date);
    
    selectedDateIST.setHours(0, 0, 0, 0); 
    selectedDateIST.setMinutes(selectedDateIST.getMinutes() + 330); 
  
    const filtered = events.filter((event) => {
      const eventStartDate = new Date(event.start.dateTime || event.start.date);
      eventStartDate.setHours(0, 0, 0, 0); 
      eventStartDate.setMinutes(eventStartDate.getMinutes() + 330); 
  
      return eventStartDate.getTime() === selectedDateIST.getTime();
    });
  
    setFilteredEvents(filtered);
  };
  

  useEffect(() => {
    fetchEvents(); 
  }, []);

  return (
    <div className="container">
      <h1>Google Calendar Events</h1>
  
      <div className="date-filter-container">
  <div className="left">
    <button className="refresh-button" onClick={fetchEvents} disabled={isFetching}>
      {isFetching ? "Refreshing..." : "Refresh Events"}
    </button>
  </div>
  <div className="right">
    <label htmlFor="dateFilter">Filter by Date:</label>
    <input
      type="date"
      id="dateFilter"
      value={selectedDate}
      onChange={(e) => filterEventsByDate(e.target.value)}
    />
    <button onClick={() => filterEventsByDate("")}>Clear Filter</button>
  </div>
</div>

  
      {/* Events Table */}
      {filteredEvents.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => {
              const startDateTime = new Date(event.start.dateTime || event.start.date);
              const endDateTime = new Date(event.end.dateTime || event.end.date);
  
              return (
                <tr key={event.id}>
                  <td>{event.summary || "No Title"}</td>
                  <td>{startDateTime.toLocaleDateString()}</td>
                  <td>
                    {startDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {endDateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td>{event.location || "No Location"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No events found for the selected date.</p>
      )}
    </div>
  );
  
};

export default CalendarEvents;
