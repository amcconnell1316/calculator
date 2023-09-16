const currentCalculation = {
    number1: null,
    number2: null,
    operator: null,
    result: "",
    calculationString: "",
    isValidObj: {
        isValid: true,
        errMsg: ""
    },
    addElement: function(digit) {
        if(digit.match(/[0-9]/)){
            this.storeNumber(digit);
        } else if(digit.match(/[/*\-+]/)) {
            this.storeOperator(digit);
        } 
    },
    storeNumber: function(num) {
        if(this.number1 === null || this.number1 === 0) {
            this.number1 = parseFloat(num);
        } else if(this.operator === null) {
            this.number1 = parseFloat(this.number1.toString() + num);
        } else if(this.number2 === null || this.number2 === 0) {
            this.number2 = parseFloat(num);
        } else {
            this.number2 = parseFloat(this.number2.toString() + num);
        }
        this.isValidObj = {
            isValid: true,
            errMsg: ""
        };
    },
    storeOperator: function(operator) {
        if(this.operator === null){
            this.operator = operator;
            this.isValidObj = {
                isValid: true,
                errMsg: ""
            };
        } else {
            // If a second operator is pressed, force the calculation to execute to prepare to do more
            this.doCalculation()
            if (this.isValidObj.isValid) {
                this.number1 = this.result;
                this.operator = operator;
                this.number2 = null;
            }
        }
    },
    checkValidCalculation: function() {
        if(this.number1 === null || this.number2 === null || this.operator === null) {
            this.isValidObj = {isValid: false, errMsg: "" };
        } else if(this.number2 === 0 && this.operator === "/") {
            this.isValidObj = {isValid: false, errMsg: "Can't divide by zero" };
        } else {
            this.isValidObj = {isValid: true, errMsg: ""};
        }
    },
    doCalculation: function(){
        let result = null;
        this.checkValidCalculation();
        if(this.isValidObj.isValid) {
            switch(this.operator){
                case "/":
                    result = this.number1 / this.number2;
                    break;
                case "*":
                    result = this.number1 * this.number2;
                    break;
                case "-":
                    result = this.number1 - this.number2;
                    break;
                case "+":
                    result = this.number1 + this.number2;
                    break;
            }
            this.result = Math.floor(result*10000)/10000; //rounds to 5 decimal places
        } 
    },
    getCalculationString: function() {
        let calculationString = ""
        if(this.number1 !== null) {
            calculationString += this.number1;
            if(this.operator !== null) {
                calculationString += " " + this.operator;
                if(this.number2 !== null) {
                    calculationString += " " + this.number2;
                }
            }   
        }
        return calculationString; 
    },
    clearCalculation: function() {
        this.number1 = null;
        this.number2 = null;
        this.operator = null;
        this.result = "";
        this.calculationString = "";
        this.isValidObj = {
            isValid: true,
            errMsg: ""
        };
    }
}

function handleButtonPress(e){
    const btnId = e.currentTarget.id;
    const digit = btnId[btnId.length - 1];
    currentCalculation.addElement(digit);
    if(currentCalculation.isValidObj.errMsg) {alert(currentCalculation.isValidObj.errMsg);}
    updateCalculationDiv();
}

function calculate(e) {
    currentCalculation.doCalculation();
    if(currentCalculation.isValidObj.errMsg) {alert(currentCalculation.isValidObj.errMsg);}
    updateCalculationDiv();
}

function updateCalculationDiv() {
    let calculationString = "";    
    calculationPara.textContent = currentCalculation.getCalculationString();
    resultPara.textContent = currentCalculation.result;
}

function clearCalculator(e) {
    currentCalculation.clearCalculation();
    updateCalculationDiv();
}


const calculationPara = document.getElementById("calculationPara");
const resultPara = document.getElementById("resultPara");
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
calcBtn.addEventListener('click', calculate);
calcBtn = document.getElementById("keyClr");
calcBtn.addEventListener('click', clearCalculator);




