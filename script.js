let pfHeaderImgUrl = '';
let pfHeaderTagline = '';
let pfdisableClickToDel = 1;
let pfHideImages = 0;
let pfImageDisplayStyle = 'left';
let pfDisablePDF = 0;
let pfDisableEmail = 0;
let pfDisablePrint = 0;
let pfCustomCSS = '';
let pfEncodeImages = 0;
let pfShowHiddenContent = 0;
let pfBtVersion='2';

(function(){
    let js, 
        pf;
    pf=document.createElement('script');
    pf.type='text/javascript';
    pf.src='//cdn.printfriendly.com/printfriendly.js';
    document.getElementsByTagName('head')[0].appendChild(pf);
})();

const engWord = document.getElementById('eng'),
      rusWord = document.getElementById('rus'),
      inputs = document.getElementsByClassName('input'),
      addButton = document.getElementById('add-word-btn'),
      table = document.getElementById('table');


let words;
let btnsDelete;


localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));


const addWordToTable = index => {
    table.innerHTML += `
        <tr class="tr">
            <td class='eng-word'>
                ${words[index].english}
            </td>
            <td class='eng-word'>
                -
            </td>
            <td class='rus-word'>
                ${words[index].russian}
            </td>
            <td>
                <button class="btn-delete"></button>
            </td>
        </tr>
    `;
};

words.forEach((element, i) => {
    addWordToTable(i);
});

addButton.addEventListener('click', () => {
    if(
        engWord.value.lenth < 1 || 
        rusWord.value.lenth < 1 || 
        !isNaN(engWord.value) ||
        !isNaN(rusWord.value)
    ){
        for(let key of inputs) {
            key.classList.add('error');
        } 
    } else {    
        for(let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new CreateWord(engWord.value, rusWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        engWord.value = null;
        rusWord.value = null;
    }
});

function CreateWord(english, russian){
    this.english = english;
    this.russian = russian;
}

const deleteWord = e => {
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
};

const addEventDelete = () => {
    if(words.length > 0) {
        btnsDelete = document.querySelectorAll('.btn-delete');
        for (let btn of btnsDelete) {
            btn.addEventListener('click', e => {
                deleteWord(e);
            });
        }
    }
};

addEventDelete();



