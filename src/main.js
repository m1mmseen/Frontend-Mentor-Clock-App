'use strict'

/*  GENERAL VARIABLES  */

let clientIp = '';
let greet = document.getElementById("greeting");


/* WHEN SITE IS LOADED */
getQuote();
getCurrentTime();
getLocation();


/*  GET QUOTE FROM API   */

const newQuote = document.getElementById("newQuote");
newQuote.addEventListener("click", getQuote);

async function getQuote(){
    await fetch("https://api.quotable.io/random?tags=technology|science")
        .then(response  => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(('Error fetching quote!'))
            }
        })
        .then(data => {
            const res = data;
            document.getElementById("quote").innerHTML =  data.content;
            document.getElementById("author").innerHTML = data.author;
        })
}
/*    TIME    */

const time = document.getElementById("time");
const abbreviation = document.getElementById("abbreviation");
const timezone = document.querySelector("#timezone>h2");
const dayOfTheYear = document.querySelector("#dayOfTheYear>h2");
const dayOfTheWeek = document.querySelector("#dayOfTheWeek>h2");
const weekNumber = document.querySelector("#weekNumber>h2");

async function getCurrentTime() {
    await fetch("https://worldtimeapi.org/api/ip")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(('Error fetching time!'))
            }
        })
        .then(data => {
            let currentTime = new Date(data.datetime).toTimeString().split(' ')[0].substring(0, 5);
            time.innerHTML = currentTime;
            abbreviation.innerHTML = data.abbreviation;
            timezone.innerText = data.timezone;
            dayOfTheYear.innerHTML = data.day_of_year;
            dayOfTheWeek.innerHTML = data.day_of_week;
            weekNumber.innerHTML = data.week_number;
            const hour = parseInt(currentTime.split(":")[0]);
            setBackground(hour);
            greeting(hour);

            clientIp = data.client_ip;
        })
}

/*   LOCATION    */

let cityAndState = document.getElementById("location");
async function getLocation() {
    await fetch("https://api.ipbase.com/v2/info?apikey=ipb_live_iOkRxpeTlPX1VsHM3t1Y5MwNAb8dRrEoKgN4VzpA&ip=" + clientIp)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(('Error fetching location!'))
            }
        })
        .then(res => {
            cityAndState.innerHTML = "in " + res.data.location.city.name + ", " + res.data.location.country.alpha2;
            console.log();
        })
}

/*   MORE OR LESS DETAILS   */

let toggled = false;

const moreLess = document.getElementById("more-less");
moreLess.addEventListener("click", moreInfoToggle);

function moreInfoToggle() {
    const path= document.querySelector("svg>path");
    const buttonText = document.querySelector("button>p");
    const mainContainer = document.querySelector(".top-section");
    const details = document.querySelector(".bottom-section");
    if (!toggled) {
        path.setAttribute("d", "M14 23L20 17L26 23");
        buttonText.innerHTML = "less";
        mainContainer.classList.add("top-move-up");
        details.classList.add("bottom-move-up");

        toggled = true;
    } else {
        path.setAttribute("d", "M14 17L20 23L26 17");
        buttonText.innerHTML = "more"
        mainContainer.classList.remove("top-move-up");
        details.classList.remove("bottom-move-up");

        toggled = false;
    }
}

/*    SET BACKGROUND BY TIME   */

function setBackground(hour){
    const body = document.body;
    const bottomSection = document.querySelector(".bottom-section");
    if (hour >= 5 || hour <= 18) {
        body.classList.add("daytime-picture");
        bottomSection.style.background = "hsl(0, 0%, 96%)";
    } else {
        body.classList.add("nighttime-picture");
        bottomSection.style.background = "hsl(0, 0%, 19%)";
    }
}

function greeting(hour) {

    if (hour >= 5 && hour < 12){
        greet.innerHTML = "Good morning"
    } else if (hour >= 12 && hour < 18) {
        greet.innerHTML = "Good afternoon";
    } else {
        greet.innerHTML = " Good evening";
    }
}
