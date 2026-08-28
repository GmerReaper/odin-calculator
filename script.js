const Display = document.getElementById('display')
let firstNumber, secondNumber, operator;
let currentEntry = '';
let operatorClicked = false;


const operatorbuttons = document.querySelectorAll('[data-operator]');
const digitbuttons = document.querySelectorAll('[data-number]');

digitbuttons.forEach((button) => {
    button.addEventListener('click', () => {
        //display the current entry when a number button is clicked
        currentEntry += button.dataset.number;
        Display.value = currentEntry;
        //store the first number and second number when a number button is clicked
        if (operatorClicked) {
            secondNumber = parseFloat(currentEntry);
        } else {
            firstNumber = parseFloat(currentEntry);
        }
        console.log(currentEntry);
        console.log(firstNumber, operator, secondNumber);
    });
});

operatorbuttons.forEach((button) => {
    button.addEventListener('click', () => {
        //display the current entry and operator when an operator button is clicked
        Display.value = currentEntry;
        //clear the current entry when the clear button is clicked
        switch (button.dataset.operator) {
            case 'clear':
                currentEntry = '';
                operatorClicked = false;
                return Display.value = '0';
        }
        //perform the operation when the equals button is clicked
        switch (button.dataset.operator) {
            case '=':
                if (operator === undefined || secondNumber === undefined) {
                    currentEntry = firstNumber.toString();
                    return Display.value = currentEntry;
                } else {
                    firstNumber = operate(operator, firstNumber, secondNumber);
                    operatorClicked = false;
                    secondNumber = undefined;
                    operator = undefined;
                }
                currentEntry = firstNumber.toString();
                return Display.value = currentEntry;
        }
        switch (button.dataset.operator) {
            case '.':
                if (!currentEntry.includes('.')) {
                    currentEntry += '.';
                    Display.value = currentEntry;
                }
                return Display.value = currentEntry;
        }

        if (currentEntry === '') {
            currentEntry = '0';
        }

        currentEntry += button.dataset.operator;

        if (operator !== undefined) {
            //perform the operation when an operator button is clicked and there is already an operator stored
            firstNumber = operate(operator, firstNumber, secondNumber);
            secondNumber = undefined;
        } else {
            //store the first number and operator when an operator button is clicked
            operatorClicked = true;
            firstNumber = parseFloat(currentEntry);
        }
        operator = button.dataset.operator;
        Display.value = currentEntry;
        currentEntry = '';

        console.log(currentEntry);
    });
});


function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};



function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '×':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            return "Invalid operator";
    }
};
