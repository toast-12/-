// DOM이 로드된 후 실행되도록 설정
document.addEventListener('DOMContentLoaded', () => {
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
                // 'C' 버튼 클릭 시 계산기 초기화
                currentInput = '';
                previousInput = '';
                operator = '';
                display.value = '';
            } else if (value === '=') {
                // '=' 버튼 클릭 시 계산 실행
                if (previousInput && operator && currentInput) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    display.value = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                // 연산자 버튼 클릭 시
                if (currentInput === '') return;  // 현재 입력이 비어 있으면 연산자 클릭 무시
                if (previousInput !== '') {
                    // 이전 값이 있다면 연산 후 결과를 currentInput에 저장
                    currentInput = calculate(previousInput, operator, currentInput);
                    display.value = currentInput;
                }
                operator = value;  // 연산자를 설정
                previousInput = currentInput;  // 이전 값을 설정
                currentInput = '';  // 새로운 입력을 받을 준비
            } else if (value === '.') {
                // 소수점 버튼 클릭 시
                if (!currentInput.includes('.')) {
                    currentInput += value;
                    display.value = currentInput;
                }
            } else {
                // 숫자 버튼 클릭 시
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    // 계산 함수
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
});
