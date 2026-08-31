const Display = document.getElementById('display')
let firstNumber, secondNumber, operator;
let currentEntry = '';
let operatorClicked = false;
let grandTotal = 0;

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

function handleDigit(number) {
    //display the current entry when a number button is clicked
    currentEntry += number;
    Display.value = currentEntry;
    fitDisplayText();
    //store the first number and second number when a number button is clicked
    if (operatorClicked) {
        secondNumber = parseFloat(currentEntry);
    } else {
        firstNumber = parseFloat(currentEntry);
    }
};

function handleOperator(op) {
    Display.value = currentEntry;
    fitDisplayText();

    switch (op) {
        case 'clear':
            currentEntry = '';
            firstNumber = undefined;
            secondNumber = undefined;
            operator = undefined;
            operatorClicked = false;
            grandTotal = 0;
            Display.value = '0';
            fitDisplayText();
            return;
    }

    switch (op) {
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
                grandTotal += firstNumber;
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

    switch (op) {
        case '.':
            if (!currentEntry.includes('.')) {
                currentEntry += '.';
                Display.value = currentEntry;
                fitDisplayText();
            }
            return;
    }

    const hadNothingTyped = currentEntry === '';

    switch (currentEntry) {
        case '':
            currentEntry = (firstNumber !== undefined) ? firstNumber.toString() : '0';
            break;
    }

    switch (op) {
        case 'backspace':
            currentEntry = currentEntry.slice(0, -1);
            Display.value = currentEntry;
            fitDisplayText();
            if (operatorClicked) {
                secondNumber = currentEntry === '' ? undefined : parseFloat(currentEntry);
            } else {
                firstNumber = currentEntry === '' ? undefined : parseFloat(currentEntry);
            }
            return;
    }

    switch (op) {
        case 'CE':
            currentEntry = '';
            if (firstNumber === undefined) {
                Display.value = '0';
            } else if (operator === undefined) {
                Display.value = '0';
            } else if (secondNumber === undefined) {
                Display.value = firstNumber;
                operator = undefined;
                operatorClicked = false;
            } else {
                Display.value = firstNumber + operator;
            }
            fitDisplayText();
            return;
    }

    switch (op) {
        case 'GT':
            currentEntry = grandTotal.toString();
            Display.value = currentEntry;
            fitDisplayText();
            currentEntry = '';
            return;
    }

    currentEntry += op;

    if (operator !== undefined && secondNumber !== undefined) {
        firstNumber = operate(operator, firstNumber, secondNumber);
        currentEntry = parseFloat(firstNumber.toFixed(2)).toString();
        currentEntry += op;
        secondNumber = undefined;
    } else if (operator !== undefined && secondNumber === undefined) {

    } else {
        operatorClicked = true;
        if (!(hadNothingTyped && firstNumber !== undefined)) {
            firstNumber = parseFloat(currentEntry);
        }
    }

    operator = op;
    Display.value = currentEntry;
    fitDisplayText();
    currentEntry = '';
};

digitbuttons.forEach(button => {
    button.addEventListener('click', () => {
        handleDigit(button.dataset.number);
    });
});

operatorbuttons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperator(button.dataset.operator);
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        handleDigit(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '.') {
        handleOperator(event.key);
    } else if (event.key === '*') {
        handleOperator('×');
    } else if (event.key === '/') {
        event.preventDefault();
        handleOperator('/');
    } else if (event.key === 'Enter' || event.key === '=') {
        handleOperator('=');
    } else if (event.key === 'Backspace') {
        handleOperator('backspace');
    } else if (event.key === 'Escape') {
        handleOperator('clear');
    }
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