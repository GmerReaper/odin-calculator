const Display = document.getElementById('display')
let firstNumber, secondNumber, operator;
let currentEntry = '';
let operatorClicked = false;
const Comments = [
    "Nice try.",
    "Nope.",
    "Math says no.",
    "Not today.",
    "Can't do that.",
    "Rule broken.",
    "Undefined.",
    "Try again.",
    "No dice.",
    "Illegal move.",
    "Zero says no.",
    "Bad idea."
];

const operatorbuttons = document.querySelectorAll('[data-operator]');
const digitbuttons = document.querySelectorAll('[data-number]');

digitbuttons.forEach((button) => {
    button.addEventListener('click', () => {
        //display the current entry when a number button is clicked
        currentEntry += button.dataset.number;
        Display.value = currentEntry;
        fitDisplayText();
        //store the first number and second number when a number button is clicked
        if (operatorClicked) {
            secondNumber = parseFloat(currentEntry);
        } else {
            firstNumber = parseFloat(currentEntry);
        }
    });
});

operatorbuttons.forEach((button) => {
    button.addEventListener('click', () => {
        //display the current entry and operator when an operator button is clicked
        Display.value = currentEntry;
        fitDisplayText();
        //clear the current entry when the clear button is clicked
        switch (button.dataset.operator) {
            case 'clear':
                currentEntry = '';
                firstNumber = undefined;
                secondNumber = undefined;
                operator = undefined;
                operatorClicked = false;
                Display.value = '0';
                fitDisplayText();
                return;
        }
        //perform the operation when the equals button is clicked
        switch (button.dataset.operator) {
            case '=':
                if (firstNumber === undefined) {
                    Display.value = '0';
                    fitDisplayText();
                    return;
                }
                if (operator === undefined || secondNumber === undefined) {
                    currentEntry = parseFloat(firstNumber.toFixed(2)).toString();
                    Display.value = currentEntry;
                    fitDisplayText();
                    return;
                } else {
                    firstNumber = operate(operator, firstNumber, secondNumber);
                    if (typeof firstNumber === 'string') {
                        currentEntry = firstNumber;
                        Display.value = currentEntry;
                        fitDisplayText();
                        return;
                    }
                    operatorClicked = false;
                    secondNumber = undefined;
                    operator = undefined;
                }
                currentEntry = parseFloat(firstNumber.toFixed(2)).toString();
                Display.value = currentEntry;
                fitDisplayText();
                currentEntry = '';
                return;
        }
        switch (button.dataset.operator) {
            case '.':
                if (!currentEntry.includes('.')) {
                    currentEntry += '.';
                    Display.value = currentEntry;
                    fitDisplayText();
                }
                return;
        }
        switch (currentEntry) {
            case '':
                currentEntry = '0';
                break;
        }

        currentEntry += button.dataset.operator;

        if (operator !== undefined && secondNumber !== undefined) {
            //perform the operation when an operator button is clicked and there is already an operator stored
            firstNumber = operate(operator, firstNumber, secondNumber);
            currentEntry = parseFloat(firstNumber.toFixed(2)).toString();
            currentEntry += button.dataset.operator;
            secondNumber = undefined;
        } else if (operator !== undefined && secondNumber === undefined) {

        } else {
            //store the first number and operator when an operator button is clicked
            operatorClicked = true;
            firstNumber = parseFloat(currentEntry);
        }
        operator = button.dataset.operator;
        Display.value = currentEntry;
        fitDisplayText();
        currentEntry = '';
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
    if (b === 0) {
        return Comments[Math.floor(Math.random() * Comments.length)];
    } else {
        return a / b;
    }
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

//Auto shrink the text to fit the display
function fitDisplayText() {
    Display.style.fontSize = '2.2rem';
    while (Display.scrollWidth > Display.clientWidth && parseFloat(Display.style.fontSize) > 0.6) {
        Display.style.fontSize = (parseFloat(Display.style.fontSize) - 0.1) + 'rem';
    }
}