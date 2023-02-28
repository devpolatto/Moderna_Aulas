const form = document.querySelector("#form")
const nameInput = document.querySelector("#name")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const jobSeletec = document.querySelector("#job")
const modalAlert = document.querySelector("#modalAlert")
const errorTextAlert = document.querySelector(".erroText")
const btnAlertClose = document.querySelector(".btn-close")
const modalContainer = document.querySelector(".modalContainer")
const modalUserCreated = document.querySelector("#modalUserCreated")

let errors = []

function hanldeModalSuccess(data = new Object()) {
    modalUserCreated.style.display = "flex"

    modalUserCreated.innerHTML += `
        <div class="title">
            <svg xmlns="http://www.w3.org/2000/svg" class="title-svh-checked" viewBox="0 0 512 512">
                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
            </svg>
            <h1>Dados Registrados</h1>
        </div>
        <div class="data">
            {
            <code>nome:${data.name}</code>
            <code>email:${data.email}</code>
            <code>senha:${data.senha}</code>
            }
        </div>
    `

    if(modalUserCreated.style.display === 'flex') {
        setTimeout(() => {
            modalUserCreated.style.display = "none"
        }, 5000)
    }
}

function handleModalErrors(errorArray) {
    modalAlert.style.display = "flex"

    errorArray.map(erro => {
        modalAlert.innerHTML += `
        <div class="modalContainer">
            <p class="erroText">${erro}</p>
        </div>
        `
    })

    if(document.querySelectorAll(".modalContainer").length > 0) {
        setTimeout(() => {
            modalAlert.style.display = "none"
        }, 5000)
    }
}

function emailValidate(email) {
    // regex - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions

    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9._-]+\.[a-zA-z]{2,}$/
    )

    if(emailRegex.test(email)) {
        return true
    } else {
        return false
    }
}

function passwordValidate(password, maxCharacters){
    let passwordErrors = []

    if(password === ''){
        passwordErrors.push('O campo senha não pode ser vazio')
    }

    if(password.length < maxCharacters && password != '') {
        passwordErrors.push('Senha fraca')
    }

    if(passwordErrors.length != 0) {
        return passwordErrors
    } else {
        return true
    }

}


form.addEventListener('submit', (event) => {
    event.preventDefault(); // evita o envio quando o submite for acionado. Assim pode-se realizar as valdacoes

    const modalContainerArray = document.querySelectorAll(".modalContainer")

    if(errors.length > 0 && modalContainerArray.length > 0) {
        errors = []
        modalContainerArray.forEach.call( modalContainerArray, function(node) {
            node.parentNode.removeChild(node);
        });
    }

    // checa se os inputs estao vazios

    if(nameInput.value === '') {
        errors.push('O campo nome não pode ser vazio')
    }

    if(emailInput.value === '') {
        errors.push('O campo email não pode ser vazio')
    }


    // valida senha
    const passwordValidateResult = passwordValidate(passwordInput.value, 5)

    if(passwordValidateResult != true){
        errors.push(passwordValidateResult)
    }

    // valida o email 
    if(!emailValidate(emailInput.value)){
        const emailInputExist = errors.find(index => index === 'O campo email não pode ser vazio')
        
        if(!emailInputExist) {
            errors.push('O campo email está incorreto')
        }
    }

    if(errors.length != 0) {
        handleModalErrors(errors)
        return console.log(errors)
    }

    hanldeModalSuccess({
        name: nameInput.value,
        email: emailInput.value,
        senha: passwordInput.value
    })
})