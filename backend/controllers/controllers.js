import Data from "../db/DataSchema.js";
import MessageSchema from "../db/MessageSchema.js";
import axios from "axios";

const openAiSecretkey = process.env.API_KEY;


// Chat API
export const completions = async (req, res) => {
  console.log(req.body);
  try {
    const model = req.body.model;
    const messages = req.body.messages;
    const username = req.body.username;
    const user_id = req.body.id;
    const email = req.body.email;
    const currentDate = new Date();
    // console.log(date);
    const formattedDate = currentDate.toLocaleString(); 
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: model,
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${openAiSecretkey}`,
        },
      }
    );
    const chatReply = response.data.choices[0].message.content;
    const result = new MessageSchema({
      query: JSON.stringify(messages),
      response: chatReply,
      username: username,
      email: email,
      user_id:user_id,
      date:  formattedDate,
    });
    const requestResp = await result.save();
    res.json({ reply: chatReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error " });
  }
  // res.json("Hi");
}

// Get Api EndPoint by username
// export const completionsUsername = async (req , res) =>{
// const { username } = req.params;
// // console.log(username);
// try {
//   const message = await MessageSchema.find({ username: username });
//   res.json(message);
// } catch (error) {
//   res.status(500).json({ error: "Internal Server Error" });
// }
// }

// Get Data api end point by all users
// export const users = async (req, res) =>{
// try {
//   const data = await Data.find({},{ date: 1, username: 1, email: 1, sessionId: 1 });
//   res.status(200).json(data);
// } catch (error) {
//   console.log("Error fetching Data", error);
//   res.status(500).json({ error: "Failed to fetch data" });
// }
// }

// Get Api EndPoint by user ID
export const completionsUserId = async (req, res) => {
  const { user_id } = req.params;
  console.log(user_id);

  try {
    const messages = await MessageSchema.find({ user_id: user_id });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Example backend code
export const users = async (req, res) => {
  try {
    const data = await Data.find({}, { date: 1, username: 1, email: 1, messages: 1 });
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching Data", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// API endpoint to save data by login users
export const saveUserData = async (req, res)=>{
try {
  const { username, email } = req.body;
  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString(); 
    const newData = new Data({
      username,
      email,
      date: formattedDateTime,
    });
    const response = await newData.save();
    // console.log(respons);
    const responsJSON = JSON.stringify(response);
    console.log(responsJSON);
    // const user = JSON.parse(JSON.stringify(respons.username));
    // const userEmail = JSON.parse(JSON.stringify(respons.email));
    // const savedDate = JSON.parse(JSON.stringify(respons.date));
    // // const user_id = JSON.parse(JSON.stringify(respons.user_id)) 

    res.send({
      message: "Data saved successfully",
     response:responsJSON
    });
} catch (error) {
  console.log("Error adding Data", error);
  res.status(500).json({ error: "Failed to save data" });
}
}

// Search Api by Query
export const searchQuery = async (req, res) =>{
const { query } = req.query;
try {
  const searchData = await Data.aggregate([
    {
      $match: {
        username: { $regex: new RegExp(`^${query}`, "i") },
      },
    },
    {
      $project: {
        username: 1,
        email:1,
        date:1,
      },
    },
  ]);

  const formattedData = searchData.map((item) => ({
    username: item.username,
    email: item.email,
    message: item.message,
    date: item.date ? new Date(item.date).toLocaleDateString() : null,
  }));

  res.status(200).json(formattedData);
} catch (error) {
  console.log("Error searching data", error);
  res.status(500).json({ error: "Failed to perform search" });
}
}


