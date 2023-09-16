const currentCalculation = {
    number1: null,
    number2: null,
    operator: null,
    result: "",
    addElement: function(digit) {
        if(digit.match(/[0-9]/)){
            this.storeNumber(digit);
        } else if(digit.match(/[/*\-+]/)) {
            if(this.operator === null){
                this.storeOperator(digit);
            } else {
                if (doCalculation()) {
                    this.storeOperator(digit);
                }
            }
        } else if(digit.match("=")) {
            this.doCalculation();
        }
    },
    storeNumber: function(num) {
        if(this.number1 === null) {
            this.number1 = parseFloat(num);
        } else if(this.number2 === null && this.operator !== null) {
            this.number2 = parseFloat(num);
        }
    },
    storeOperator: function(operator) {
        this.operator = operator;
    },
    checkValidCalculation: function() {
        let retObj = {
            isValid: true,
            errMsg: ""
        }
        if(this.number1 === null || this.number2 === null || this.operator === null) {
            retObj = {isValid: false, errMsg: "" };
        }
        if(this.number2 === 0 && this.operator === "/") {
            retObj = {isValid: false, errMsg: "Can't divide by zero" };

        }
        return retObj;
    },
    doCalculation: function(){
        let result = null;
        const isValidObj = this.checkValidCalculation();
        if(isValidObj.isValid) {
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
            this.result = result;
        } else {
            if(isValidObj.errMsg) {alert(isValidObj.errMsg);}
        }
        return isValidObj;
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
    }
}

function handleButtonPress(e){
    const btnId = e.currentTarget.id;
    const digit = btnId[btnId.length -1];
    currentCalculation.addElement(digit);
    updateCalculationDiv();
}

function updateCalculationDiv() {
    let calculationString = "";    
    calculationPara.textContent = currentCalculation.getCalculationString();
    resultPara.textContent = currentCalculation.result;
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
calcBtn.addEventListener('click', handleButtonPress);




