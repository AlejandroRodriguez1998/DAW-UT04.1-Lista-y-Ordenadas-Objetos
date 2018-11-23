"use strict";

/* Funciones que dependen de la pagina */
function Person(name, surname) {
	this.name = name; 
	this.surname = surname; 
}

function Lista() {
	var list = [];
	var max_element_lista = 5;
  
	this.getArray = function() { return list; };

	this.setMaximo = function(value) { max_element_lista = value; };
	this.getMaximo = function() { return max_element_lista; };

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
		if(!(elem instanceof Person)){
			throw "El elemento no es un objecto persona";
		}
		if (this.isFull()){ //Compruebo si la lista esta llena, si lo esta mando una expecion
		   throw "La lista esta llena. Tú no puedes añadir más elementos";
		} else { //Si la lista sigue teniendo capacidad, hago un push que añadirá el numero al final de la lista
			list.push(elem);
		}
		return this.size(); //Devuelvo la longitud del array
	};

	this.addAt = function(elem,index){ //Funcion que añade un numero a la posicion deseada
		if(!(elem instanceof Person)){
			throw "El elemento no es un objecto persona";
		}
		if (this.isFull()){ //Compruebo si la lista esta llena, si lo esta mando una expecion
		   throw "La lista esta llena. Tú no puedes añadir más elementos";
		} 
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
			return list[index];
		}
	};

	this.toString = function(){ //Funcion que convierte el array a un formato especifico
		var array = list.getArray();
	
		array.forEach(function(valor){
			return valor.name +" "+ valor.surname + " - ";
		})
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

	this.lastIndexOf = function lastIndexOf(elem){ //Funcion que devuelve la posicion de un elemento EMPEZANDO por el final
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
			first = list[0];
		}
		return first;
	};
	
	this.lastElement = function(){ //Funcion que devuelve la ultima posicion
		var last;
		if (this.isEmpty()){ //Compruebo que la lista no esta vacia, si lo esta devuelvo una exepcion
			throw "La lista esta vacia.";			
		} else {
			last = list[list.length-1];
		}
		return last;
	};
	
	this.remove = function (index){ //Funcion que elimina un elemento desde la posicion
		var num;
		if(index > this.size() || index <= -1){ //Si la posicion es mayor que la longitud del array mando una exepcion
			throw "El indice esta fuera de los limites de la lista";
		}else{ //Sino devuelvo el numero de la posicion deseada
			num = list.splice(index,1);
		}
		return num; //Devuelvo el numero borrado
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
		var num;
		
		if(!(elem instanceof Person)){
			throw "El elemento no es un objecto persona";
		} else{ //SI es un numero...
			if(index > this.size() || index <= -1){ //Compruebo que el indice no sea mayor que la longitud del array
				throw "El indice esta fuera de los limites de la lista";
			}else{ //Si es menor remplazo
				num = this.get(index);
				list.splice(index, 1, elem);
			}
		}
	
		return num; //Devuelvo el numero remplazado
	};
}


function test(){
	var per1 = new Person("Pedro","Rodriguez");
	var per2 = new Person("Juan","Garcia");
	var per3 = new Person("Paula","Perez");

	var list = new Lista();

	list.add(per1);
	list.add(per2);
	list.add(per3);
	console.log(list.getArray());
	console.log(list.isEmpty());
}
window.onload = test;

function cleanData(){ //Funcion que hará que cada que pulse el boton añadir limpia el input
    document.getElementById ("name").value = "" ;
    document.getElementById ("surname").value = "" ;  
}

var lista = new Lista();

function addNumber(name,surname){ //Funcion que recoge el numero en el HTML y añadé el numero
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	error.innerHTML = "";  
 	try {
		
        var person = new Person(name,surname);
	 	add(lista,person);
	 	list.innerHTML = toString(lista);
 	} catch (err) {
 		error.innerHTML = err;
 	}	
}

function pollNumber (){ //Funcion que borra un numero
	var error = document.getElementById ("error");
	var list = document.getElementById ("list");
	list.innerHTML = "";  
 	try {
		remove(num_lista,size(num_lista)-1);
	 	list.innerHTML = toString(num_lista);
 	} catch (err) {
 		error.innerHTML = err;
 	}		
}

/*function testlist(){
	//var list = create (); 	
	var list=[]; 	
	console.log ("Capacidad: " + capacity(list));
	console.log("Es vacía: " + isEmpty(list));
	console.log("Longitud: " + size(list));

	try {
		for (var i=0; i < 4; i++){
			console.log("Nº de elementos: " + add(list,i*10));
		}
		addAt(list,50,2);
		console.log("Añado el 50 en la posicion 2");
		add(list,i); //Para que genere una exepcion
	} catch (err) {
		console.log(err);
	}

	console.log ("La lista llena: " + toString(list));
	console.log ("Quiero conseguir el numero de la posicion 3: " + get(list,3));

	console.log ("Esta 50 en la lista: " + indexOf(list,50));	 	
	console.log ("Esta -50 en la lista: " + lastIndexOf(list,-50));

	console.log ("El primer elemento de la lista: " + firstElement(list));
	console.log ("El ultimo elemento de la lista: " + lastElement(list));

	//clear(list);

	console.log ("Voy a borrar el 40: " + removeElement(list,40));
	console.log ("Voy a poner 40 por el: " +set(list,40,2));
	console.log ("La lista llena: " + toString(list));

	try {
		var i = size(list) - 1;
		while (true){
			console.log ("Elemento borrado: " + remove(list,i));
			console.log ("La lista: " + toString(list));
			i--;		 	
		}
	} catch (err) {
		console.log(err); //Cuando la lista este vacia, una exception sera capturada.
	}
} 
window.onload = testlist;**/