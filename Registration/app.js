        const termsCheckbox = document.getElementById('terms');
        const registerButton = document.querySelector('.register-btn');
        const mobileInput = document.getElementById('mobile');
        const countryCodeSelect = document.getElementById('country-code');
        const mobileFormat = document.getElementById('mobile-format');
        const NameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        const EmailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const PassRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const UserRegex=/^[a-zA-Z0-9._-]{3,16}$/;
        const fullName=document.querySelector("#name")
        const Email=document.querySelector("#email");
        const PassW=document.querySelector("#password");
        const UserN=document.querySelector("#Username");
        let existingData=JSON.parse(localStorage.getItem('RegistrationData'))|| [];


        function isUnique(UserN){
            if(localStorage.getItem(UserN.value)){
                return true;
            }
            return false;
        }

        termsCheckbox.addEventListener('change', function () {
            registerButton.disabled = !this.checked;
        });

        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault();



            UserN.setCustomValidity('');
    const UserFull=UserN.value.trim();

    

    if(!UserRegex.test(UserFull)){
        UserN.setCustomValidity('Please enter a valid UserName');
        UserN.reportValidity();
        
        return;
    }

    if(isUnique(UserN)){
        UserN.setCustomValidity('Please enter a unique username');
        UserN.reportValidity();
        return;
    }

    
           // Reset previous custom validity message
    fullName.setCustomValidity('');

    // Validate full name, trim extra spaces to prevent issues
    const nameValue = fullName.value.trim();

    // Test if the name matches the regex
    if (!NameRegex.test(nameValue)) {
        fullName.setCustomValidity('Please enter a valid full name (e.g., John Doe).');
        fullName.reportValidity();  // Show the error message
        return; // Stop form submission
    }

    Email.setCustomValidity('');
    const emailFull=Email.value.trim();

    if(!EmailRegex.test(emailFull)){
        Email.setCustomValidity('Please enter a valid Email ID');
        Email.reportValidity();
        return;
    }


    PassW.setCustomValidity('');

    if(!PassRegex.test(PassW.value)){
        PassW.setCustomValidity('Please enter a valid PassWord');
        PassW.reportValidity();
        return;
    }


            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const formData={
                username: UserFull,
                fullName: nameValue,
                email: emailFull,
                password: password,
                mobile: mobileInput.value,
                countryCode: countryCodeSelect.value
            }


            localStorage.setItem(UserN.value,JSON.stringify(formData));

            
            Toastify({
                text: "Registration Successful!",  // Message you want to show
                duration: 3000,  // Time in milliseconds (3000 = 3 seconds)
                gravity: "top",  // "top" or "bottom"
                position: "right", // "left", "center", "right"
                backgroundColor: "linear-gradient(to right, #ff6a00, #ff3e00)", // Custom background gradient
                stopOnFocus: true, // Stops toast on hover
                close: true,  // Enable close button
                className: "custom-toast",  // Custom class for further CSS styling
            }).showToast();
            

            document.getElementById('registrationForm').reset();
            
        
            // setTimeout(()=>{
            //     window.location.href ="/Login/index.html";
            // },3000)

        });


        UserN.addEventListener('input', function(){
            UserN.setCustomValidity('');
            UserN.reportValidity();
        })


        fullName.addEventListener('input', function() {
            fullName.setCustomValidity(''); // Reset custom validity on input change
        
            // Manually trigger validation to update UI (important for resetting error state)
            fullName.reportValidity();
        });

        

        Email.addEventListener('input', function(){
            Email.setCustomValidity('');
            Email.reportValidity();
        })

        PassW.addEventListener('input', function(){
            PassW.setCustomValidity('');
            PassW.reportValidity();
        })
        

        countryCodeSelect.addEventListener('change', function() {
            const countryCode = this.value;
            mobileInput.value = countryCode + " "; // Automatically add the country code
            updateMobileFormat(countryCode);
        });

        function updateMobileFormat(countryCode) {
            switch (countryCode) {
                case '+1':
                    mobileFormat.textContent = 'Format: +1 123-456-7890';
                    mobileInput.pattern = '\\+1 [0-9]{3}-[0-9]{3}-[0-9]{4}';
                    mobileInput.placeholder = '+1 123-456-7890';
                    break;
                case '+44':
                    mobileFormat.textContent = 'Format: +44 1234 567890';
                    mobileInput.pattern = '\\+44 [0-9]{4} [0-9]{6}';
                    mobileInput.placeholder = '+44 1234 567890';
                    break;
                case '+91':
                    mobileFormat.textContent = 'Format: +91 12345 67890';
                    mobileInput.pattern = '\\+91 [0-9]{5} [0-9]{5}';
                    mobileInput.placeholder = '+91 12345 67890';
                    break;
                case '+61':
                    mobileFormat.textContent = 'Format: +61 123-456-789';
                    mobileInput.pattern = '\\+61 [0-9]{3}-[0-9]{3}-[0-9]{3}';
                    mobileInput.placeholder = '+61 123-456-789';
                    break;
                case '+81':
                    mobileFormat.textContent = 'Format: +81 12-3456-7890';
                    mobileInput.pattern = '\\+81 [0-9]{2}-[0-9]{4}-[0-9]{4}';
                    mobileInput.placeholder = '+81 12-3456-7890';
                    break;
                default:
                    mobileFormat.textContent = 'Format: +CountryCode MobileNumber';
                    mobileInput.pattern = '';
                    mobileInput.placeholder = 'Enter mobile number';
            }
        }

        // Initialize mobile input on page load with default country code
        updateMobileFormat(countryCodeSelect.value);
