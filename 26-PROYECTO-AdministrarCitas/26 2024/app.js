const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const SintomasInput = document.querySelector("#sintomas");
const formulario = document.querySelector('#formulario-cita');
const contenedorCitas = document.querySelector('#citas');
const botonEditar = document.querySelector('.btn-editar')
const InputCita = document.querySelector('#formulario-cita input[type="submit"]')

eventListeners()

function eventListeners (){
    pacienteInput.addEventListener('input', agregandoArray);
    propietarioInput.addEventListener('input', agregandoArray);
    emailInput.addEventListener('input', agregandoArray);
    fechaInput.addEventListener('input', agregandoArray);
    SintomasInput.addEventListener('input', agregandoArray);
    formulario.addEventListener('submit', submitCita)

}

let editando = false;

const citaObj = {
    id: generarID(),
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: ""
}
class Notificacion {

    constructor({texto,tipo}){

        this.texto = texto;
        this.tipo = tipo;

        this.mostrar()

    }


    mostrar(){
        const alerta = document.createElement('div');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        alerta.textContent = this.texto

        const existe = document.querySelector('.alert')
        existe?.remove()

        //insertar
        formulario.parentElement.insertBefore(alerta, formulario)

        setTimeout(() => {

            alerta.remove()
            
        }, 2000);

        }   

}

class Admincitas{
    constructor(){
        this.citas = [];
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        this.mostrarCitasHTML()

    }

    agregar(cita){
        this.citas = [...this.citas, cita]
        this.mostrarCitasHTML()
    }

    borrarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id)
        this.mostrarCitasHTML()

    }

    mostrarCitasHTML(){

        if(this.citas.length === ''){
            contenedorCitas.innerHTML = '<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>';
            return
        }
       
        this.borrarHTML()

        

        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            //editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn-editar','py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone = structuredClone(cita)
            btnEditar.onclick = () => cargaredicion(clone)

            //borrar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'  
            btnEliminar.onclick = () => this.borrarCita(cita.id)


            const botones = document.createElement('div');
            botones.classList.add('flex', 'justify-between', 'mt-10');

            botones.appendChild(btnEditar);
            botones.appendChild(btnEliminar);


            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(botones)
            contenedorCitas.appendChild(divCita);
        });
    }
   
    borrarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)

        }
    }
}






function agregandoArray(e){
        
    citaObj[e.target.name] = e.target.value
    
}

const citas = new Admincitas()

function submitCita (e){
    e.preventDefault()


    if (Object.values(citaObj).some(valor => valor.trim() === '')){
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
    
        return   
    }

    if(editando){
        citas.editarCita({...citaObj})
        new Notificacion({
            texto: 'Guardado correctamente',
            tipo: 'exito'
        })
    }else{
        const citaObjCopy = {...citaObj};
        citas.agregar(citaObjCopy)
        new Notificacion({
            texto: 'Paciente registrado',
            tipo: 'exito'
            
        })

    

    }


    formulario.reset()
    resetobject()


    editando = false;
    InputCita.value = 'Registrar Paciente';

   

    


}


function resetobject(){

    citaObj.paciente = '',
    citaObj.propietario = '',
    citaObj.email = '',
    citaObj.fecha = '',
    citaObj.sintomas = '',
    citaObj.id = generarID()
}

function generarID(){
    return Math.random().toString(36).substring(2) + Date.now()
}


function cargaredicion(cita){
    Object.assign(citaObj, cita)

    pacienteInput.value = cita.paciente
    propietarioInput.value = cita.propietario
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    SintomasInput.value = cita.sintomas

    editando = true;

    InputCita.value = 'Guardar Cambios'

    
    
    


}

