const userData = require('../userData.json')

module.exports = {

    getAllUsers: (req, res) => {

        const age = req.query.age;
        const lastname = req.query.last_name;
        const email = req.query.email;
        const favorites = req.query.favorites;

        /* Respond with the entire users array, with status 200. This endpoint can be called with one of these queries, which you should be prepared to address:
        age: Return all users who have an age less than this age.
        lastname: Return all users whose last name matches.
        email: Return all users whose email matches.
        favorites: Return all users who have this favorite in their array of favorites. */


        if (age) {
            let usersByAge = userData.filter(element => element.age < age)
            res.status(200).send(usersByAge)
        } else if (lastname) {
            let usersLastName = userData.filter(element => {
                return element.last_name === last_name
            })
            res.status(200).send(usersLastName)
        } else if (email) {
            let usersByEmail = userData.filter(element => {
                return element.email === email
            })
            res.status(200).send(usersByEmail)
        } else if (favorites) {
            let usersFavorites = userData.filter(element => {
                return element.favorites.includes(favorites)
            })
            res.status(200).send(usersFavorites)
        } else {
            res.status(200).send(userData)
        }
    },

    getUserById: (req, res, next) => {
        const { id } = req.params;
        console.log(id)

        let userIndex = userData.findIndex(element => element.id === id * 1)
        let userById = userData[userIndex]
        
        // console.log(userIndex)
        // console.log(userById)
        
        if (userById) {
            console.log('in if statement', userById)
            res.status(200).send(userById)
        } else {
            res.status(404).json(null)
        }
    },

    getAdmins: (req, res, next) => {
        let userAdmins = userData.filter(element => element.type === 'admin')
        res.status(200).send(userAdmins)

    },

    getNonAdmins: (req, res, next) => {
        let nonAdminUsers = userData.filter(element => element.type !== 'admin')
        res.status(200).send(nonAdminUsers)
    },

    getUserByType: (req, res, next) => {
        const { type } = req.params;

        let userType = userData.filter(element => element.type === type)
        res.status(200).send(userType)
    },

    updateUserById: (req, res, next) => {
        // destructure id off of req.params //
        const { id } = req.params;
        // find index of id the matches id off of params. multiply by 1 bc it will be returned as a string but compared to an integer so multiplying will make it not a string and === will work//
        let userIndex = userData.findIndex(element => element.id === id * 1)
        //create updated user that is equal to req.body so we can splice the index of the id we are updating//
        let updatedUser = req.body

        // first param is the index at which to start counting. we pass user index bc that will be whatever user is passed in through the url param. so if someone updates user with id 5 user index will find what index that user is at and start there. the second param is how many to remove, so 1 per request, and third param is the elements we want to add to the array so whatever comes in on the body as the new id //
        if (userIndex) {
            userData.splice(userIndex, 1, updatedUser)
            res.status(200).send(userData)
        } else {
            res.status(200).send(userData)
        }
    },

    addUserId: (req, res, next) => {
        
    },

    deleteUserById: (req, res, next) => {
        const { id } = req.params;

        let index = userData.findIndex(element => element.id === id * 1)
        userData.splice(index, 1)
        res.status(200).send(userData)
    }
}