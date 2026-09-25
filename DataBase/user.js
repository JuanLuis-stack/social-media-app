// user.js

// fetch("http://localhost:3000/auth/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     name: "Elias Reyes",
//     email: "EliasReyest@example.com",
//     password: "password123",
//   }),
// });

// fetch("http://localhost:3000/posts/28/comments",{
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsIm5hbWUiOiJqb2huIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzg1NDU4ODUxLCJleHAiOjE3ODU0NjI0NTF9.ScRVrqO8imh5b-8daEkf6oAErC3BRQH2juAclw2GnpA`
//     },
//     body: JSON.stringify({
//         content: "Bro you are absolutely rigth, if I keep leaving the way I am I will not go anyware, I'm very grateful with you for this, bro keep giving advicing other you are truly changing the live of the peaple"
//     })
// });

// fetch("http://localhost:3000/users/30");
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// POST an post
// fetch("http://localhost:3000/users/me/posts",{
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsI…TU3fQ.dwZ3qvXxYcfdllgd2m1bxeo8ZOhL-2aOsJ8VykIIcsI`
//     },
//     body: JSON.stringify({
//         title: "Christ come soon",
//         content: "Nobody could never be as well as could with Jesus, he is the first and the last, the bigining and the end the alfa and the omega"
//     })
// });

// // Get user posts
fetch("http://localhost:3000/notifications/36/read", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsIm5hbWUiOiJKdWFuIEx1aXMgQVIuIiwiZW1haWwiOiJKdWFuTHVpc0FyaWFzUm9qYXMzMkBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGIxL0k1Y2g0V3dVbW0ud0t1R1BLVE84cnVzTVVNMHhScHIyaEYyMDR6TzhwTmhmcmhvdklxIiwidXNlcl9uYW1lIjoiSnVhbkx1aXNBcmlhc1JvamFzIiwicHJlc2VudGF0aW9uIjpudWxsLCJpYXQiOjE3ODk0ODU5ODUsImV4cCI6MTc4OTQ4OTU4NX0._-H0JFUHxlX1o6FWo08dcK5r24ig0bVZnwB4kTKG2i0",
  },
});

// fetch("http://localhost:3000/users/30");
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
