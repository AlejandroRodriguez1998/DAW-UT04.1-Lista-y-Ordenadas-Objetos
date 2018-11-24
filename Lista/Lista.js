"use strict";

/* Funciones que dependen de la pagina */
var lista = new Lista();

function addNumber(name,surname){ //Funcion que recoge el numero en el HTML y añadé el numero
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
        var person = new Person(name,surname);
	 	lista.add(person);
	 	list.innerHTML = lista.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}	
}

function pollNumber (){ //Funcion que borra un numero
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	list.innerHTML = "";  
 	try {
		lista.remove(lista.size()-1);
	 	list.innerHTML = lista.toString();
 	} catch (err) {
 		error.innerHTML = err;
 	}		
}

/* Objectos de la pagina */

//Objecto errores

function BaseException() {}
BaseException.prototype = new Error(); //Herencia del objeto Error.
BaseException.prototype.constructor = BaseException; //Definimos el constructor
BaseException.prototype.toString = function(){
	return this.name + ": " + this.message;
};

function NotPersonException(value) {
	this.name = "NotPersonException";
	this.message = "No es un objecto persona: " + value;
}
NotPersonException.prototype = new BaseException(); //Heredamos de BaseException
NotPersonException.prototype.constructor = NotPersonException;

function IsFull(){
	this.name = "IsFull";
	this.message = "La lista esta llena. Tú no puedes añadir más elementos";
}
IsFull.prototype = new BaseException();
IsFull.prototype.constructor = IsFull;

var InputValidator = (function(){ // Función anónima que se ejecuta según se define.
	var InputValidator = {}; //Creamos un objeto vacío

	//Definimos el método validate para el objeto.
	InputValidator.validate = function(data){ 
		var validations = [validateNotPerson,validateIsFull]; //Creamos un array con las funciones de validación
		for(let validation of validations){
			try {
				validation(data); //Ejecutamos cada función de validación.
			}
			catch (e) {
				if (e instanceof NotPersonException) {
					throw e; 
				}				
				else if (e instanceof IsFull) { //Recogemos la excepción NegativeNumberException si se ha producido
					//re-throw
					throw e;
				}
			}
		}
	};
	return InputValidator; //La función anónima devuelve el objeto creado.

	//Función que valida si el dato es negativo.
	function validateNotPerson(data){
		if(!(elem instanceof Person)){
			throw new NotPersonException(data);
		}
	}

	//Función que valida si el dato es vacío
	function validateIsFull(obj){
		if (obj.isFull()){ //Compruebo si la lista esta llena, si lo esta mando una expecion
			throw new IsFull();
		 } 
	}
})();

//Objecto Persona

function Person(name, surname) {
	this.name = name; 
	this.surname = surname; 
	this.fullname = function(){
		return this.name + " " + this.surname;
	}
}

//Objecto lista

function Lista() {
	var list = [];
	var max_element_lista = 5;

	this.setMaximo = function(value) { max_element_lista = value; };

	this.isEmpty = function(){
		return (list.length === 0); 
	};

	this.isFull = function (){ //Funcion que comprueba si el array ha llegado al maximo de elementos
		return (list.length === max_element_lista);
	};
	
	this.size = function(){ //Funcion que devuelve la longitud del array
		return list.length;
    };

	this.add = function(elem){ //Funcion que añade un numero a la lista
		InputValidator.validate(elem);
		InputValidator.validate(this);
		
		list.push(elem);
		return this.size(); //Devuelvo la longitud del array
	};

	this.addAt = function(elem,index){ //Funcion que añade un numero a la posicion deseada
		InputValidator.validate(elem);
		InputValidator.validate(this);
		if(index > this.size() || index <= -1){
			throw "El indice esta fuera de los limites de la lista";
		}else { //Si la lista sigue teniendo capacidad, hago un splice que añadirá 
				//el numero al posicion deseada de la lista
			list.splice(index, 0, elem);
		}
		return this.size(); //Devuelvo la longitud del array
	};

	this.get = function(index){ //Funcion que devuelve un numero en la posicion deseada
		if(index > this.size() || index <= -1){ //Si la posicion es mayor que la longitud del array mando una exepcion
			throw "El indice esta fuera de los limites de la lista";
		}else{ //Sino devuelvo el numero de la posicion deseada
			return list[index].fullname();
		}
	};

	this.toString = function(){ //Funcion que convierte el array a un formato especifico
		var str = "";
		if (!this.isEmpty()){ //Compruebo que el array NO esta vacio 
			var length = this.size(); //Obtengo la longitud del array con la funcion size
			//Con el for voy recorriendo el array para meterlo en una variable aux y darle el formato
			for (var i=0; i<length-1;i++){
				str = str + list[i].fullname() + " - ";
			}	 		 		
			str = str + list[i].fullname(); //Recojo el ultimo valor del array
		} 	
		return str; //Devuelvo el array con formato siendo String
	};

	this.indexOf = function(elem){ //Funcion que devuelve la posicion de un elemento 
		var position = -1; //Pongo a no encontrado el elemento
		if(!(elem instanceof Person)){
			throw "El elemento no es un objecto persona";
		} else{ //SI es un numero...
			if (!this.isEmpty()){ //Compruebo si la lista NO esta vacia
				position = list.indexOf(elem); //Recojo la posicion
			} 
		}
		return position; //La devuelvo
	};

	this.lastIndexOf = function(elem){ //Funcion que devuelve la posicion de un elemento EMPEZANDO por el final
		var position = -1; //Pongo a no encontrado el elemento
		if(!(elem instanceof Person)){
			throw "El elemento no es un objecto persona";
		} else{ //SI es un numero...
			if (!this.isEmpty()){ //Compruebo si la lista NO esta vacia
				position = list.lastIndexOf(elem); //Recojo la posicion
			} 
		}
		return position; //La devuelvo
	};

	this.capacity = function(){ //Funcion que devuelve la capacidad de la lista
		return max_element_lista;
	}; 

	this.clear = function(){ //Funcion que borra el array
		if (!this.isEmpty()){
			list.splice(0, list.length);	 		 		
		} 	
	};
	
	this.firstElement = function(){ //Funcion que devuelve la primera posicion
		var first;
		if (this.isEmpty()){ //Compruebo que la lista no esta vacia, si lo esta devuelvo una exepcion
			throw "La lista esta vacia."; 		
		} else {
			first = list[0].fullname();
		}
		return first;
	};
	
	this.lastElement = function(){ //Funcion que devuelve la ultima posicion
		var last;
		if (this.isEmpty()){ //Compruebo que la lista no esta vacia, si lo esta devuelvo una exepcion
			throw "La lista esta vacia.";			
		} else {
			last = list[list.length-1].fullname();
		}
		return last;
	};
	
	this.remove = function (index){ //Funcion que elimina un elemento desde la posicion
		var person;
		if(index > this.size() || index <= -1){ //Si la posicion es mayor que la longitud del array mando una exepcion
			throw "El indice esta fuera de los limites de la lista";
		}else{ //Sino devuelvo el numero de la posicion deseada
			person = list.splice(index,1);
		}
		return person[0].fullname(); //Devuelvo el numero borrado
	};
	
	this.removeElement = function (elem){ //Funcion que elemina un elemento buscandolo
		var comprobacion = false;
		
		if(!(elem instanceof Person)){
			throw "El elemento no es un objecto persona";
		} else{ //SI es un numero...
			var posicion = this.indexOf(elem); //Recojo la posicion donde esta el numero
	
			if(posicion != -1){ //Si el numero es distinto de -1 significa que lo ha encontrado
				list.splice(posicion,1); //Lo borro
				comprobacion = true; //Cambio a true porque lo he encontrado
			}
		}
		return comprobacion;
	};
	
	this.set = function (elem,index){ //Funcion que remplaza un elemento por otro mediante la posicion
		var person;
		
		if(!(elem instanceof Person)){
			throw "El elemento no es un objecto persona";
		} else{ //SI es un numero...
			if(index > this.size() || index <= -1){ //Compruebo que el indice no sea mayor que la longitud del array
				throw "El indice esta fuera de los limites de la lista";
			}else{ //Si es menor remplazo
				person = this.get(index);
				list.splice(index, 1, elem);
			}
		}
	
		return person; //Devuelvo el numero remplazado
	};
}

function testlist(){
	var list = new Lista();
	var per1 = new Person("Pedro","Rodriguez");
	var per2 = new Person("Juan","Garcia");
	var per3 = new Person("Paula","Perez");
	var per4 = new Person("Laura","Garcia");
	var per5 = new Person("Alex","Rodriguez");
	var per6 = new Person("Persona","Seis");

	console.log ("Capacidad: " + list.capacity());
	console.log("Es vacía: " + list.isEmpty());
	console.log("Longitud: " + list.size());

	try {
		list.add(per1);
		list.add(per2);
		list.add(per3);
		list.add(per4);
		list.addAt(per5,2);
		console.log("Añado la persona "+ per5.fullname()+ " en la posicion 2");
		list.add(per6); //Para que genere una exepcion
	} catch (err) {
		console.log("Intento añadir una 6 persona: " + err);
	}

	console.log ("La lista llena: " + list.toString());
	console.log ("Quiero conseguir el numero de la posicion 3: " + list.get(3));

	console.log ("Esta "+ per1.fullname() + " en la lista: " + list.indexOf(per1));	 	
	console.log ("Esta "+ per6.fullname() + " en la lista: " + list.lastIndexOf(per6));

	console.log ("El primer elemento de la lista: " + list.firstElement());
	console.log ("El ultimo elemento de la lista: " + list.lastElement());

	//clear(list);
	
	console.log ("Voy a borrar a " + per3.fullname() + ": "+ list.removeElement(per3));
	console.log ("Voy a poner "+ per6.fullname() +" por: " + list.set(per6,0));
	console.log ("La lista llena: " + list.toString());

	try {
		var i = list.size() - 1;
		while (true){
			console.log ("Elemento borrado: " + list.remove(i));
			console.log ("La lista: " + list.toString(list));
			i--;		 	
		}
	} catch (err) {
		console.log(err); //Cuando la lista este vacia, una exception sera capturada.
	}
} 
window.onload = testlist;