// const API_ROOT = `http://localhost:3000/api/v1`;
// const token = localStorage.getItem('token');
// const URL = "http://localhost:3000"

// const headers = {
//     'Content-Type': 'application/json',
//     Accepts: 'application/json',
//     Authorization: token
// };


// const login = data => {
//     return fetch(`${API_ROOT}/auth`, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(data)
//     }).then(resp => resp.json());
// };

// const getCurrentUser = () => {
//     console.log("getting current user", headers)
//     return fetch(`${API_ROOT}/current_user`, {
//         headers
//     }).then(res => {
//         console.log(res)
//         return res.json()
//     });
// };

// const currentUserStatus = (userStatus) => {
//     return userStatus
// }

// // const createUser = (data) => {
// //     fetch(URL + "/users", {
// //         method: "POST",
// //         headers,
// //         body: JSON.stringify({
// //             username: data.username,
// //             email: data.email,
// //             city: data.city,
// //             country: data.country,
// //             phone: data.phone,
// //             contractee: data.contractee,
// //             contractor: data.contractor
// //         })
// //     })
// //         .then(response => {
// //             console.log("res.json", response.json())
// //             response.json();
// //         })

// //         .then(user => {
// //             console.log(user);
// //             if (user.contractor) {
// //                 createContractor(user, data)
// //                 // .then(currentUser => {
// //                 //     onSetCurrentUser("contractor")
// //                 // })
// //             } else {
// //                 createContractee(user, data)
// //                 //         .then(currentUser => {
// //                 //             onSetCurrentUser("contractee")
// //                 //         })
// //             }
// //         })
// // }

// const createContractor = (user, data) => {
//     console.log("creating contractor")
//     fetch(URL + "/contractors", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             Accepts: 'application/json'
//         },
//         body: JSON.stringify({
//             user_id: user.id,
//             projects_completed: 0,
//             password: data.password,
//             services: data.services
//         })
//     })
//         .then(response => response.json())
//         .then(currentUserStatus("contractor"))
// }

// const createContractee = (user, data) => {
//     console.log("creating contractee")
//     fetch(URL + "/contractees", {
//         method: "POST",
//         headers,
//         body: JSON.stringify({
//             user_id: user.id,
//             password: data.password
//         })
//     })
//         .then(response => response.json())
//         .then(currentUserStatus("contractee"))
// }
// export const api = {
//     auth: {
//         login,
//         getCurrentUser
//     },
//     // paintings: {
//     //   getPaintings
//     // }
//     user: {
//         createUser,
//         currentUserStatus
//     }
// };
