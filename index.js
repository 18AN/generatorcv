"use strict"
const main = document.getElementById('main');
const mainForm = document.forms.main;
const headerForm = document.forms.header;
const editForm = document.forms.edit;
const forms = document.getElementById('forms')

const nameEl = document.getElementById('name');
const yearEl = document.getElementById('year');
const telEl = document.getElementById('tel');
const emailEl = document.getElementById('email');
const imageEl = document.getElementById('image');

let errors = 0;

forms.addEventListener('focusout', focusout);
headerForm.addEventListener('submit', headerFormSubmit);
mainForm.addEventListener('submit', mainFormSubmit);
editForm.addEventListener('submit', editFormSubmit);

function focusout(event){
    errors = 0;
    if(event.target.classList.contains('text')){
        errors++;
        event.target.classList.add('error');
        if(!textIsValid(event.target.value)){
            errors--;
            event.target.classList.remove('error')
        }
    }else if(event.target.classList.contains('year')){
            errors++;
            event.target.classList.add('error');
            if(!yearIsValid(event.target.value)){
                errors--;
                event.target.classList.remove('error')
            }
    }else if(event.target.classList.contains('tel')){
            errors++;
            event.target.classList.add('error');
            if(!telIsValid(event.target.value)){
                errors--;
                event.target.classList.remove('error')
            }
    }else if(event.target.classList.contains('email')){
            errors++;
            event.target.classList.add('error');
            if(!emailIsValid(event.target.value)){
                errors--;
                event.target.classList.remove('error')
            }
    }
}

function headerFormSubmit(event){
    event.preventDefault();
    event.returnValue=false;
    if(errors==0){
        createHeader();
    }else{
        alert('Пожалуйста заполните поля формы корректно')
    }
    
    headerForm.reset();
}

function mainFormSubmit(event){
    event.preventDefault();
    event.returnValue=false;
    if(errors==0){
        new Item(mainForm.header.value, mainForm.heading.value, mainForm.value.value)
        mainForm.reset()
    }else{
        alert('Пожалуйста заполните поля формы корректно')
    }
    
}

function editFormSubmit(event){
    event.preventDefault();
    event.returnValue=false;
    if(errors==0){
        createItemField();
    }else{
        alert('Пожалуйста заполните поля формы корректно')
    }
}
function renderHeader(name,surname,patronymic,year,tel,email,file){
    nameEl.textContent = `${surname} ${name} ${patronymic}`;
    yearEl.textContent = year;
    telEl.textContent = tel;
    emailEl.textContent = email;
    let url = URL.createObjectURL(file);
    imageEl.style.cssText = `
        background-image: url('${url}');
        background-repeat: no-repeat;
        background-size: cover;
    `;
}

function createHeader(){
    const name = headerForm.name.value;
    const surname = headerForm.surname.value;
    const patronymic = headerForm.patronymic.value;
    const year = headerForm.year.value;
    const tel = headerForm.tel.value;
    const email = headerForm.email.value;
    const file = headerForm.file.files[0];
    renderHeader(name,surname,patronymic,year,tel,email,file);
}

function Item(n,h,v){
    const section = document.createElement('section');
    section.className = 'section';
    const wrapper = document.createElement('div');
    wrapper.className = 'section__wrapper';
    const container = document.createElement('div');
    container.className = 'section__container';
    const name = document.createElement('h2');
    name.textContent = n;
    const heading = document.createElement('p');
    heading.className = 'section__name';
    heading.textContent = h;
    const value = document.createElement('p');
    value.className = 'section__value'
    value.textContent = v;
    container.append(heading,value);
    wrapper.append(container);
    section.append(name,wrapper);
    main.append(section);
}

function createItemField(){
    const section = editForm.target.value;
    console.log(section)
    const targ = find(section);
    const wrapper = document.createElement('div');
    wrapper.className = 'section__description';
    const heading = document.createElement('p');
    heading.className = 'section__name';
    heading.textContent = editForm.name.value;
    const value = document.createElement('p');
    value.className = 'section__value'
    value.textContent = editForm.value.value;
    wrapper.append(heading,value)
    targ.lastElementChild.append(wrapper);
}


function find(name){
    const elements = document.getElementsByClassName('section');
    console.log(elements);
    const array = Array.from(elements);
    const target = array.find((item)=>{
        return item.firstElementChild.innerHTML == name? item : 0;
    })
    console.log(target)
    return target;
}

function textIsValid(value){
    return !/^[а-яёa-z\s]+$/i.test(value);
}

function yearIsValid(value){
    if(Number(value)>2022){
        return true
    }else{
        return !/^\d+$/.test(value)
    }
}

function emailIsValid(value){
    return !/^\w+@\w+\.\w+$/.test(value);
}

function telIsValid(value){
    return !/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/.test(value);
}