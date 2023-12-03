// Select the form element and the span inside the button area within the form
const form = document.querySelector("form"),
      statusTxt = form.querySelector(".button-area span");

// Handle the form submission
form.onsubmit = (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Set initial styles and text for the status message
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  // Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // Configure the request: method (POST), URL ("message.php"), and asynchronous (true)
  xhr.open("POST", "message.php", true);

  // Define the function to execute when the request completes
  xhr.onload = () => {
    // Check if the request completed successfully (status 200) and if the readyState is 4 (DONE)
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Get the response from the server
      let response = xhr.response;

      // Check the response for specific error messages and adjust styles accordingly
      if (
        response.indexOf("Email and message field is required!") != -1 ||
        response.indexOf("Enter a valid email address!") != -1 ||
        response.indexOf("Sorry, failed to send your message!") != -1
      ) {
        statusTxt.style.color = "red";
      } else {
        // If there are no errors, reset the form and hide the status message after 3 seconds
        form.reset();
        setTimeout(() => {
          statusTxt.style.display = "none";
        }, 3000);
      }

      // Set the status message text and remove the "disabled" class from the form
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  };

  // Create a FormData object from the form, which will include all form data
  let formData = new FormData(form);

  // Send the form data to the server using the XMLHttpRequest object
  xhr.send(formData);
};
