![thumbnailv1](assets/thumbnail.png)

Base URL: http://localhost:3000 (or set `PORT` in `.env`)

## Users

- Register: POST `/api/users/register` — Create a new user
- Login:    POST `/api/users/login` — Authenticate a user
- Logout:   POST `/api/users/logout` — End user session

Full addresses (local):

- http://localhost:3000/api/users/register
- http://localhost:3000/api/users/login
- http://localhost:3000/api/users/logout

## Posts

- Create: POST   `/api/posts/create` — Create a new post
- Get:    GET    `/api/posts/get` — Retrieve posts
- Update: PUT    `/api/posts/update` — Update an existing post
- Delete: DELETE `/api/posts/delete` — Remove a post

Full addresses (local):

- http://localhost:3000/api/posts/create
- http://localhost:3000/api/posts/get
- http://localhost:3000/api/posts/update
- http://localhost:3000/api/posts/delete

---
Notes:

- The server uses `process.env.PORT` or defaults to `3000` (see `src/index.js`).
- Routes are mounted in `src/app.js` under `/api/users` and `/api/posts`.