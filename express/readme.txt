10:46 AM 10/28/2023
["C:\tmp\express\readme.txt"]
https://www.pluralsight.com/courses/nodejs-express-web-applications-building

Building Web Applications with Node.js and Express
by Jonathan Mills
npm init -y
npm install express
    "express": "^4.18.2"
npm install express@4.17
caret allows 
Caret allows changes that do not modify the left-most non-zero digit
create app.js

node app.js
to run the application
npm install chalk@4.1

set debug=*
set debug=app
to view only custom messages

https://github.com/henrymatt/ps-js-arrays-objects/blob/main/backend/app.js
Matt Henry henrymatt

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 17
ETag: W/"11-rsRvmtdPMqoYWEjsypsndZZIcCI"
Date: Sat, 28 Oct 2023 10:02:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5

8:35 AM 10/31/2023
Brice Wilson Http Communication
REST services
C create
POST http://localhost/api/books
if success 201 Created
 and the newly created resource will be returned in the body of http response

PUT update
 if success 204 No Content

DELETE 
 if success 204 No Content

this.http.get<Book[]>('/api/books')
optional headers
Accept: application/json, text/plain, */*

Handling errors
console.log HttpErrorResponse
logged from the component, so the http implementation details leaked from the service into the component
more application-specific error would be returned to the component

catchError, throwError (to send the new object)

Argument of type 'number' is not assignable to parameter 
of type '(err: any, caught: Observable<void>) => ObservableInput<any>'


