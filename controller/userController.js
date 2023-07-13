// import the model in controller
const User = require('../model/userModel')


const userController = {
    index: (req,res) => {
        res.render('index.ejs') // it is used to render(display) the view and help us to receive the request + data and sending response  to the view.
    },
    new: (req,res) => {
        res.render('create.ejs')
    },
    edit: (req,res) => {
        res.render('edit.ejs')
    },
    // we create a new controller to handler incoming data from front end
    newUser: async (req,res) => {
        try {
              const newUser = req.body  // receive data from frontend 
              
              // email exists or not
              const extEmail = await User.findOne({ email: newUser.email})
                if(extEmail)
                    return res.status(401).json({ msg: `${newUser.email} already exists.`})

             // mobile exists or not
             const extMobile = await User.findOne({ mobile: newUser.mobile })
                if(extMobile)
                    return res.status(401).json({ msg: `${newUser.mobile} already exists.`})

            await User.create(newUser)  // to create new user data

              return res.status(200).json({ msg: "new User created successfully", newUser })
        }catch(err) {
            console.log(err)  // exception handling
        }
    },
    readUser: async (req,res) => {
        try {
              // 200 -> status ok
              // 400 -> bad request
              // 401 -> unauthorized
              // 404 -> page not found
              // 505 -> server not found
              
            let users = await User.find()
                res.status(200).json({ length: users.length, users })
        } catch(err){
            // 500 - > internal server error
            return res.status(500).json({ msg: err.message })
        }
    },
    pnf: (req,res) => {
        res.render('pnf.ejs')   // pnf is default controller so it must be at the end
    }
}

module.exports = userController




