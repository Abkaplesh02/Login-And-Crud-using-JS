const EmailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PassRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const UserN=document.querySelector("#Username")
const UserEmail=document.querySelector("#email");
const UserPassword=document.querySelector("#password");
const Formu=document.querySelector("#registrationForm");


document.querySelector("#registrationForm").addEventListener('submit',function(e){
    e.preventDefault();

    UserEmail.setCustomValidity('');
    if(!EmailRegex.test(UserEmail.value)){
        UserEmail.setCustomValidity("Enter email in correct format");
        UserEmail.reportValidity();
        return;
    }

    UserPassword.setCustomValidity('');
    if(!PassRegex.test(UserPassword.value)){
        UserPassword.setCustomValidity("Enter password in correct format");
        UserPassword.reportValidity();
        return;
    }

    if(localStorage.getItem(UserN.value)){
        const userD=JSON.parse(localStorage.getItem(UserN.value));
        
        if(UserPassword.value==userD.password){

          Toastify({
            text: "Login Successful!",  // Message you want to show
            duration: 1500,  // Time in milliseconds (3000 = 3 seconds)
            gravity: "top",  // "top" or "bottom"
            position: "right", // "left", "center", "right"
            backgroundColor: "linear-gradient(to right, #ff6a00, #ff3e00)", // Custom background gradient
            stopOnFocus: true, // Stops toast on hover
            close: true,  // Enable close button
            className: "custom-toast",  // Custom class for further CSS styling
        }).showToast();

        localStorage.setItem("CurrentUser",JSON.stringify(userD));

        

        setTimeout(()=>{
            window.location.href="/Management System/index.html";
        },1000);

        Formu.reset();
        
        return 

        }
        else{


            Toastify({
                text: "Password Wrong!",  // Message you want to show
                duration: 3000,  // Time in milliseconds (3000 = 3 seconds)
                gravity: "top",  // "top" or "bottom"
                position: "right", // "left", "center", "right"
                backgroundColor: "linear-gradient(to right, #ff6a00, #ff3e00)", // Custom background gradient
                stopOnFocus: true, // Stops toast on hover
                close: true,  // Enable close button
                className: "custom-toast",  // Custom class for further CSS styling
            }).showToast();

            return;
           
        }
    }
    else{


        Toastify({
            text: "User Not Found!",  // Message you want to show
            duration: 3000,  // Time in milliseconds (3000 = 3 seconds)
            gravity: "top",  // "top" or "bottom"
            position: "right", // "left", "center", "right"
            backgroundColor: "linear-gradient(to right, #ff6a00, #ff3e00)", // Custom background gradient
            stopOnFocus: true, // Stops toast on hover
            close: true,  // Enable close button
            className: "custom-toast",  // Custom class for further CSS styling
        }).showToast();
        return; 
    }

})

UserEmail.addEventListener('input',function(){
    UserEmail.setCustomValidity('');
    UserEmail.reportValidity();
})

UserPassword.addEventListener('input',function(){
    UserPassword.setCustomValidity('');
    UserPassword.reportValidity();
})




