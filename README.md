![GitHub top language](https://img.shields.io/github/languages/top/pablomatheus171/api-node-ts?style=plastic)
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="182" height="20" role="img" aria-label="Coverage:statements: 80.92%"><title>Coverage:statements: 80.92%</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="182" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="129" height="20" fill="#555"/><rect x="129" width="53" height="20" fill="#dfb317"/><rect width="182" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="655" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="1190">Coverage:statements</text><text x="655" y="140" transform="scale(.1)" fill="#fff" textLength="1190">Coverage:statements</text><text aria-hidden="true" x="1545" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="430">80.92%</text><text x="1545" y="140" transform="scale(.1)" fill="#fff" textLength="430">80.92%</text></g></svg>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="170" height="20" role="img" aria-label="Coverage:functions: 71.42%"><title>Coverage:functions: 71.42%</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="170" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="117" height="20" fill="#555"/><rect x="117" width="53" height="20" fill="#e05d44"/><rect width="170" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="595" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="1070">Coverage:functions</text><text x="595" y="140" transform="scale(.1)" fill="#fff" textLength="1070">Coverage:functions</text><text aria-hidden="true" x="1425" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="430">71.42%</text><text x="1425" y="140" transform="scale(.1)" fill="#fff" textLength="430">71.42%</text></g></svg>
### Register
- [x] - Register user with fields name,email,password
 

#### Business logic
- [x] - Validate if fields are provided
- [x] - If no fields is provided, return bad request (error 400)
- [x] - Validate Email
- [x] - If Invalid Email is provided,return bad request (error 400)
- [x] - if user already exists no add user
- [x] - if crendentials are valids, add user 
- [x] - If fields provided are valids, return 201 (created) and access token

