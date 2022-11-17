### Register
[] - Register user with fields name,email,password
 

#### Business logic
[x] - Validate if fields are provided
[x] - If no fields is provided, return bad request (error 400)
[x] - Validate Email
[x] - If Invalid Email is provided,return bad request (error 400)
[x] - if user already exists no add user
[] - if crendentials are valids, add user 
[] - If fields provided are valids, return success (200 Ok) and access token


pending...
- return token in authenticate.spec.ts