const userData = require('../userData.json')

module.exports = {

    getAllUsers: (req, res) => {

        const age = req.query.age;
        const lastname = req.query.lastname;
        const email = req.query.email;
        const favorites = req.query.favorites;

        /* Respond with the entire users array, with status 200. This endpoint can be called with one of these queries, which you should be prepared to address:
        age: Return all users who have an age less than this age.
        lastname: Return all users whose last name matches.
        email: Return all users whose email matches.
        favorites: Return all users who have this favorite in their array of favorites. */

        // ages, names, emails and favsArr are just the elements we are filtering through. regular syntax for filter is element ( or el) => element.something //
        if (age) {
            console.log('age', age)
            let usersByAge = userData.filter( ages => ages.age < age * 1)
            res.status(200).send(usersByAge)
            console.log('user by age', usersByAge)
        } else if (lastname) {
            console.log('last name', lastname)
            let usersLastName = userData.filter( names => {
                return names.last_name === lastname
            })
            res.status(200).send(usersLastName)
            console.log('what im sending', usersLastName)
        } else if (email) {
            let usersByEmail = userData.filter(emails => {
                return emails.email === email
            })
            res.status(200).send(usersByEmail)
        } else if (favorites) {
            let usersFavorites = userData.filter(favsArr => {
                return favsArr.favorites.includes(favorites)
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
        console.log('user type', userType)
        res.status(200).send(userType)

            // if (element.type === 'user'){
            //     return 'user'
            // } else if ( element.type === 'moderator'){
            //     return 'moderator'
            // } else if ( element.type === 'admin'){
            //     return 'admin'
            // } else {

            // res.status(200).send(userType)
          
            // }
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

        const newId = userData[userData.length -1].id + 1
        console.log('newID', newId)
        // body has to be defined. if i do not have this line it will be undefined; it is not = req.body. If I do that I get an error "cannot set property 'id' of undefined" 
        let { body } = req;

        // if I do not have this line the id does not get put onto the body or increment so when user object is returned it is without the new id //
        body.id = newId;

        // this is pushing the body which is the newId into the userData object //
        userData.push(body)
        console.log('body', body)

        res.status(200).send(userData);
    },

    deleteUserById: (req, res, next) => {
        const { id } = req.params;

        let index = userData.findIndex(element => element.id === id * 1)
        userData.splice(index, 1)
        res.status(200).send(userData)
    }
}