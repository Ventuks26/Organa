
var firebaseConfig = {
  apiKey: "AIzaSyADMDtczUN4mRNlYsZB68auRUh8eE5gHhU",
  authDomain: "organa-7b8ec.firebaseapp.com",
  databaseURL: "https://organa-7b8ec.firebaseio.com",
  projectId: "organa-7b8ec",
  storageBucket: "organa-7b8ec.appspot.com",
  messagingSenderId: "222593244139",
  appId: "1:222593244139:web:0ba4d84e71b02c50"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//   // Initialize Cloud Firestore through Firebase

let  data =[{name:"María Ventura García Serrano ", attendance:""}, {name:"Martha Nathalie Cortez Chávez", attendance:""},{name:"Juan", attendance:""} ]

const attendance=(myJson)=>{
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
let attendance = [];
let delay=[];
        scanner.addListener('scan', function (content) {
        var today= new Date();
        // var fecha = today.getDate() + '-'+ (today.getMonth()+1)+'-' + today.getFullYear();
        var hour = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var getHours=today.getHours()
        alert("Bienvenida " + content + " llegaste a las " + hour );
          if (getHours<8){
            console.log("a tiempo")
          attendance.push(student.name)
          console.log(attendance)
        }else {
          console.log("tarde")
          delay.push(content)
          writeUserData(delay);
        }
      
      });
     
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    }



    var db = firebase.firestore();

//Upload data to firebase
  writeUserData = (delay) => {
    firebase
      .database()
      .ref("delay")
      .set(delay);
      console.log(delay)
  };


  
  fetch('https://laboratoria-la.firebaseapp.com/cohorts/gdl-2019-01-bc-core-gdl-002/users')
  .then(function(response) {
    return response.json();
  }). then ((myJson)=>{
    console.log("done")
// writeUserData(myJson);
    statistics(myJson);
    attendance(myJson);
   
  })

  const statistics = (myJson) => {
    const objRole = {};
    for(let i = 0; i < myJson.length; i++){
    
        if(objRole.hasOwnProperty(myJson[i].role)){
          objRole[myJson[i].role]+= 1;
        } else {
          objRole[myJson[i].role] = 1;
        }
      }
    
    console.log(JSON.stringify (objRole));
    return objRole;
  };



