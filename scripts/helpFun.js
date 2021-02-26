//формирует первоначальный массив чисел
function setFirstArrayOfFields() {

	window.fields = [];
	let field;
	let aP, bP, cP, dP;
	for (let i = 123; i <10000; i++) {
		field = i + '';
		
		if(field.length < 4 ){
			field = '0' + field;
		}
		
		aP=field.charAt(0);
		bP=field.charAt(1);
		cP=field.charAt(2);
		dP=field.charAt(3);

		if( aP!=bP && aP!=cP && aP!=dP && bP!=cP && bP!=dP && cP!=dP){
			window.fields.push(field);
		}
	}

	document.getElementById('fields').innerHTML = window.fields;
	document.getElementById('numOfFields').innerHTML = window.fields.length;
}

function getChances(){
	let field = document.getElementById('field').value;
	let bulls = document.getElementById('bulls').value;
	let cows = document.getElementById('cows').value;
	let checked = window.fields;

	for (let i = 0; i < checked.length; i++) {
		if (checkBullsAndCowsForEx(field, checked[i], bulls, cows)){
			checked.splice(i, 1);
			i--;
		}
	}

	window.fields = checked;
	document.getElementById('fields').innerHTML = checked;
	document.getElementById('numOfFields').innerHTML = checked.length;
	displayChances();
}

function displayChances(){
	let chancesArr = [[],[],[],[]];
	let checked = window.fields;
	let numOfFields = window.fields.length;

	//задаем длину массива и заполняем его нулями
	for (let i = 0; i < 4; i++) {
		chancesArr[i].length = 10;
		for (let j = 0; j < 10; j++) {
			chancesArr[i][j] = 0;
		}
	}	

	//заполняем массив количествами совпадений
	for (let i = 0; i < checked.length; i++) {
		for (let j = 0; j < 4; j++) {
			chancesArr[j][checked[i].charAt(j)] += 1;
		}
	}
	
	//выражаем количества совпадений в процентные соотношения
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 10; j++) {
			chancesArr[i][j] = chancesArr[i][j]*100/numOfFields;
		}
	}	

	//проставляем процентные соотношения в таблицу
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 10; j++) {
			((document.getElementById('Place' + i)).getElementsByClassName('st' + j))[0].innerHTML = Math.round(chancesArr[i][j]*100)/100;
		}
	}

	//суммируем шансы полей в общий шанс числа
	for (let i = 0; i < 10; i++) {
		let sumChance = 0;
		for (var j = 0; j < 4; j++) {
			sumChance += chancesArr[j][i];
		}
		(document.getElementsByClassName('sumChances'))[i].innerHTML = Math.round(sumChance*100)/100;
	}
}

//проверяет поле на подходимость под параметры bulls & cows
function checkBullsAndCowsForEx(field, checked, bulls, cows){
	let count = 0;
	let bullsCount = 0;
	for (let l = 0; l < 4; l++) {
		if (checked.includes(field.charAt(l))) {
			count++;
		}
		if (checked.charAt(l) == field.charAt(l)) {
			bullsCount++;
		}
	}

	if ((count != (Number(bulls) + Number(cows))) || (bullsCount != Number(bulls))){
		return true;
	} else{
		return false;
	}
}

// function check(){