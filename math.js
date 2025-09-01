// Referências aos elementos de input e display
const expressionInput = document.getElementById('expression');
const resultDisplay = document.getElementById('result-output');

/**
 * Adiciona um valor ao campo de expressão
 * @param {string} value - O caractere a ser adicionado
 */
function appendToExpression(value) {
    expressionInput.value += value;
}

/**
 * Limpa o campo de expressão e o resultado
 */
function clearExpression() {
    expressionInput.value = '';
    displayResult(''); // Limpa também o display de resultado
}

/**
 * Deleta o último caractere do campo de expressão
 */
function deleteLast() {
    expressionInput.value = expressionInput.value.slice(0, -1);
}


/**
 * Exibe o resultado ou um erro na tela
 * @param {string} content - O conteúdo a ser exibido
 * @param {boolean} isError - Se o conteúdo é uma mensagem de erro
 */
function displayResult(content, isError = false) {
    resultDisplay.innerHTML = content;
    resultDisplay.style.color = isError ? '#c0392b' : '#2c3e50';
}

/**
 * Função para resolver expressões matemáticas e equações simbólicas
 */
function solveExpression() {
    const expression = expressionInput.value;
    if (!expression) {
        displayResult('Por favor, insira uma expressão ou equação.', true);
        return;
    }

    try {
        let result;
        if (/[a-z]/.test(expression) && expression.includes('=')) {
            const solutions = nerdamer.solve(expression, 'x').toString();
            result = `Solução para x: ${solutions}`;
        } else {
            result = math.evaluate(expression);
        }
        displayResult(result.toString());
    } catch (error) {
        displayResult('Expressão Inválida', true);
    }
}

/**
 * Função para calcular a equação da reta dados dois pontos A(x1, y1) e B(x2, y2)
 */
function solveLineEquation() {
    try {
        const ax = parseFloat(document.getElementById('pontoAx').value);
        const ay = parseFloat(document.getElementById('pontoAy').value);
        const bx = parseFloat(document.getElementById('pontoBx').value);
        const by = parseFloat(document.getElementById('pontoBy').value);

        if (isNaN(ax) || isNaN(ay) || isNaN(bx) || isNaN(by)) {
            displayResult('Preencha todas as coordenadas dos pontos.', true);
            return;
        }

        if (ax === bx) {
            displayResult(`Reta vertical: x = ${ax}`);
            return;
        }
        
        if (ay === by) {
            displayResult(`Reta horizontal: y = ${ay}`);
            return;
        }

        const m = (by - ay) / (bx - ax);
        const c = ay - m * ax;

        let equation = `y = ${m.toFixed(2)}x`;
        if (c > 0) {
            equation += ` + ${c.toFixed(2)}`;
        } else if (c < 0) {
            equation += ` - ${Math.abs(c).toFixed(2)}`;
        }

        const resultText = `
            <b>Cálculo Passo a Passo:</b><br>
            1. Coeficiente Angular (m) = (y2 - y1) / (x2 - x1) = ${m.toFixed(2)}<br>
            2. Coeficiente Linear (c) = y - mx = ${c.toFixed(2)}<br><br>
            <b>Equação da Reta: ${equation}</b>
        `;
        
        displayResult(resultText);

    } catch (error) {
        displayResult('Erro ao calcular: ' + error.message, true);
    }
}


/**
 * Função para calcular operações de matrizes
 */
function calculateMatrix(operation) {
    try {
        const matrixA = math.matrix(JSON.parse(document.getElementById('matrixA').value));
        let result;

        if (['add', 'subtract', 'multiply'].includes(operation)) {
            const matrixB = math.matrix(JSON.parse(document.getElementById('matrixB').value));
            result = math[operation](matrixA, matrixB);
        } else {
            switch(operation) {
                case 'detA': result = math.det(matrixA); break;
                case 'invA': result = math.inv(matrixA); break;
                case 'transposeA': result = math.transpose(matrixA); break;
                default: throw new Error('Operação desconhecida');
            }
        }
        displayResult(math.format(result, { notation: 'fixed', precision: 4 }));
    } catch (error) {
        displayResult('Erro na matriz: ' + error.message, true);
    }
}