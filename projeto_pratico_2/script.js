const form = document.querySelector("#form")
const nameInput = document.querySelector("#name")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const jobSeletec = document.querySelector("#job")
const modalAlert = document.querySelector("#modalAlert")
const errorTextAlert = document.querySelector(".erroText")
const btnAlertClose = document.querySelector(".btn-close")
const modalContainer = document.querySelector(".modalContainer")

let errors = []

function handleModal(errorArray) {

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


form.addEventListener('submit', (event) => {
    event.preventDefault(); 

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
    if(passwordInput.value === '') {
        errors.push('O campo senha não pode ser vazio')
    }

    if(errors.length != 0) {
        handleModal(errors)
        return console.log(errors)
    }

    form.submit()
})