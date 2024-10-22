class Calculator {
    constructor() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
    }

    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
    }

    appendNumber(number) {
        this.currentInput += number;
    }

    chooseOperator(operator) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentInput = computation;
        this.operator = '';
        this.previousInput = '';
    }

    updateDisplay(displayElement) {
        displayElement.innerText = this.currentInput;
    }
}

// Create calculator instance
const calculator = new Calculator();

// Create HTML elements
const calculatorElement = document.createElement('div');
calculatorElement.classList.add('calculator');

const displayElement = document.createElement('div');
displayElement.classList.add('display');
displayElement.innerText = '0';
calculatorElement.appendChild(displayElement);

const buttons = [
    '7', '8', '9', '/', 
    '4', '5', '6', '*', 
    '1', '2', '3', '-', 
    '0', '.', '=', '+', 
    'C'
];

buttons.forEach(button => {
    const buttonElement = document.createElement('button');
    buttonElement.innerText = button;
    buttonElement.classList.add('btn');
    buttonElement.setAttribute('data-value', button);
    calculatorElement.appendChild(buttonElement);
});

// Append calculator to body
document.body.appendChild(calculatorElement);

// Add event listeners
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value === 'C') {
            calculator.clear();
            displayElement.innerText = '0';
        } else if (value === '=') {
            calculator.compute();
            calculator.updateDisplay(displayElement);
        } else if (['+', '-', '*', '/'].includes(value)) {
            calculator.chooseOperator(value);
        } else {
            calculator.appendNumber(value);
            calculator.updateDisplay(displayElement);
        }
    });
});