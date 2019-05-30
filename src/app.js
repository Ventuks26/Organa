
let firebaseConfig = {
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

//Get actual date
let today= new Date();
       let date = today.getDate() + '-'+ (today.getMonth()+1)+'-' + today.getFullYear();
        let hour = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let getHours = today.getHours();
        let listDelay=[];
//Get data from Laboratoria firebase
        fetch('https://laboratoria-la.firebaseapp.com/cohorts/gdl-2019-01-bc-core-gdl-002/users')
        .then(function(response) {
          return response.json();
        }). then ((myJson)=>{
          attendance(myJson);
          list("delay", " retraso", " ");
          list("onTime", " a tiempo", " ")
          let data= myJson.length;
          list("attendance", " de ", data)

        }).then((myJson)=>{
         
        });

//Start scanQR
let attendanceList = [];
attendance=(myJson)=>{
  let welcomeMessage= document.getElementById("welcome-message");
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        scanner.addListener('scan', function (name) { 
          let student = myJson.find(item => item.name === name);
          console.log(student)
          let studentInList = attendanceList.find(item => item === name);
          if (studentInList!=undefined){
            welcomeMessage.innerHTML= "Ya estas registrada";
          }else {
            attendanceList.push(name)
        welcomeMessage.innerHTML = "Bienvenida " + name + " llegaste a las " + hour;
          if (getHours < 8){
            dataToFireabase("onTime", date, student);
            dataToFireabase("attendance", date, student);
        }else {
          dataToFireabase("delay", date, student);
          dataToFireabase("attendance", date, student);
          
        }
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
//End scanQR

//Upload data to firebase
dataToFireabase=(ref, date,student)=>{
  let list =firebase
  .database()
  .ref(ref);
  list.child(date).child(Date.now()).set(student);
}

let number="";
//Get data from Firebase
list=(object, timer, data)=>{

  let ref = firebase.database().ref(object).child(date);
  ref.on("value", snapshot => {
    listDelay= snapshotToArray(snapshot);
    document.getElementById(object).innerHTML=listDelay.length+ timer +data;
    console.log(listDelay.length + timer + data);
    number=listDelay.length;
  });
}


//Convert firebase object to array
snapshotToArray = (snapshot) => {
  let returnArr = [];
  snapshot.forEach(function(childSnapshot) {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
    var db = firebase.firestore();
 
  
//Get roles
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



