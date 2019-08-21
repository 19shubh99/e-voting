var firebaseConfig = {
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var myMap = new Map();
  var key=new Map();
  var myMap2=new Map();

  myMap.set("BJP","1");
  myMap.set("CNG","2");
  myMap.set("AAP","3");
  myMap.set("BSP","4");
  myMap.set("ADMK","5");
  myMap2.set("BJP","@aF");
  myMap2.set("CNG","C%k");
  myMap2.set("AAP","e!x");
  myMap2.set("BSP","$Lr");
  myMap2.set("ADMK","sI*");
  key.set("1",347);
  key.set("2",989);
  key.set("3",763);
  key.set("4",513);
  key.set("5",413);

firebase.auth().onAuthStateChanged(user=>{ 

  document.getElementById("allowedtovote").classList.add('hide');
  document.getElementById("Adh").classList.add('hide');
  
  if(user){
    checkwithLogin();
    document.getElementById("signedin").classList.remove('hide');
    document.getElementById("login-box").classList.add('hide');
    document.getElementById("register-box").classList.add('hide');
    
    //document.getElementById("key").classList.add('hide');
  } else{
    
    document.getElementById("signedin").classList.add('hide');
    document.getElementById("login-box").classList.remove('hide');

  }
})

var Email_Id;
var Password;
document.getElementById("btnSignUp").addEventListener('click', e=>{
  //const database = firebase.database()
  // document.getElementById("Adhaar").classList.add('hide');
  // document.getElementById("add_data").classList.add('hide');
  // document.getElementById("check").classList.add('hide');
  
  const email = document.getElementById("RtxtEmail").value;
  const pass = document.getElementById("RtxtPassword").value;
  document.getElementById("RtxtEmail").innerHTML="";
  document.getElementById("RtxtPassword").innerHTML="";
  Email_Id=email;
  Password=pass;
  firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user){
     getthroughsignin();
  }).catch(function(error) {
   console.log(error.message);
  });
  
  
   
})
function getthroughsignin()
{
  // document.getElementById("Adhaar").classList.remove('hide');
  // document.getElementById("add_data").classList.remove('hide');
  
}
function getthroughlogin()
{
  // document.getElementById("check").classList.remove('hide');
  //checkwithLogin();
}
function signUp(){
  document.getElementById("register-box").classList.remove('hide');
  document.getElementById("login-box").classList.add('hide');
}

function LogIn()
{
  document.getElementById("register-box").classList.add('hide');
  document.getElementById("login-box").classList.remove('hide');
}

function save()
{ 
  
  var userId=firebase.auth().currentUser.uid;
  const Adhaar_no = document.getElementById("Adhaar").value;
  document.getElementById("Adhaar").innerHTML="";
  var value=0,v=0;
  firebase.database().ref('users/'+userId).set({
    Email : Email_Id,
    Pass : Password,
    Adhaar:Adhaar_no,
    Auth: value,
    CanVote : v
  });
  // document.getElementById("check").classList.remove('hide');
  // document.getElementById("Adhaar").classList.add('hide');
  // document.getElementById("add_data").classList.add('hide');
  // document.getElementById("allowedtovote").classList.add('hide');
  //    document.getElementById("Adh").classList.add('hide');
  checkwithLogin();
}
function voting()
{
  window.location("https://cfdevoting-x4vufr.azurewebsites.net/applications/7/workflows/7");
}
function checkwithLogin()
{

   var userId=firebase.auth().currentUser.uid;
   return firebase.database().ref('/users/'+userId).once('value').then(function(snapshot){
   var Auth=(snapshot.val()&&snapshot.val().Auth);
   var CanVote=(snapshot.val()&&snapshot.val().CanVote);
   
   if(Auth==0)
   { 
    document.getElementById("description").innerHTML="Status : : Aplication under process";
     document.getElementById("allowedtovote").classList.add('hide');
     document.getElementById("Adh").classList.add('hide');
   }
   else if(Auth==-1)
   {
    document.getElementById("description").innerHTML="Status : : Rejected";
     document.getElementById("allowedtovote").classList.add('hide');
     document.getElementById("Adh").classList.add('hide');
   }
   else if(Auth==2)
   {  
      document.getElementById("description").innerHTML="Status : : Eligible to Vote";
      document.getElementById("allowedtovote").classList.remove('hide');
      document.getElementById("Adh").classList.add('hide');
      if(CanVote==1)
    {
      document.getElementById("vote").classList.remove('hide');
    }
    else
    {
      document.getElementById("vote").classList.add('hide');
    }
  //  document.getElementById("check").classList.add('hide');
   }
   else
   {
    document.getElementById("description").innerHTML="Status : : Complete your application";
    document.getElementById("Adh").classList.remove('hide');
    document.getElementById("allowedtovote").classList.add('hide');
   }

   
   });
  
   
  
}
document.getElementById("btnLogin").addEventListener('click', e=>{
  
  // document.getElementById("Adhaar").classList.add('hide');
  // document.getElementById("add_data").classList.add('hide');
  // document.getElementById("check").classList.add('hide');
  
  const email = document.getElementById("txtEmail").value;
  const pass = document.getElementById("txtPassword").value;
  document.getElementById("txtEmail").innerHTML="";
  document.getElementById("txtPassword").innerHTML="";
  // const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  // promise.catch(e=>{ console.log(e.massage)})
  firebase.auth().signInWithEmailAndPassword(email, pass).then(function(user){
    getthroughlogin();
 }).catch(function(error) {
  console.log(error.message);
 });
  
})

document.getElementById("btnLogOut").addEventListener('click', e=>{
  firebase.auth().signOut();
  console.log('logged out')
})

//var ballot;
function myballot()
{  
  
  
  var choice1=document.getElementById("select1").value;
  var choice2=document.getElementById("select2").value;
  var choice3=document.getElementById("select3").value;
     if(choice1=="select"||choice3=="select"||choice2=="select")
     window.alert("Please select your choices");
     else if(choice1==choice2)
       window.alert("please select different choices");
       else if(choice1==choice3)
       window.alert("please select different choices");
       else if(choice3==choice2)
       window.alert("please select different choices");
       else
       {
            var  ballot=key.get(myMap.get(choice1))*key.get(myMap.get(choice2))+key.get(myMap.get(choice3));
           //
          var str=myMap2.get(choice1)+myMap2.get(choice2);
           var str1=myMap2.get(choice3);
             new QRCode(document.getElementById('qrcode'),str+ballot.toString(10)+str1);
       }
      
}
function guide()
{
  window.location("http://127.0.0.1:5500/index.html");
}
// var qrcode = new QRCode("qrcode");

// function makeCode () {      
//     var elText = document.getElementById("text");
    
//     if (!elText.value) {
//         alert("Input a text");
//         elText.focus();
//         return;
//     }
    
//     qrcode.makeCode(elText.value);
// }

// makeCode();

// $("#text").
//     on("blur", function () {
//         makeCode();
//     }).
//     on("keydown", function (e) {
//         if (e.keyCode == 13) {
//             makeCode();
//         }
//     });
// Resources 