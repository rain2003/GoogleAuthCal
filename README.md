# **Google Calendar Events Viewer**

A web application that fetches and displays events from a Google Calendar. Users can view their calendar events, refresh the data, and filter events by a specific date.

---

## **Features**

- **Google Calendar Integration**: Fetch and display calendar events directly from Google Calendar.

- **Event Management**:
  - View event details, including **name**, **date**, **time**, and **location**.
  - Filter events by a selected date.
  - Refresh event data to retrieve the latest updates.

- **Responsive Design**: Works seamlessly across different devices.

- **User-Friendly Interface**: Clean and intuitive layout for easy navigation.

---

## **Technologies Used**

### **Frontend**
- React.js
- Material-UI (MUI) for icons and styling

### **Backend**
- Google Calendar API integration

### **Styling**
- Custom CSS with responsive and accessible design principles

---

## **Installation and Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rain2003/GoogleAuthCal.git
   cd GoogleAuthCal

2. **Install the dependencies**:
    ```bash
    npm install

3. **Set up your Google Cloud Console Client ID:**
Go to the Google Cloud Console.
Create or select a project and enable the Google Calendar API.
Create OAuth 2.0 credentials and obtain your Client ID.
Create a .env file in the root directory and add the following line:
    ```bash
    REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

4. **Start the development server:**
Run the development server with the command:
    ```bash
    npm run dev

5. **Open the application:**
Open your browser and navigate to:
http://localhost:3000