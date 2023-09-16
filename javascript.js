const currentCalculation = {
    number1: null,
    number2: null,
    operator: null,
    storeNumber: function(num) {
        if(this.number1 === null) {
            this.number1 = parseFloat(num);
        } else if(this.number2 === null && this.operator !== null) {
            this.number2 = parseFloat(num);
        }
        updateCalculationDiv();
    },
    storeOperator: function(operator) {
        if(this.operator === null) {
            this.operator = operator;
        }
        updateCalculationDiv();
    }
}

function handleButtonPress(e){
    const btnId = e.currentTarget.id;
    const digit = btnId[btnId.length -1];
    if(digit.match(/[0-9]/)){
        currentCalculation.storeNumber(digit);
    } else if(digit.match(/[/*\-+]/)) {
        currentCalculation.storeOperator(digit);
    } else if(digit.match("=")) {
        doCalculation();
    }
}

function doCalculation(){
    
    console.log("calculate");
}

function updateCalculationDiv() {
    let calculationString = "";
    if(currentCalculation.number1 !== null) {
        calculationString += currentCalculation.number1;
        if(currentCalculation.operator !== null) {
            calculationString += " " + currentCalculation.operator;
            if(currentCalculation.number2 !== null) {
                calculationString += " " + currentCalculation.number2;
            }
        }   
    }
    
    calculationPara.textContent = calculationString;
}


const calculationPara = document.getElementById("calculationPara");
let calcBtn;
for (let i = 0; i < 10; i++) {
    calcBtn = document.getElementById("key" + i);
    calcBtn.addEventListener('click', handleButtonPress);
}
calcBtn = document.getElementById("key/");
calcBtn.addEventListener('click', handleButtonPress);
calcBtn = document.getElementById("key*");
calcBtn.addEventListener('click', handleButtonPress);
calcBtn = document.getElementById("key-");
calcBtn.addEventListener('click', handleButtonPress);
calcBtn = document.getElementById("key+");
calcBtn.addEventListener('click', handleButtonPress);
calcBtn = document.getElementById("key=");
calcBtn.addEventListener('click', handleButtonPress);




