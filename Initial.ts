interface Operation {
  operator: string;
  execute: (a: number, b: number) => number | null;
}

class Calculator {
  private operations: Operation[] = [
    {
      operator: '+',
      execute: (a, b) => a + b
    },
    {
      operator: '-',
      execute: (a, b) => a - b
    },
    {
      operator: '*',
      execute: (a, b) => a * b
    },
    {
      operator: '/',
      execute: (a, b) => {
        if (b === 0) {
          console.log('Error: Division by zero is not allowed!');
          return null;
        }
        return a / b;
      }
    }
  ];

  calculate(num1: number, operator: string, num2: number): number | null {
    const operation = this.operations.find(op => op.operator === operator);
    if (!operation) {
      console.log(`Invalid operator! Please use: ${this.operations.map(op => op.operator).join(', ')}`);
      return null;
    }
    return operation.execute(num1, num2);
  }
}

function getUserInput(): Promise<void> {
  const calculator = new Calculator();

  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questions = [
    'Enter the first number: ',
    'Enter an operator (+, -, *, /): ',
    'Enter the second number: '
  ];
  const answers: string[] = [];

  function askQuestion(index: number): void {
    if (index >= questions.length) {
      processAnswers(answers);
      rl.close();
      return;
    }

    rl.question(questions[index], (answer: string) => {
      answers.push(answer);
      askQuestion(index + 1);
    });
  }

  function processAnswers(answers: string[]): void {
    const num1 = parseFloat(answers[0]);
    const operator = answers[1].trim();
    const num2 = parseFloat(answers[2]);

    if (isNaN(num1) || isNaN(num2)) {
      console.log('Please enter valid numbers!');
      return;
    }

    const result = calculator.calculate(num1, operator, num2);
    if (result !== null) {
      console.log(`Result: ${num1} ${operator} ${num2} = ${result}`);
    }
  }

  console.log('Simple Calculator in TypeScript');
  askQuestion(0);
}

getUserInput();
