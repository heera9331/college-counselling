import mongoose from "mongoose";

const connection = {};
const MONGO = process.env.MONGO;

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    console.log(MONGO);
    const db = await mongoose.connect(MONGO);
    // const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};

// connectDB("mongodb://127.0.0.1:27017/COLLEGE_COUNSELLING");

export default connectDB;

/**
 * 
 * 
  const newChatEntry = {
    msg: "New chat message",
    teacher: "6534d54e369e858eba5d2243",
    timestamp: new Date(),
  };

  let tmp = Student.updateOne(
    { _id: "6536bf8fa0f1c92d8bbe4cdc" },
    { $push: { chats: newChatEntry } }
  );

  tmp
    .then((success) => {
      console.log(success);
    })
    .catch((err) => {
      console.log("err");
    });
 */

// const sampleStudents = [
//   {
//     _id: "6533bc4811774d1a50ae0df5",
//     id: 1,
//     name: "John Doe",
//     address: "123 Main Street",
//     email: "john@example.com",
//     city: "Sagar",
//     village: "Downtown",
//     mobile: "555-123-4567",
//   },
//   {
//     _id: "6533bc4811774d1a50ae0df6",
//     id: 2,
//     name: "Jane Smith",
//     address: "456 Elm Street",
//     email: "jane@example.com",
//     city: "Damoh",
//     village: "Hollywood",
//     mobile: "555-987-6543",
//   },
//   {
//     _id: "6533bc4811774d1a50ae0df7",
//     id: 3,
//     name: "Bob Johnson",
//     address: "789 Oak Street",
//     email: "bob@example.com",
//     city: "Chattarpur",
//     village: "Downtown",
//     mobile: "555-789-0123",
//   },
//   {
//     _id: "6533bc4811774d1a50ae0df8",
//     id: 4,
//     name: "Alice Johnson",
//     address: "987 Maple Street",
//     email: "alice@example.com",
//     city: "Panna",
//     village: "Bay Area",
//     mobile: "555-555-5555",
//   },
//   {
//     _id: "6533bc4811774d1a50ae0df9",
//     id: 5,
//     name: "Michael Davis",
//     address: "567 Pine Street",
//     email: "michael@example.com",
//     city: "Tikamgarh",
//     village: "Downtown",
//     mobile: "555-444-3333",
//   },
//   {
//     _id: "6533bc4811774d1a50ae0dfa",
//     id: 6,
//     name: "Emily Wilson",
//     address: "321 Cedar Street",
//     email: "emily@example.com",
//     city: "Lalitpur",
//     village: "Back Bay",
//     mobile: "555-222-1111",
//   },
//   {
//     _id: "6533bc4811774d1a50ae0dfb",
//     id: 7,
//     name: "David Lee",
//     address: "456 Birch Street",
//     email: "david@example.com",
//     city: "Damoh",
//     village: "Midtown",
//     mobile: "555-777-8888",
//   },
//   {
//     id: 8,
//     name: "Sophia Martinez",
//     address: "789 Oak Street",
//     email: "sophia@example.com",
//     city: "Panna",
//     village: "South Beach",
//     mobile: "555-123-9876",
//   },
//   {
//     id: 9,
//     name: "William Turner",
//     address: "234 Redwood Street",
//     email: "william@example.com",
//     city: "Tikamgarh",
//     village: "Gaslamp Quarter",
//     mobile: "555-789-6543",
//   },
//   {
//     id: 10,
//     name: "Olivia Brown",
//     address: "567 Pine Street",
//     email: "olivia@example.com",
//     city: "Damoh",
//     village: "Downtown",
//     mobile: "555-888-9999",
//   },
//   {
//     id: 11,
//     name: "James Anderson",
//     address: "123 Birch Street",
//     email: "james@example.com",
//     city: "Sagar",
//     village: "Scottsdale",
//     mobile: "555-222-3333",
//   },
//   {
//     id: 12,
//     name: "Sophia Davis",
//     address: "345 Cedar Street",
//     email: "sophiad@example.com",
//     city: "Tikamgarh",
//     village: "Buckhead",
//     mobile: "555-111-2222",
//   },
//   {
//     id: 13,
//     name: "Ethan Miller",
//     address: "789 Maple Street",
//     email: "ethan@example.com",
//     city: "Sagar",
//     village: "Downtown",
//     mobile: "555-777-4444",
//   },
//   {
//     id: 14,
//     name: "Emma Johnson",
//     address: "567 Elm Street",
//     email: "emma@example.com",
//     city: "Panna",
//     village: "Center City",
//     mobile: "555-333-5555",
//   },
//   {
//     id: 15,
//     name: "Noah Wilson",
//     address: "123 Oak Street",
//     email: "noah@example.com",
//     city: "Chattarpur",
//     village: "Downtown",
//     mobile: "555-888-4444",
//   },
// ];

// Student.insertMany();
