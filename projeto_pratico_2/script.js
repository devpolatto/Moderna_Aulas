const form = document.querySelector("#form")
const nameInput = document.querySelector("#name")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const jobSeletec = document.querySelector("#job")
const modalAlert = document.querySelector("#modalAlert")
const errorTextAlert = document.querySelector(".erroText")
const btnAlertClose = document.querySelector(".btn-alert-close")
const modalContainer = document.querySelector(".modalContainer")

// btnAlertClose.addEventListener('click', () => {
//     modalAlert.style.display = "none"
// })

let erros = []

function handleModal(errorArray) {
    modalAlert.style.display = "block"

    errorArray.forEach(erro => {
        modalContainer.innerHTML += `<p class="erroText">${erro}</p>`
    })

    erros = []

    setTimeout(() => {
        modalAlert.style.display = "none"
    }, 3000)
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    // checa se os inputs estao vazios

    if(nameInput.value === '') {
        erros.push('O campo nome não pode ser vazio')
    }
    if(emailInput.value === '') {
        erros.push('O campo email não pode ser vazio')
    }
    if(passwordInput.value === '') {
        erros.push('O campo senha não pode ser vazio')
    }

    if(erros.length != 0) {
        handleModal(erros)
        erros = ['']
        return console.log(erros)
    }

    form.submit()
})