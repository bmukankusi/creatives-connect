// const { User } = require("../models/userModel");
// const bcrypt= require("bcrypt")
// const jwt= require("jsonwebtoken")

// const userHome=(req,res)=>{
//     return  res.status(200).json({message: "Welcomme To use Home"})
// }
// const registerUser= async (req, res) => {
//     const { name, email, password, confirmPassword, category } = req.body;
//     try {
//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists', success: false });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword, category });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully', success: true});
//     } catch (err) {
//         res.status(500).json({ message: err.message, success: false });
//     }
// }

// const loginUser= async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         return res.status(200).json({message: "User Signed in", success: true, token});
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// const userProfile= async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId).select('-password');
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }


// const updateProfile = async (req, res) => {
//     const data = req.body;
//     console.log(data)
//     try {
//         const user = await User.findById(req.user.userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user.bio = data.bio || user.bio;
//         console.log(user.contactInfo.phone)
//         user.contactInfo=
//          {
//             phone: data.phone,
//             socialMedia: {
//                 instagram: data.instagra,
//                 twitter:data.twitter,
//                 facebook:data.facebook
//             }
           
//         };
//         user.location = data.location
//         await user.save();
//         return res.status(200).json({ message: "Profile updated successfully" });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Server error", error });
//     }
// };



// module.exports={userHome, registerUser, loginUser,userProfile, updateProfile}

const { User,Work } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/profile-pictures'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, `${req.user.userId}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

const workImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/workImages');     
    },
    filename: function (req, file, cb) {
        cb(null, `${req.user.userId}${path.extname(file.originalname)}`);
    }
});

const uploadWork = multer({ storage: workImageStorage });

const userHome = (req, res) => {
    return res.status(200).json({ message: "Welcome To User Home" });
}

const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword, category } = req.body;
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, category });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "User Signed in", success: true, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        console.log(user)
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateProfile = async (req, res) => {
    const data = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.bio = data?.bio || user.bio;
        user.company = data?.company
        user.contactInfo = {
            phone: data?.phone,
            socialMedia: {
                
                instagram: data?.instagram,
                whatsapp: data?.whatsapp,
                linkedin: data?.linkedin
            }
        };
        user.location = data?.location || user.location;
        await user.save();
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

const uploadProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        console.log(req.file)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePicture = `/profile-pictures/${req.file.filename}`;
        await user.save();

        res.json({ profilePictureUrl: user.profilePicture });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading profile picture' });
    }
}

const createWork = async (req, res) => {
    try {
         console.log(req.body)
         console.log(req.file.filename)
        const { title, description, tags } = req.body;

         
        const creator = req.user.userId;

        const newWork = new Work({
            title,
            description,
            tags: JSON.parse(tags),
            workImageLink: req.file.filename ? `/workImages/${req?.file?.filename}` : null,
            creator
        });

        const savedWork = await newWork.save();

        res.status(201).json({
            success: true,
            message: 'Work created successfully',
            data: savedWork
        });
    } catch (error) {
  
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the work',
            error: error.message
        });
    }
};

const getUserWorks = async (req, res) => {
    try {
       
        const creator = req.user.userId;

       
        const works = await Work.find({ creator });
       console.log(works)
       
        res.status(200).json({
            success: true,
            data: works,
            message: "fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the works',
            error: error.message
        });
    }
};


module.exports = {
    userHome,
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
    uploadProfilePicture,
    upload,
    uploadWork,
    createWork,
    getUserWorks
};
