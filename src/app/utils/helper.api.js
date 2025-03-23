
'use client'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { API_URL } from './config';
import { Toast } from 'primereact/toast';
import { useSession } from "next-auth/react";

export function useGetData(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${url}`);
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]);

  return { loading, data, error };
}

export function useGetDataPar(url, datas) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/${url}`, datas);
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]);

  return { loading, data, error };
}

export function userplandata() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  if (session && session.user_id) {


    const fetchData = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('user_id', session.user_id);
        formData.append('active', 1);
        const response = await axios.post(`${API_URL}/get_user_package.php`, formData);
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

  }
  return { loading, data, error };

}




export const copyText = (textToCopy) => {
  return new Promise((resolve, reject) => {
    navigator.clipboard.writeText(textToCopy)
      .then(function () {
        resolve(true);
      })
      .catch(function (err) {
        reject(false);
      });
  });
}


export function timestamp(timestamp) {
  const date = new Date(timestamp);
  const humanReadable = date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return humanReadable
}

export function humanReadableToDate(humanReadable) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const parts = humanReadable.split(', ');
  const [weekday, monthDay, year] = parts;

  // Extract the month and day from the monthDay part
  const [month, day] = monthDay.split(' ');

  // Parse the date string in a format that the Date constructor can understand
  const dateString = `${month} ${day}, ${year}`;
  const date = new Date(dateString);

  return date;
}


export function getCurrentTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function addDaysToDate(dateString, daysToAdd) {
  const dateParts = dateString.split(/[- :]/); // Split the date string by hyphen, space, and colon
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Convert month to 0-indexed format
  const day = parseInt(dateParts[2], 10);
  const hours = parseInt(dateParts[3], 10);
  const minutes = parseInt(dateParts[4], 10);
  const seconds = parseInt(dateParts[5], 10);

  const date = new Date(year, month, day, hours, minutes, seconds);
  date.setDate(date.getDate() + daysToAdd); // Add the days

  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const newDay = String(date.getDate()).padStart(2, '0');
  const newHours = String(date.getHours()).padStart(2, '0');
  const newMinutes = String(date.getMinutes()).padStart(2, '0');
  const newSeconds = String(date.getSeconds()).padStart(2, '0');

  return `${newYear}-${newMonth}-${newDay} ${newHours}:${newMinutes}:${newSeconds}`;
}


export function hasTimePassed(targetDateTime) {
  const [datePart, timePart] = targetDateTime.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes, seconds] = timePart.split(':');
  const targetDate = new Date(year, month - 1, day, hours, minutes, seconds);
  const now = new Date();
  console.log("hit");
  return targetDate < now;
}

export function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
  return regex.test(email);
}

export function containsNumber(str) {
  // Regex pattern to check if the string contains any digit
  const regex = /\d/;
  return regex.test(str);
}

export function compareDates(currentDateStr, otherDateStr) {
  const currentDate = new Date(currentDateStr);
  const otherDate = new Date(otherDateStr);
  if (currentDate < otherDate) {
    // Current date is before the other date.
    return 1;
  } else if (currentDate > otherDate) {
    // Current date is after the other date
    return 0;
  } else {
    // same
    return 2;
  }
}


export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function isoToHumanReadable(isoDate) {
  const date = new Date(isoDate);
  const humanReadable = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return humanReadable;
}

export function humanReadableToISO(humanReadable) {
  const [day, month, year] = humanReadable.split(' ');
  const date = new Date(`${day} ${month} ${year}`);

  const isoDate = date.toISOString().split('T')[0];
  return isoDate;
}


export function splitDateRange(dateRange) {
  const dates = dateRange.split(' - ');
  return dates;
}

// profile
export function formatDatess(dateString) {
  // Parse the input date string
  const parsedDate = new Date(dateString);
  // Format the date as "yyyy-MM-dd"
  const formattedDate = parsedDate.toISOString().split('T')[0];

  return formattedDate;
}



export const countryValues = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Indian Ocean Ter",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Canary Islands",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Channel Islands",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos Island",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote DIvoire",
  "Croatia",
  "Cuba",
  "Curaco",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Ter",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Great Britain",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Hawaii",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "North Korea",
  "South Korea",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malaysia",
  "Malawi",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Midway Islands",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherland Antilles",
  "Netherlands",
  "Nevis",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau Island",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Island",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of Montenegro",
  "Republic of Serbia",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "St Barthelemy",
  "St Eustatius",
  "St Helena",
  "St Kitts-Nevis",
  "St Lucia",
  "St Maarten",
  "St Pierre & Miquelon",
  "St Vincent & Grenadines",
  "Saipan",
  "Samoa",
  "Samoa American",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "South Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tahiti",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos Is",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City State",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (Brit)",
  "Virgin Islands (USA)",
  "Wake Island",
  "Wallis & Futana Is",
  "Yemen",
  "Zaire",
  "Zambia",
  "Zimbabwe"
];
