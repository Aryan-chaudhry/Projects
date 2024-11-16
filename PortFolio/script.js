let hireButton = document.getElementsByClassName("Hire-btn")[0];
let displayme = document.getElementsByClassName("btn-fnc")[0];
let querybtn = document.getElementsByClassName("sendQuery");

displayme.style.opacity = "0";


hireButton.addEventListener('click', () => {
    console.log("button is clicked");
    
    if (displayme.style.opacity === '0') {
        displayme.style.opacity = '1'; // Make it visible only if it's hidden
        displayme.style.transition = "opacity 1s ease";
    }
   
    
});

document.querySelector(".resume").addEventListener('click', function() {
    // Create an invisible anchor tag to trigger the download
    var a = document.createElement('a');
    a.href = '"C:\Users\ARYAN\Downloads\Resume_Aryan_up_to_date.pdf"';  // Replace with the correct file path
    a.download = 'Resume.pdf';           // Optional: specify the download filename
    a.style.display = 'none';            // Hide the link
    document.body.appendChild(a);
    
    // Trigger the download
    a.click();
    
    // Remove the link after the download
    document.body.removeChild(a);
  });

  let success = document.getElementById("check");
  let Pop = document.getElementById("pop-up");

  success.style.opacity="0";
  Pop.style.opacity="0";

  function visible(){

    success.style.opacity="1";
    Pop.style.opacity="1";

  }




let firstName = document.getElementById("firstname").value;
let lastName = document.getElementById("lastname").value;
let fullName = ` ${firstName} + ${lastName}`;
console.log(fullName);

issuccesfull = false;

function sendMail(){
    let params = {
        name : document.getElementById("firstname").value,
        email : document.getElementById("Emailme").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value,
    }

    emailjs.send("service_zj8mpf8", "template_1muh76h", params).then(visible());
}

issuccesfull = true;



let Line = document.getElementById("Threeline");
let header = document.querySelector("header");
let body = document.querySelector("body");

let popup = document.getElementsByClassName("popup")[0];

popup.style.display = "none";

let ispop = false;

Line.addEventListener("click", () => {
    
    if(ispop == false){
        popup.style.display = "grid";
        ispop = true;
    }
    else{
        popup.style.display = "none";
        ispop = false;
    }
})


   

  






