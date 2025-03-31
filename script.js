// References to HTML elements
const nameInput = document.getElementById("nameInput");
const button = document.getElementById("predictBtn");
const message = document.getElementById("nameMessage");

// Variables for display result
const gender = document.getElementById("genderResult");
const age = document.getElementById("ageResult");
const nation = document.getElementById("nationalityResult");

// Prediction button
button.addEventListener("click", () => {
    const name = nameInput.value; 

    // If name is empty display error message
    if (name == "") {
        message.style.display = "block";
        message.innerHTML = "Name entry required";
        message.style.color = "red";

    // user entered a name
    } else { 
        // Remove error message
        message.style.display = "none";

        // Make gender API call
        fetch(`https://api.genderize.io?name=${name}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Error fetching gender data!");
                
                } else {
                    return response.json();
                }
            })

            .then((display) => {
                gender.innerHTML = `Gender: ${display.gender || "Unknown"}`;
            })

            .catch((error) => {
                gender.innerHTML = "Error fetching gender data";
            });

        // Make age API call
        fetch(`https://api.agify.io?name=${name}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Error fetching age data!");

                } else {
                    return response.json();
                }
            })

            .then((display) => {
                age.innerHTML = `Age: ${display.age || "Unknown"}`;
            })

            .catch((error) => {
                age.innerHTML = "Error fetching age data";
            });

        // Make nationality API call
        fetch(`https://api.nationalize.io/?name=${name}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Error fetching nationality data!");
                
                } else {
                    return response.json();
                }
            })

            .then((display) => {
                const nationality = display.country[0]?.country_id || "Unknown";
                nation.innerHTML = `Nationality: ${nationality || "Unknown"}`;
            })

            .catch((error) => {
                nation.innerHTML = "Error fetching nationality data";
            });
    }
});
