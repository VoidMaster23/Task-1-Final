var myColor;
var colorName;
var colorString;

//startPos
var startPos = 0;


// these variables work together 
var numItems = 0;
var numDisplayed = 0;

//need an array for colorstuff
var colArray = [];

totalPrice = 0;

function ColorObject(price, colName, dispName){
    this.price = price; 
    //this.quantity = quantity;
    this.colName = colName;
    this.dispName = dispName;
    this.quantity = 0;
    this.styleClass = "myBut";

    this.getTotalPrice = function(){
        return this.price*this.quantity;
    };

}

//checks to see if the array is empty
function isEmpty(){
    if(colArray === undefined || colArray.length == 0){
        return true;
    }

    return false;
}

//adds to the array if the item has not beeen clicked but removes if it has already been clicked
function addToArray(ColorObject){
    var found = false;
    for(i = 0; i < colArray.length; i++){
      
        if(ColorObject.colName == colArray[i].colName){
            colArray.splice(i, 1);
            found = true;
        }
    }
    if(!found){
        colArray.push(ColorObject);
        
    }
}

// dictionary for the prices
var colorDict = {
    "black": 7.5,
    "white": 14.99,
    "gray": 8.95,
    "red": 5.74,
    "maroon": 8.69,
    "orangered": 9.45,
    "orange":3.42,
    "yellow": 7.14,
    "greenyellow": 6.66,
    "green": 4.20,
    "skyblue": 0.69,
    "blue":10.00,
    "royalblue": 18.99,
    "purple":6.42,
    "pink": 1.26,
    "violet": 11.26,
    "salmon": 20.45,
    "brown": 6.83
}


// reload the page please
function rel(button){
    document.location.reload(true);
}

function checkAlert(){
    alert("Order Placed!");
}


//color picker
function showColor(button){
    myColor = button.id.replace("-"," ");
     colorName = document.getElementById("colour");
    document.getElementById("add").disabled=false;

    tempCol =myColor.toLowerCase().replace(" ","");

    var myObj = new ColorObject(colorDict[tempCol],tempCol, myColor);

    //add to the color array if empty
    if(isEmpty()){
        colArray.push(myObj)
    }else{
       addToArray(myObj);
       console.log(colArray);
    }

    //create the output
    var outStr = "";
    for(var i = 0; i< colArray.length; i++){
        outStr += colArray[i].dispName +", ";
    }


    //set the output
    colorName.innerHTML = outStr;
}

//when this button is in add mode it will just display the color in modal
//and make sure the modal displays the correct number
//when in checkout mode it calls the checkout function
function addCart(button){
 if(button.innerHTML === "Add to Cart"){
    $("#cartModal").modal('toggle');

    if(colArray[startPos].dispName === undefined){
        document.getElementById("lblModalColor").innerHTML = " ";
    }else{
        document.getElementById("lblModalColor").innerHTML = colArray[startPos].dispName;
    }

   
    }
}


//disable the button on run, and set the iten counters to 0 
window.onload=function() {
    document.getElementById("add").disabled=true;
    document.getElementById("numItems").innerHTML = this.numItems;
    document.getElementById("modalQuant").innerHTML = this.numItems;
 

    //disable the agree button on the modal to prevent checkinh out nothing
    document.getElementById("mod1Agree").disabled=true;

  }


  //change the item number when the modal is clickec
 function changeVal(button){
    
    numDisplayed = colArray[startPos].quantity;
    //numDisplayed is like a temp variable 
    



    if((button.id === "btnMinus") && (numDisplayed!==0)){
        numDisplayed--;
       
        //if the number goes back to zero, disable the button
        document.getElementById("mod1Agree").disabled=true;
       
    }
    
    if(button.id === "btnPlus"){
        numDisplayed++;
        document.getElementById("mod1Agree").disabled=false;
    }


    document.getElementById("modalQuant").innerHTML = numDisplayed;  
    colArray[startPos].quantity = numDisplayed;
  
 }

 //when agree is clicked, change the fit number to the number and change the addto cart text
 function modal1Done(button){
     // sees if the current element is not the last one
    if(startPos+1 < colArray.length){
        dispColors(colArray[startPos]);
        totalPrice += colArray[startPos].getTotalPrice();
       
        startPos++;
        numItems += numDisplayed;
        numDisplayed = 0;
        document.getElementById("modalQuant").innerHTML = numDisplayed;
        document.getElementById("lblModalColor").innerHTML = colArray[startPos].dispName;
        document.getElementById("numItems").innerHTML = numItems;

         //if the number goes back to zero, disable the button
         document.getElementById("mod1Agree").disabled=true;
        
       
        
    }else{
        dispColors(colArray[startPos]);
        totalPrice += colArray[startPos].getTotalPrice();
        numItems += numDisplayed;
        document.getElementById("add").innerHTML = "Checkout Now";
        document.getElementById("numItems").innerHTML = numItems;
       
        document.getElementById("discountedPrice").innerHTML = totalPrice.toFixed(2);

        $("#cartModal").modal('hide');
    }


    
   
   
  

 }

 //make sure that the numbers always line up in the add to cart
 function sameNums(){
    document.getElementById("modalQuant").innerHTML = numItems; 
    numDisplayed = numItems;
   
 }

 function checkout(button){
     if(button.innerHTML === "Checkout Now"){
        $("#checkoutMod").modal('toggle');
        var totalStuff = document.createElement("p");
        var parentE;
        for(i = 0; i< colArray.length; i++){
            parentE = document.getElementById("checkoutParent");
            // var childE = document.createElement("div");
            // var colorImg = document.createElement("div");
            var colorWords = document.createElement("p");
           

            // colorImg.style.className = "myBut";
            // colorImg.styleClass.backgroundColor = colArray[i].colName;

            colorWords.innerHTML = colArray[i].quantity +" " +colArray[i].colName+ " at $"+colArray[i].price.toFixed(2)+" each.";
          
            // childE.className = "row";
            // childE.appendChild(colorImg);
            // childE.appendChild(colorWords);

            parentE.appendChild(colorWords);
        }
       
            totalStuff.innerHTML = "The total price is " + totalPrice.toFixed(2);
            parentE.appendChild(totalStuff);
    
     }
 }


//this is for showing the colors

function dispColors(ColorObject){
var parentE, childE, appendChildE;

//create a copy of the colorName and make it small
 tempCol = ColorObject.colName;
// tempCol = tempCol.replace(" ","");
// tempCol = tempCol.toLowerCase();
console.log(tempCol);


 parentE = document.getElementById("dispColorsBought");
// add the chold elements
for(i = 0; i < ColorObject.quantity; i++){
    childE = document.createElement('div');
    appendChildE = parentE.appendChild(childE);
    appendChildE.className = ColorObject.styleClass;
     //black border for white needs fixing

     if(ColorObject.colorName === "white"){
        appendChildE.style.borderColor = 'black';
        appendChildE.style.borderWidth = '2px';
        console.log(appendChildE.style.borderColor);
    }
    appendChildE.style.backgroundColor = ColorObject.colName;
   
    appendChildE.style.margin = '10px';

}

}

