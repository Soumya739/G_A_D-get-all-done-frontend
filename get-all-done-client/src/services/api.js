const API_ROOT = `http://localhost:3000/api/v1`;
const token = localStorage.getItem('token');
const URL = "http://localhost:3000"
let User_type = ""
const PostsURL = "http://localhost:3000/posts"
const User_Posts = "http://localhost:3000/user_posts"
const ListContractorsURL = "http://localhost:3000/list_contractors"
// const headers = {
//     'Content-Type': 'application/json',
//     Accepts: 'application/json',
//     Authorization: localStorage.getItem('token')
// };

const setCurrentUserType = (type) => {
    User_type = type
}
const login = data => {
    return fetch(`${API_ROOT}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json());
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
    })
        .then(handleErrors)
        .then(res => {
            console.log(res)
            return res.json()
        });
};

const getcurrentUserType = () => {
    return User_type
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
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            user: {
                username: data.username,
                email: data.email,
                city: data.city,
                country: data.country,
                phone: data.phone,
                contractee: data.contractee,
                contractor: data.contractor,
                password: data.password
            }
        })
    })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if (user.contractor) {
                User_type = "contractor"
                return createContractor(user, data)
            } else {
                User_type = "contractee"
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
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            user_id: user.id,
            projects_completed: 0,
            services: data.services
        })
    }).then(handleErrors)
        .then(response => response.json())
}

const createContractee = (user, data) => {
    console.log("creating contractee")
    return fetch(URL + "/contractees", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            user_id: user.id
        })
    }).then(handleErrors)
        .then(response => response.json())
}

const createPost = (data) => {
    return fetch(PostsURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            category: data.category
        })
    }).then(handleErrors)
        .then(resp => resp.json())
}

const fetchPosts = () => {
    let url = (User_type === "contractee") ? User_Posts : PostsURL
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
    })
        .then(handleErrors)
        .then(resp => resp.json())
}

const updatePosts = (postId, data) => {
    return fetch(PostsURL + '/' + postId, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            category: data.category
        })
    }).then(handleErrors)
        .then(resp => resp.json())
}

const getContractors = (category) => {
    return fetch(ListContractorsURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            category: category
        })
    })
        .then(handleErrors)
        .then(resp => resp.json())
}

const assignPostToContractor = (postId, contractorEmail) => {
    return fetch(PostsURL + '/' + postId, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            contractorEmail: contractorEmail,
            postId: postId
        })
    }).then(handleErrors)
        .then(resp => resp.json())
}

export const api = {
    auth: {
        login,
        getCurrentUser
    },
    user: {
        createUser,
        getcurrentUserType,
        setCurrentUserType
    },
    posts: {
        fetchPosts,
        createPost,
        updatePosts,
        assignPostToContractor
    },
    contractors: {
        getContractors
    }
};
