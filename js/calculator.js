function concatAndDisplay(number) {
    let result = document.getElementById('input').innerHTML;

    //Remove the leading 0
    if (result == 0) {
        document.getElementById('input').innerHTML = "";
    }

    //Concat numbers
    document.getElementById('input').innerHTML += String(number);

}

function clearResult() {
    document.getElementById('result').innerHTML = "0";
    document.getElementById('input').innerHTML = "0";
}


// handle other operators and handle multiple operators in 1 input

function processKeyPress(character) {

    concatAndDisplay(character);

    let input = String(document.getElementById('input').innerHTML);
    let positionOfOperator;

    if (!(input.endsWith("+") || input.endsWith("x") || input.endsWith("-") || input.endsWith("/"))) {

        document.getElementById('result').innerHTML = calculate(input);

    }

   


}

function calculate(input) {

    let inputString = String(input);
    let arrayNumbersAndOperators = [];
    let tempNumber = "";

    while (inputString.charAt(0) != "") {

        let firstChar = inputString.charAt(0);

        //if it's the last char of the input
        if(inputString.length==1){
            let number=tempNumber+firstChar;
            arrayNumbersAndOperators.push(
                { key: number, value: "none" }
            )
            //reset TempNumber
            tempNumber = "";
            console.log("stored " + arrayNumbersAndOperators[arrayNumbersAndOperators.length - 1].key +
                 arrayNumbersAndOperators[arrayNumbersAndOperators.length - 1].value);
            
        }

       


        // if the first char is an operator
        if (firstChar == "+" || firstChar == "-" || firstChar == "x" || firstChar == "/") {
            let number=tempNumber;
            //store the number and it's right operator
            arrayNumbersAndOperators.push(
                { key: number, value: firstChar }
            )
            //reset TempNumber
            tempNumber = "";
            console.log("stored " + arrayNumbersAndOperators[arrayNumbersAndOperators.length - 1].key +
                 arrayNumbersAndOperators[arrayNumbersAndOperators.length - 1].value);
            
        }
        // the first char is a number
        else {
            tempNumber = tempNumber + firstChar;
        }
        //remove the first char and continue iterating on the loop
        inputString = inputString.slice(1);
    }

    //we now have an array of objects where key is the number and value is the operator to its right

    for(let k=0; k<arrayNumbersAndOperators.length; k++){

        let tempResult=Number();

        //multiplyFirst
        if(arrayNumbersAndOperators[k].value=="x"){
            tempResult=Number(arrayNumbersAndOperators[k].key)*Number(arrayNumbersAndOperators[k+1].key);

            //Now put the tempResult as the new key of index k+1 
            arrayNumbersAndOperators[k+1].key=tempResult;
            //and remove the object at index k 
            arrayNumbersAndOperators.splice(k, 1);
            //we have to decrement k because we have reduce the size of the array by 1
            //otherwise we would skip one index
            k=k-1;
        }
    }

    //TODO: same logic as multiple but with division

    //Additions
    for(let k=0; k<arrayNumbersAndOperators.length; k++){

        let tempResult=Number();

        //multiplyFirst
        if(arrayNumbersAndOperators[k].value=="+"){
            tempResult=Number(arrayNumbersAndOperators[k].key)+Number(arrayNumbersAndOperators[k+1].key);

            //Now put the tempResult as the new key of index k+1 
            arrayNumbersAndOperators[k+1].key=tempResult;
            //and remove the object at index k 
            arrayNumbersAndOperators.splice(k, 1);
            //we have to decrement k because we have reduce the size of the array by 1
            //otherwise we would skip one index
            k=k-1;
        }
    }

    //TODO: same logic as multiple but with substraction

    //By now we should have only 1 item in arrayNumbersAndOperators and the key is the final result

    return arrayNumbersAndOperators[0].key;
}