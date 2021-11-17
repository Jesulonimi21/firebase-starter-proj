// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs,addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADnk5t7gdP-5WgEkGZkHvvJEgnnXw1tXg",
  authDomain: "ecommerce-1bfa7.firebaseapp.com",
  databaseURL: "https://ecommerce-1bfa7.firebaseio.com",
  projectId: "ecommerce-1bfa7",
  storageBucket: "ecommerce-1bfa7.appspot.com",
  messagingSenderId: "363032235647",
  appId: "1:363032235647:web:46087ca10c20857b7c794a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function getAdmins(db) {
    const AdminsCol = collection(db, 'admins');
    console.log(AdminsCol,"Adminscol")
    const adminSnapshot = await getDocs(AdminsCol);
    console.log(adminSnapshot,"ADMINSNAPSHOT")
    const adminList = adminSnapshot.docs.map(doc => doc.data());
    console.log(adminList);
   
    return adminList;
  }

    getAdmins(db);

  document.getElementById("send-data-btn").addEventListener('click', async function(){
      try{
            addUser(db);
            console.log("Clicked");
      
      }catch(errror){
            console.error(error);
      }
  })

  async function addUser(db){
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        document.location.href = "./send-data-btn.html"
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }


//   addUser(db);