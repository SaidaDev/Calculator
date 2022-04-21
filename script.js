let num1 = 0,
  num2 = 0,
  current_op = '',
  isEqual = false

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')

const isInitiaState = () => {
  return current_op === '' && isEqual === false
}

const isCalculateState = () => {
  return current_op !== '' && isEqual === false
}

const isEqualState = () => {
  return isEqual
}

const makeCalculate = (a, b, op) => {
  switch (op) {
    case '/':
      return a / b

    case '*':
      return a * b

    case '-':
      return a - b

    case '+':
      return a + b
  }
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (event) => {
    const pressedNumber = Number(event.target.id)

    if (isEqualState()) {
      num1 = 0
      num2 = 0
      current_op = ''
      isEqual = false
    }
    num1 = num1 * 10 + pressedNumber
    render()
  })
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', (event) => {
    switch (event.target.id) {
      case 'clear':
        num1 = 0
        num2 = 0
        current_op = ''
        isEqual = false
        break

      case 'backspace':
        if (!isEqualState()) {
          num1 = Math.floor(num1 / 10)
        }
        break

      case '%':
        break

      case '/':
      case '*':
      case '-':
      case '+':
        if (isInitiaState() && num1 === 0) {
          break
        }

        if (isInitiaState() && num1 !== 0) {
          num2 = num1
          num1 = 0
          current_op = event.target.id
          break
        }

        if (isCalculateState() && num1 === 0) {
          current_op = event.target.id
          break
        }

        if (isCalculateState() && num1 !== 0) {
          num2 = makeCalculate(num2, num1, current_op)
          num1 = 0
          current_op = event.target.id
          break
        }

        if (isEqualState()) {
          num2 = num1
          num1 = 0
          current_op = event.target.id
          isEqual = false
          break
        }
        break

      case '=':
        if (isInitiaState()) {
          break
        }
        if (isCalculateState() && num1 !== 0) {
          const oldNum1 = num1

          num1 = makeCalculate(num2, num1, current_op)
          num2 = oldNum1
          isEqual = true

          break
        }
        if (isEqualState()) {
          num1 = makeCalculate(num1, num2, current_op)
        }
        break
    }
    render()
  })
}

const render = () => {
  const history = document.querySelector('#history-value')
  const ouput = document.querySelector('#output-value')

  if (isInitiaState()) {
    history.innerText = ''
  } else {
    history.innerText = num2.toLocaleString() + ' ' + current_op
  }
  ouput.innerText = num1.toLocaleString()

  for (let i = 0; i < operators.length; i++) {
    operators[i].classList.remove('active')
  }
  if (current_op !== '') {
    document.getElementById(current_op).classList.add('active')
  }
}
render()
