const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const SintomasInput = document.querySelector("#sintomas");


const citaObj = {
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: ""
}


eventListeners()

function eventListeners (){
    pacienteInput.addEventListener('input', agregandoArray);


}


function agregandoArray(){
    console.log('agregando')
}
