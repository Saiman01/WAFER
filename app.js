
function resetReviewsView(){
    const reviewsList = document.getElementById("reviewsList");
            while(reviewsList.firstChild) reviewsList.removeChild(reviewsList.firstChild);
  
            const firestore = firebase.firestore();
            const reviewCollection = firestore.collection('reviews');
            const addressBar = document.getElementById('p');
            
            const address = addressBar.innerHTML;
            const query = reviewCollection.where('address','==', address );
  
            query.get()
              .then(reviews => {
                reviews.forEach(rev => {
                  data = rev.data();
                  
                  $("#reviewsList").append(
                  `<li class='resCard' id='${data.address} + ${data.dateTime}'>
                    <h2 class="userName">${data.userName}</h2>
                    <h3 class="rating">${data.rating}</h3>
                    <h3 class="comment  ">${data.comment}</h3>
                    <br>
                    <p>${data.dateTime}</p>
                  </li>`
                  );
                })
              })
  
  
  }

  

//Firestore stuff
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAHSmR2X1_mATHfl6KgFtLS-frqIwBC25I",
    authDomain: "wafer-3958c.firebaseapp.com",
    databaseURL: "https://wafer-3958c.firebaseio.com",
    projectId: "wafer-3958c",
    storageBucket: "wafer-3958c.appspot.com",
    messagingSenderId: "85820970688",
    appId: "1:85820970688:web:a2e21280622d92ed58ff25",
    measurementId: "G-RSEZB491MY"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var firestore = firebase.firestore();

//References to html objects
const userNameField = document.querySelector("#username");
const ratingField = document.querySelector("#rate");
const commentsTextBox = document.querySelector("#comment");
const submitButton = document.querySelector("#but");
const addressBar = document.getElementById('p');


function clearReviewFields(){
  userNameField.value = "";
  ratingField.value = "";
  commentsTextBox.value = "";
} 


submitButton.addEventListener("click", function(){
    const userNameToSave = userNameField.value;
    const ratingToSave = ratingField.value;
    const commentToSave = commentsTextBox.value;
    const addressToSave = addressBar.innerHTML;


    if(userNameToSave == "" && ratingToSave == "")
      return;
    
    var currentTime = new Date();
    var date = currentTime.getFullYear() + '-' + (currentTime.getMonth()+1) + '-' + currentTime.getDate();
    var time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    var dateTime = date + ' ' + time;

    const docRef = firestore.doc("reviews/" + addressToSave + ' ' + dateTime);

    docRef.set({
        address: addressToSave,
        dateTime: dateTime,
        userName: userNameToSave,
        rating: ratingToSave,
        comment: commentToSave
    });

    resetReviewsView();
    clearReviewFields();
})
