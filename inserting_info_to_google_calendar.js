const { google } = require("googleapis");
require("dotenv").config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = "+03:00";

// Insert new event to Google Calendar
const insertEvent = async (event) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
    });

    if (response["status"] == 200 && response["statusText"] === "OK") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};

let startDateTime = "2023-09-11T17:00:00+03:00"; //adjust it
let endDateTime = "2023-09-11T19:00:00+03:00";

// Event for Google Calendar
let event = {
  summary: `Created event in google calendar through API.`,
  description: `This is the description.`,
  start: {
    dateTime: startDateTime,
    timeZone: "Europe/Vilnius",
  },
  end: {
    dateTime: endDateTime,
    timeZone: "Europe/Vilnius",
  },
};

insertEvent(event)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
