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
        currentEntry += button.dataset.operator;
        Display.value = currentEntry;
        //clear the current entry when the clear button is clicked
        switch (button.dataset.operator) {
            case 'clear':
                currentEntry = '';
                operatorClicked = false;
                return Display.value = currentEntry;
        }
        //perform the operation when the equals button is clicked
        switch (button.dataset.operator) {
            case '=':
                firstNumber = operate(operator, firstNumber, secondNumber);
                currentEntry = firstNumber.toString();
                Display.value = currentEntry;
                operatorClicked = false;
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
        //store the first number and operator when an operator button is clicked
        operatorClicked = true;
        operator = button.dataset.operator;
        firstNumber = parseFloat(currentEntry);
        //reset the current entry for the second number
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
