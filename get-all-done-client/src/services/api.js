const API_ROOT = `http://localhost:3000/api/v1`;
const token = localStorage.getItem('token');
const URL = "http://localhost:3000"

const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    Authorization: token
};


const login = data => {
    return fetch(`${API_ROOT}/auth`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }).then(resp => resp.json());
};

const getCurrentUser = () => {
    console.log("getting current user", headers)
    return fetch(`${API_ROOT}/current_user`, {
        headers
    }).then(res => {
        console.log(res)
        return res.json()
    });
};

const currentUserStatus = (userStatus) => {
    return userStatus
}


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


const createUser = (data) => {
    return fetch(URL + "/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            city: data.city,
            country: data.country,
            phone: data.phone,
            contractee: data.contractee,
            contractor: data.contractor
        })
    })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if (user.contractor) {
                currentUserStatus("contractor")
                return createContractor(user, data)
            } else {
                currentUserStatus("contractee")
                return createContractee(user, data)
            }
        })
}

const createContractor = (user, data) => {
    console.log("creating contractor")
    return fetch(URL + "/contractors", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify({
            user_id: user.id,
            projects_completed: 0,
            password: data.password,
            services: data.services
        })
    }).then(handleErrors)
        .then(response => response.json())
    // .then(currentUserStatus("contractor"))
}

const createContractee = (user, data) => {
    console.log("creating contractee")
    return fetch(URL + "/contractees", {
        method: "POST",
        headers,
        body: JSON.stringify({
            user_id: user.id,
            password: data.password
        })
    }).then(handleErrors)
        .then(response => response.json())
    // .then(currentUserStatus("contractee"))
}
export const api = {
    auth: {
        login,
        getCurrentUser
    },
    // paintings: {
    //   getPaintings
    // }
    user: {
        createUser,
        currentUserStatus
    }
};

















// fetch(URL + "/users", {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json',
//         Accepts: 'application/json'
//     },
//     body: JSON.stringify({
//         username: username,
//         email: email,
//         city: city,
//         country: country,
//         phone: phone,
//         contractee: contractee,
//         contractor: contractor
//     })
// }).then(handleErrors)
//     .then(response => response.json())
//     .then(user => {
//         console.log(user);
//         if (contractor) {
//             // createContractor(user, data)
//             console.log("creating contractor")
//             fetch(URL + "/contractors", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accepts: 'application/json'
//                 },
//                 body: JSON.stringify({
//                     user_id: user.id,
//                     projects_completed: 0,
//                     password: password,
//                     services: services
//                 })
//             })
//                 .then(handleErrors)
//                 .then(response => response.json())
//                 .then(json => {
//                     console.log(json)
//                     this.currentUserStatus("contractor")
//                 })
//             // .then(currentUser => {
//             //     onSetCurrentUser("contractor")
//             // })

//         } else {
//             // createContractee(user, data)
//             console.log("creating contractee")
//             fetch(URL + "/contractees", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accepts: 'application/json'
//                 },
//                 body: JSON.stringify({
//                     user_id: user.id,
//                     password: password
//                 })
//             }).then(handleErrors)
//                 .then(response => response.json())
//                 .then(json => {
//                     console.log(json)
//                     this.currentUserStatus("contractee")
//                 })
//             //         .then(currentUser => {
//             //             onSetCurrentUser("contractee")
//             //         }
//         }
//     })