### Login User 
<img width="50" src="https://cdn4.iconfinder.com/data/icons/user-experience-1/60/ux-outline-029-secure-log-in-256.png">

---

 - [x] - Receives a POST request on the /login endpoint;
 - [x] - Login User with fields email,password;
 - [x] - Should returns bad request (400) if the fields are not provided;
 - [x] - Should returns bad request (400) if the email is invalid;
 - [x] - should search for the user with the provided email and password
 - [x] - should generate an encrypted password;
 - [x] - should update user data with generated access token;
 - [x] - should generate an access token from the user Id;
 - [x] - Should returns ok (200) and access token if the user is successfully login;
 - [x] - should returns unauthorized (401) if you do not find a user with the data provided
 - [x] - should returns internal error 500 if there is an error when trying to generate the access token
 - [x] - should returns internal error 500 if there is an error when trying to update the user with the generated access token
 
 ---
