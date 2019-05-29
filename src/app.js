
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
        let student = myJson.find(item => item.name === content);
        if (student.attendance===true){
          console.log("Ya estas registrada")
        }else {
          if (getHours<8){
            console.log("a tiempo")
          attendance.push(content)
          console.log(attendance)
        }else {
          console.log("tarde")
          delay.push(content)
          writeUserData(delay);
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



// //Itera la data y crea un código qr por cada objeto
// data.map((item)=>{
//     (function() {
//     //llama a la libreria Qrios
//         var qr = new QRious({
//         //Value es el valor que va a tomar para convertir a código QR
//           value: item.name
//         });
//         //qr.toDaraURL convierte la imagen del código qr a base 64 y se agrega a la propiedad qr del objeto(item.qr)
//         item.qr=qr.toDataURL();
//         //Convierte el código qr de base 64 a imagen, crea un espacio dentro de body y lo imprime ahí 
//         var image = new Image(); image.src = item.qr; document.body.appendChild(image); 
//         var email= item.email;
//         var code= item.qr;
//         enviarMail(email,code);
//     })();

// })

// function enviarMail(email,code) {
//     $.ajax({
//         URL: "./email.php",
//          type: email,
//         data:{titulo:"Codigo QR de Laboratoria",asunto:"Bienvenida a laboratoria",mensaje:"usa este código qr para registrar tu asistencia"},
//         success:function(mensaje) {
//             alert(mensaje);
//         }
//     })
// }

$(document).ready(function() {
    //Desaparece un div
    setTimeout(function() {
        $(".content").fadeOut(1500);
    },3000);
 //Aparece un div
    setTimeout(function() {
        $(".content2").fadeIn(1500);
    },6000);
});
//Aparece una alerta
// setTimeout(function(){ alert("Hello"); }, 3000);

      
    


// fetch('https://laboratoria-la.firebaseapp.com/cohorts/gdl-2019-01-bc-core-gdl-002/users')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     myJson.map((item)=>{
//         (function() {
//             //llama a la libreria Qrios
//             var qr = new QRious({
//             //Value es el valor que va a tomar para convertir a código QR
//               value: item.name
//             });
//             //qr.toDaraURL convierte la imagen del código qr a base 64 y se agrega a la propiedad qr del objeto(item.qr)
//             item.qr=qr.toDataURL();
//             //Convierte el código qr de base 64 a imagen, crea un espacio dentro de body y lo imprime ahí 
           
//             var image = new Image();
//             image.src = item.qr; 
//             let section= document.querySelector(".codesQr");
//             var name = document.createTextNode(item.name);
//             section.appendChild(name);
//             var para = document.createElement("p");
//             para.appendChild(image)
//             section.appendChild(para);
           
//           })();
//     })

//   }). then ((myJson)=>{
//     console.log(myJson)
//     statistics(myJson);
   
//   })