// 계산기 동작을 위한 스크립트
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const calculator = document.querySelector('.calculator');

// 계산기의 상태를 추적할 변수들
let currentInput = '';
let previousInput = '';
let operator = '';

// 마우스 움직임에 따른 왜곡 효과
document.addEventListener('mousemove', (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const { offsetWidth: width, offsetHeight: height } = calculator;

    // 마우스 위치를 계산기에 상대적인 좌표로 변환
    const rotateX = (mouseY / height - 0.5) * 8;  // 회전 범위 제한 (-8도에서 8도)
    const rotateY = (mouseX / width - 0.5) * -8;  // 회전 범위 제한 (-8도에서 8도)

    // 애니메이션 효과 적용
    calculator.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (value === '=') {
            if (previousInput && operator) {
                currentInput = calculate(previousInput, operator, currentInput);
                display.value = currentInput;
                previousInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                if (previousInput) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    display.value = currentInput;
                }
                previousInput = currentInput;
                operator = value;
                currentInput = '';
            }
        } else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += value;
                display.value = currentInput;
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

function calculate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                alert("0으로 나눌 수 없습니다.");
                return '';
            }
            return a / b;
        default:
            return b;
    }
}
