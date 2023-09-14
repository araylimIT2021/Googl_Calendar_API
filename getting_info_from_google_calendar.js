const { google } = require("googleapis");
require("dotenv").config(); //REQUIRES PACKAGES

// Provide the required configuration
// READS CONFEDENTIAL PARAMETERS
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings CALLING API
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" }); // OBJ OF GOOGLE CALENDAR

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = "+03:00";

// Get date-time string for calender
const dateTimeForCalander = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  // Delay in end time is 1
  let endDate = new Date(
    new Date(startDate).setHours(startDate.getHours() + 1)
  );

  return {
    start: startDate,
    end: endDate,
  };
};

let dateTime = dateTimeForCalander();

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {
  try {
    let response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd,
      timeZone: "Europe/Vilnius",
    });

    let items = response["data"]["items"];
    return items;
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return 0;
  }
};

let start = "2023-09-03T00:00:00.000Z"; // insert dates
let end = "2023-10-04T00:00:00.000Z";

getEvents(start, end)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
