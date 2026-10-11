const examples = {
  error: "const value = '5';\n\nif (value == 5) {\n  console.log('Мәндер тең');\n}",
  fixed: "const value = 5;\n\nif (value === 5) {\n  console.log('Мәндер тең');\n}",
};

const choices = document.querySelectorAll('[data-example]');
const code = document.querySelector('#example-code');
const runButton = document.querySelector('#run-analysis');
const result = document.querySelector('#analysis-result');
let selectedExample = 'error';
let pendingAnalysis;

function showResult(state, icon, title, message) {
  result.className = `analysis-result ${state}`.trim();
  result.querySelector('.result-icon').textContent = icon;
  result.querySelector('strong').textContent = title;
  result.querySelector('p').textContent = message;
}

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    clearTimeout(pendingAnalysis);
    runButton.disabled = false;
    result.removeAttribute('aria-busy');
    selectedExample = choice.dataset.example;
    code.textContent = examples[selectedExample];
    choices.forEach((option) => {
      const isSelected = option === choice;
      option.classList.toggle('active', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });
    showResult('', '·', 'Тексеруге дайын', 'Нәтиже осы жерде көрсетіледі.');
  });
});

runButton.addEventListener('click', () => {
  runButton.disabled = true;
  showResult('', '↻', 'Мысал тексерілуде…', 'eqeqeq ережесінің оқу симуляциясы');
  result.setAttribute('aria-busy', 'true');
  pendingAnalysis = setTimeout(() => {
    if (selectedExample === 'error') {
      showResult('error', '!', '1 қате табылды · Конвейер тоқтайды', '3:11 · eqeqeq — == орнына === қолданыңыз.');
    } else {
      showResult('success', '✓', 'Қате табылмады · Тексеру сәтті', 'eqeqeq ережесі орындалды. Мысал келесі кезеңге дайын.');
    }
    result.removeAttribute('aria-busy');
    runButton.disabled = false;
  }, 650);
});
