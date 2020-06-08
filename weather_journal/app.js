/* Global Variables */
// openweathermap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const countryCode = "US";
const apiKey = "4fc2f29d77433e83eb687ec5c1e47911";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

// Form information
const generateButton = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const textArea = document.querySelector("#feelings");

// UI to update dynamically
const dataInfo = document.querySelector("#date");
const tempInfo = document.querySelector("#temp");
const contentInfo = document.querySelector("#content");

// Container (#entryHolder) for dynamically update information above

const entryContainer = document.querySelector("#entryHolder");

// check to see if "zip" is 5 digits, ONLY digits.
zip.addEventListener("change", (e) => {
  if (e.target.value.length < 5) {
    alert("Zip code must be 5 digits");
  }
  if (isNaN(e.target.value)) {
    alert("Zip code MUST be numbers, ONLY");
  }
});

// Update UI
const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const returnedData = await req.json();

    const wrapperEl = (title, elClass) => {
      const divEl = document.createElement("div");
      const spanEl = document.createElement("span");

      // Add class w/ classList.add
      divEl.classList.add(elClass);

      // Append elements
      entryContainer.appendChild(divEl);
      divEl.innerHTML = title;
      divEl.appendChild(spanEl);

      return spanEl;
    };

    returnedData.data.forEach((dataItem) => {
      //Create elements & append content (data/temp/content)
      if (dataItem.userResponse !== undefined) {
        wrapperEl("Feels like: ", "content").innerHTML = dataItem.userResponse;
      }

      if (dataItem.temperature !== undefined) {
        wrapperEl("Temperature: ", "temperature").innerHTML =
          dataItem.temperature;
      }
      if (dataItem.currentDate !== undefined) {
        wrapperEl("Date: ", "data").innerHTML = dataItem.currentDate;
      }
    });

    // Reset form
    zip.value = "";
    textArea.value = "";
  } catch (error) {
    console.log("Update UI error", error);
  }
};

generateButton.addEventListener("click", (e) => {
  const textAreaContent = textArea.value;
  const zipCode = zip.value;

  if (zipCode === "") {
    alert("Please enter a 5 digit zip code.");
  }

  event.preventDefault();
  entryContainer.innerHTML = "";

  // GET request
  const getForcast = async (baseURL, zipCode, countryCode, apiKey) => {
    const urlReq = `${baseURL}zip=${zipCode},${countryCode}&units=imperial&appid=${apiKey}`;
    const response = await fetch(urlReq);
    try {
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Error", error);
    }
  };

  // POST request
  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };

  // Chaining Promises
  getForcast(baseURL, zipCode, countryCode, apiKey)
    .then((data) => {
      if (data.main !== undefined) {
        data.main.currentTime = newDate;
        data.main.userResponse = textAreaContent;
      } else {
        alert("Error, Please enter valid zip code!");
      }

      postData("/db", data);
    })
    .then(() => {
      updateUI();
    });
});

window.onload = () => {
  updateUI();
};
