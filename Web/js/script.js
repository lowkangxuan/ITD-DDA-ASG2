// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
import { getAuth, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getDatabase, ref, child, push, get, set, onValue, orderByChild, orderByKey, query } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const db = getDatabase();
const playerRef = ref(db, "players");

//Working with Auth
const auth = getAuth();

var playerData = {
    email: "",
    username: "",
    leaderboardPosition: "",
    totalGame: 0,
    totalScore: 0,
    highestScore: 0,
    averageAccuracy: 100
}

onValue(playerRef, (snapshot) => {
    updateLeaderboard();
});

const que = query(playerRef, orderByChild("highestScore"));

get(que).then((snapshot) => {
    // console.log(snapshot.val());

    snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
    });
});

//retrieve element from form
var formCreateUser = document.getElementById("frmCreateUser");
//we create a button listener to listen when someone clicks
//var readBtn = document.getElementById("submit").addEventListener("click", getPlayerData); incase
formCreateUser.addEventListener("submit", function(e){
    e.preventDefault();
    var email = document.getElementById("email").value;
    var username = $("#username").val();
    var password = document.getElementById("password").value;
    console.log("email" + email + "password" + password);
    createUser(email, username, password);
});

// // Read player data
// document.getElementById("formReadUser").addEventListener("click", function(e) {
//     e.preventDefault();
//     getPlayerData();
// });

function updateLeaderboard(){
    //const playerRef = ref(db, "players");
    //PlayerRef is declared at the top using a constant
    //get(child(db,`players/`))
    get(playerRef).then((snapshot) => {//retrieve a snapshot of the data using a callback\
        console.log(snapshot);
        if (snapshot.exists()) {//if the data exist
            console.log("yes");
            try {
                $("#leaderboard").empty(); // Clear leaderboard content first
                $("#leaderboard").append(`<tr>
                    <th>Rank</th>
                    <th>Points</th>
                    <th>Username</th>
                </tr>`); // Adds header to leaderboard

                snapshot.forEach((childSnapshot) => {//looping through each snapshot
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

                    console.log("GetPlayerData: childkey " + childSnapshot.key);

                    $("#leaderboard").append(`<tr>
                        <td>${childSnapshot.child("username").val()}</td>
                        <td>${childSnapshot.child("highestScore").val()}</td>
                        <td>${childSnapshot.child("username").val()}</td>
                    </tr>`);
                });
            } catch(error) {
                console.log("Error getPlayerData" + error);
            }
        }
    });
}//end getPlayerData

//create a new user based on email n password into Auth service
//user will get signed in
//userCredential is an object that gets
function createUser(email, username, password) {
    console.log("creating the user");
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        createUserDatabase(email, username);

        //signedin
        const user = userCredential.user;
        console.log("created user ... " + userCredential);
        console.log("User is now signed in ");
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
}

function createUserDatabase(email, username) {
    const key = push(playerRef);
    // const key = db.child("players").push().key;
    playerData.email = email;
    playerData.username = username;

    set(key, playerData);
}