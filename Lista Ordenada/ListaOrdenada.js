/* Funciones que dependen de la pagina */
var lista = new Lista();

//Funcion que añade un elemento a una lista
function addName(name,surname){ 
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

//Funcion que borra un elemento de la lista
function pollName (){
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

/* Objetos de la pagina */
function Person(name,surname){ //Creo la clase persona con sus atributos
    this.name = name; 
    this.surname = surname;
    this.fullname = function(){
        return this.name + " " + this.surname;
    }
}

function Lista(){ //Creo la clase lista con un array que se llenara de personas
    var list = [];
    var max_element_lista = 5; //Por defecto tiene 5

	//Creo un metodo que permite cambiar el maximo de elementos de la lista
	this.setMaximo = function(value) { max_element_lista = value; };

	this.isEmpty = function(){ //Funcion que comprueba si la lista esta vacia
		return (list.length === 0); 
	};

	this.isFull = function (){ //Funcion que comprueba si la lista ha llegado al maximo de elementos
		return (list.length === max_element_lista);
	};
	
	this.size = function(){ //Funcion que devuelve la longitud del array
		return list.length;
    };

    //Funcion que añade un nuevo elemento a la lista manteniendo la relación de orden.
    //Devuelve el tamaño de la lista una vez añadido.
    this.add = function(objPerson){
        if(!this.isFull()){ //Si la lista no esta llena
            if(this.isEmpty()){ //Si la lista esta vacia añado el primer elemento
                list.unshift(objPerson);
            }else{ //buscamos el indice con un valor mayor superior al dado
                var mayor = -1;
                var index = 0;
                var length = this.size();

                while(mayor == -1 && index < length ){ 
                   //Si el apellido es menor aumento el index
                    if((list[index].surname).localeCompare(objPerson.surname) == -1){
						index++;
						//Si son iguales los apellidos busco por el nombre y lo mismo que antes
                    }else if ((list[index].surname).localeCompare(objPerson.surname) == 0){
                        if((list[index].name).localeCompare(objPerson.name) == -1){
                            index++;
                        }else{
                            mayor = index;
                        }    
                    }else{
                        mayor = index;
                    }  
                }
                //sustituimos el indice con el nuevo valor
                list.splice(index,0,objPerson);
            }
        }else{ //La exepcion
			throw "La lista esta llena. No puedes poner elementos sobre ella";
		}
        //devolvemos 
        return this.size();
    }

    this.get = function(index){ //Funcion que devuelve una persona en la posicion deseada
		if(index > this.size() || index <= -1){ //Si la posicion es mayor que la longitud del array mando una exepcion
			throw "El indice esta fuera de los limites de la lista";
		}else{ //Sino devuelvo la persona de la posicion deseada
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
        list.add(per5);
		list.add(per6); //Para que genere una exepcion
	} catch (err) {
		console.log("Intento añadir una 6 persona: " + err);
	}

	console.log ("La lista llena: " + list.toString());
	console.log ("Quiero conseguir el numero de la posicion 3: " + list.get(3));

	console.log ("Esta "+ per1.fullname() + " en la lista: " + list.indexOf(per1));	 	

	console.log ("El primer elemento de la lista: " + list.firstElement());
	console.log ("El ultimo elemento de la lista: " + list.lastElement());

	//clear(list);
	
	console.log ("Voy a borrar a " + per3.fullname() + ": "+ list.removeElement(per3));
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