// CREATE SERVER
const express = require("express"); 
const app = express();
const _PORT = process.env.PORT;
/* ===NOT IMPORTENT BUT USE IT WHEN YOU FIND ERROR IN SERVER=== */
const cors = require("cors");
app.use(cors());
app.use(express.json());

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// CONNECT TO DB
const userName = process.env.USERNAME,
  password = process.env.PASSWORD, 
  database = process.env.DATABASE;

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${userName}:${password}@cluster0.spnnbqz.mongodb.net/${database}?retryWrites=true&w=majority`
);

/* Models */
// IMPORT USER MODEL (DATA)
const UserModel = require("./models/Users");

// GET REQUEST
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// CREATE USER
app.post("/createUser", async (req, res) => {
  user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});


// ADMIN MODEL
const AdminModel = require("./models/Admins");
app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  const admin = await AdminModel.findOne({ userName });

  if(admin){
    return res.json({ message: "Admin already exist", color: "danger"});
  }


  const hashedpassword = bcrypt.hashSync(password, 10)


  const newAdmin = new AdminModel({
    userName: userName,
    password: hashedpassword,
  });

  try {
    await newAdmin.save();
    return res.json({ message: "Admin created successfully", color: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", color: "light" });
  }
});

// LOGIN
app.post("/login",async(req, res) => {
  const {userName, password} = req.body

  const admin = await AdminModel.findOne({userName})
  if(!admin){
    return res.json({message :"Admin does't exist!", color: "danger"})
  }
  
  const isPasswordCorrect = await bcrypt.compare(password, admin.password )
  if(!isPasswordCorrect){
    return res.json({message: "Username or Passwor is not Correct", color: "danger"})
  }

  const token = jwt.sign({id: admin._id}, process.env.SECRET)
  return res.json({token, adminID: admin._id,message: "Login with successfully", color: "success"})

})

app.listen(_PORT, () => {
  console.log("server work :)");
});
