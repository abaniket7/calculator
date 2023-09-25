document.addEventListener('DOMContentLoaded', function () {
    const inputDisplay = document.getElementById('input-display');
    const outputDisplay = document.getElementById('output-display');
    const buttonsContainer = document.getElementById('buttons-container');

    let input = '';
    let output = '';

    function updateDisplays() {
        inputDisplay.textContent = input;
        outputDisplay.textContent = output;
    }

    function handleButtonClick(event) {
        const label = event.target.textContent; // Use the button's text as the label
        if (label === '=') {
            try {
                let result = input;
                result = result.replace(/sqrt/g, 'Math.sqrt');
                result = result.replace(/\^/g, '**');
                result = result.replace(/(\d+)!/, (match, num) => {
                    num = parseInt(num);
                    let factorial = 1;
                    for (let i = 2; i <= num; i++) {
                        factorial *= i;
                    }
                    return factorial.toString();
                });

                result = result.replace(/(\d+)%/, (match, num) => {
                    num = parseFloat(num);
                    return (num / 100).toString();
                });

                output = eval(result).toString();
            } catch (error) {
                output = 'Error';
            }
        } else if (label === 'C') {
            input = '';
            output = '';
        } else if (label === '⌫') {
            input = input.slice(0, -1);
        } else {
            input += label;
        }
        updateDisplays();
    }

    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach((button) => {
        button.addEventListener('click', handleButtonClick);
    });

    // Initial display update
    updateDisplays();
});
