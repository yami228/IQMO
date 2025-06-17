const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.getElementById('theme_css').href = 
        savedTheme === 'light' ? 'light_style.css' : 'style.css';
}

function switchTheme() {
    const css = document.getElementById('theme_css');
    const its_light = css.href.includes('light_style.css');
            

    css.href = its_light ? 'style.css' : 'light_style.css';
            

    localStorage.setItem('theme', its_light ? 'dark' : 'light');
}
        
let name = localStorage.getItem('username');
        
if (!name) {
    name = prompt("Как вас зовут?");
    if (name){
        localStorage.setItem('username', name);
    }
}
        
if (name) {
    document.getElementById('imya').innerHTML = `
        <h2 class = "text-privet">Привет, ${name}!</h2>
    `;
}
function changeName() {
    const newName = prompt("Введите новое имя", name);
    if (newName){
        name = newName;
        localStorage.setItem('username', name);
        document.getElementById('imya').innerHTML = `
            <h2 class = "text-privet">Привет, ${name}!</h2>
        `;
            }
}
function showResDia(message, details = '') {
    const dialog = document.createElement('div');
    dialog.className = 'result-dialog';
    dialog.innerHTML = `
        <div class="message">${message}</div>
        ${details}
        <div class="button-container">
            <button>Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(dialog);
    dialog.querySelector('button').onclick = () => dialog.remove();
}

function check() {
    const answers = [2, 1, 0, 0, 1, 0, 1, 1, 0, 1]; 
    let cnt = 0;
    let details = '';
    
    for(let i = 0; i < 10; i++) {
        const vars = document.getElementsByName("w"+(i+1));
        let is_correct = false;
        
        for(let j = 0; j < vars.length; j++) {
            if(vars[j].checked && j === answers[i]) {
                cnt++;
                is_correct = true;
                break;
            }
        }
        
        details += `
            <div class="question ${is_correct ? 'correct' : 'incorrect'}">
                Вопрос ${i+1}: ${is_correct ? '<span style="color:#28a745;">Верно</span>' : '<span style="color:#dc3545;">Неверно</span>'}
            </div>
        `;
    }
    
    localStorage.setItem('lastTestcnt', cnt);
    showResDia(`Вы набрали ${cnt} из 10!`, details);
}

function last_res() {
    const lastcnt = localStorage.getItem('lastTestcnt');
    if(lastcnt) {
        showResDia(`Ваш результат: ${lastcnt} из 10`);
    } 
    else {
        showResDia('Вы еще не проходили тест');
    }
}