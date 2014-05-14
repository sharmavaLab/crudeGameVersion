var map = new Object();
var unknownChar = "-";
function HangmanData() {
	this.question = new Array();
	this.answer = new Array();
	this.AnswerArray = new Array();
	this.CurrAnswer = new Array();
	this.quesDisplay = new Array();
	this.count = 0;
	this.remainingAttempts = 6;
}
function chkAnswer(OuterDiv) {
	var Hdata2 = map[OuterDiv];
	for (var i = 0; i < Hdata2.AnswerArray.length; i++) {
		if (Hdata2.AnswerArray[i] != Hdata2.CurrAnswer[i]) {
			return false;
		}
	}
	return true;
}
function createProblemDiv(OuterDiv, showQuestion, showAnswer) {
	var Hdata = map[OuterDiv];
	Hdata.remainingAttempts =6;
	var outerDivObj = document.getElementById(OuterDiv);
	var ProblemDiv = document.createElement("div");
	ProblemDiv.className = 'container2';
	ProblemDiv.id = OuterDiv + "div_problem";

	var QuestionLabel = document.createElement("label");
	QuestionLabel.id = OuterDiv + "lb_Question";
	QuestionLabel.innerHTML = showQuestion;
	ProblemDiv.appendChild(QuestionLabel);

	var br = document.createElement('br');
	ProblemDiv.appendChild(br);

	var AnswerArray = new Array(showAnswer.length);
	var CurrAnswer = new Array(showAnswer.length);
	for (var i = 0; i < AnswerArray.length; i++) {
		if ((showAnswer.charCodeAt(i) >= 65 && showAnswer.charCodeAt(i) <= 90)
				|| (showAnswer.charCodeAt(i) >= 97 && showAnswer.charCodeAt(i) <= 122)
				|| (showAnswer.charCodeAt(i) >= 48 && showAnswer.charCodeAt(i) <= 57)) {
			AnswerArray[i] = showAnswer.charAt(i);
			CurrAnswer[i] = unknownChar;
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(unknownChar);
			thelabel.appendChild(textNode);
			thelabel.id = OuterDiv + "lb_answer" + i;
			thelabel.value = i;
			ProblemDiv.appendChild(thelabel);
		} else {
			AnswerArray[i] = showAnswer.charAt(i);
			CurrAnswer[i] = showAnswer.charAt(i);
			var thelabel = document.createElement("label");
			var textNode = document.createTextNode(AnswerArray[i]);
			thelabel.appendChild(textNode);
			thelabel.id = OuterDiv + "lb_answer" + i;
			thelabel.value = i;
			ProblemDiv.appendChild(thelabel);
		}
	}
	outerDivObj.appendChild(ProblemDiv);
	Hdata.AnswerArray = AnswerArray;
	Hdata.CurrAnswer = CurrAnswer;
	map[OuterDiv] = Hdata;
}
function createSolveDiv(OuterDiv){
	var outerDivObj = document.getElementById(OuterDiv);
	var SolveDiv = document.createElement("div");

	SolveDiv.className = 'container4';
	SolveDiv.id = OuterDiv + "div_solve";
	for(var i = 65;i<=90;i++){
		var thelabel = document.createElement("label");
		var textNode = document.createTextNode(String.fromCharCode(i));
		thelabel.appendChild(textNode);
		thelabel.id = OuterDiv + "lb_solve" + i;
		thelabel.value = String.fromCharCode(i);
		thelabel.className = 'labelcolor1';
		thelabel.onclick = function() {
			var bool = false;
			var correct = false;
			var Hdata = map[OuterDiv];
			var str = this.value;
			var str2 = String.fromCharCode(str.charCodeAt(0) + 32);
			for(var i = 0;i<Hdata.AnswerArray.length;i++){
				//alert(Hdata.AnswerArray[i]);
				if(Hdata.AnswerArray[i] == str){
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str;
					this.className = 'labelcolor3';
					bool = true;
					correct = true;
					map[OuterDiv] = Hdata;
					if (chkAnswer(OuterDiv)) {
						//alert("You did it!!!");
							callFunction(outerDiv);
							
						//callFunction(OuterDiv);
						return;
					}

				} else if (Hdata.AnswerArray[i] == str2) {
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str2);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str2;
					this.className = 'labelcolor3';
					bool = true;
					correct = true;
					map[OuterDiv] = Hdata;
					if (chkAnswer(OuterDiv)) {
						// alert("You did it!!!");
						setTimeout(callFunction(OuterDiv),2000);
						return;
					}
				} else {
					if (!bool)
						this.className = 'labelcolor2';
				}
			}
			if(!correct){
				Hdata.remainingAttempts -= 1;
				map[OuterDiv] = Hdata;
				refreshImage(OuterDiv);
				if(Hdata.remainingAttempts == 0){
					alert("Game Over");
					return;
				}
			}
this.onclick = function(){
				
			}
		}
		SolveDiv.appendChild(thelabel);
		var space = document.createElement("label");
		var spaceNode = document.createTextNode(" ");
		space.appendChild(spaceNode);
		SolveDiv.appendChild(space);
	}
	var br = document.createElement('br');
	SolveDiv.appendChild(br);
	for(var i = 48;i<=57;i++){
		var thelabel = document.createElement("label");
		var textNode = document.createTextNode(String.fromCharCode(i));
		thelabel.appendChild(textNode);
		thelabel.id = OuterDiv + "lb_solve" + i;
		thelabel.value = String.fromCharCode(i);
		thelabel.className = 'labelcolor1';
		thelabel.onclick = function() {
			var correct = false;
			var bool = false;
			var Hdata = map[OuterDiv];
			var str = this.value;
			for(var i = 0;i<Hdata.AnswerArray.length;i++){
				if(Hdata.AnswerArray[i] == str){
					var a = document.getElementById(OuterDiv + "lb_answer" + i);
					var newChild = document.createTextNode(str);
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					Hdata.CurrAnswer[i] = str;
					this.className = 'labelcolor3';
					correct = true;
					bool = true;
					map[OuterDiv] = Hdata;
					if (chkAnswer(OuterDiv)) {
						// alert("you did it!!");
						callFunction(OuterDiv);
						return;
					}
				} else {
					if (!bool)
						this.className = 'labelcolor2';
				}
			}
			if(!correct){
				Hdata.remainingAttempts -= 1;
				map[OuterDiv] = Hdata;
				refreshImage(OuterDiv);
				if(Hdata.remainingAttempts == 0){
					alert("Game Over");
					return;
				}
			}
			this.onclick = function(){
				
			}
		}
		SolveDiv.appendChild(thelabel);
		var space = document.createElement("label");
		var spaceNode = document.createTextNode(" ");
		space.appendChild(spaceNode);
		SolveDiv.appendChild(space);
	}
	outerDivObj.appendChild(SolveDiv);
}
function createImageDiv(OuterDiv){
	//var Hdata = map[OuterDiv];
	var outerDivObj = document.getElementById(OuterDiv);
	var ImageDiv = document.createElement("div");
	ImageDiv.className = 'container1';
	ImageDiv.id = OuterDiv + "div_image";
	outerDivObj.appendChild(ImageDiv);
	//map[OuterDiv] = Hdata;
}
function refreshImage(OuterDiv){
	var Hdata = map[OuterDiv];
	var imgNo = 7 - Hdata.remainingAttempts;
	var elem = document.createElement("img");
	elem.setAttribute("src", "images/hang_" + imgNo + ".gif");
	elem.setAttribute("height", "100");
	elem.setAttribute("width", "100");
	var imgDiv = document.getElementById(OuterDiv + "div_image");
	while( imgDiv.hasChildNodes() ){
		imgDiv.removeChild(imgDiv.lastChild);
	}
	imgDiv.appendChild(elem);
}

function createPuzzles(OuterDiv,Question,Answer,gameProgress){

	//map[OuterDiv] = new HangmanData();
	var OuterDivObj = document.getElementById(OuterDiv);
	while( OuterDivObj.hasChildNodes() ){
		OuterDivObj.removeChild(OuterDivObj.lastChild);
	}
	createImageDiv(OuterDiv);
	if(map[OuterDiv].count>1){
		createStatusDiv(OuterDiv,gameProgress);
	}
	createProblemDiv(OuterDiv,Question,Answer);
	createSolveDiv(OuterDiv);
		
	
	createTextBox(OuterDiv);
	refreshImage(OuterDiv);
	

}
function hangmanApp(div_id, questions, answers, count) {
	ques = questions.split("\n");
	ans = answers.split("\n");
	quesCount = ques.length;
	ansCount = ans.length;
	map[div_id] = new HangmanData();
	var setData = map[div_id];
	setData.count = count;
	var i = 0;
	while (i != ansCount) {
		// setData.count = ansCount;
		if (i >= (quesCount - 1)) {
			setData.question[i] = ques[quesCount - 1];
		} else {
			setData.question[i] = ques[i];
		}
		setData.answer[i] = ans[i];
		i++;
	}
	if (count > ansCount) {
		// setData.count = count;
		while (i != count) {
			randomPicker = Math.floor((Math.random() * (ansCount)));
			setData.question[i] = ques[randomPicker];
			setData.answer[i] = ans[randomPicker];
			i++;
		}
	}

	/*
	 * alert(setData.question); alert(setData.answer);
	 */
	generateHangman(div_id);
}
function generateHangman(div_id) {
	map[div_id].quesDisplay = new Array(map[div_id].count);
	for (var i = 0; i < map[div_id].count; i++) {
		do {
			unique = 1;
			next = Math.floor((Math.random() * map[div_id].count));
			for (x = 0; x < i && unique == 1; x++) {
				if (map[div_id].quesDisplay[x] == next) {
					unique = 0;
				}
			}
		} while (unique != 1);
		map[div_id].quesDisplay[i] = next;
	}
	callFunction(div_id);
}

function disable() {
	var formnames = document.forms;
	var formElements = new Array();

	for (var i = 0; i < formnames.length; i++) {
		formElements = formnames[i].elements;
		for (var j = 0; j < formElements.length; j++) {
			document.formnames[i].formElements[j].disabled = true;
		}
	}
}

function number() {
	number.num++;
}


number.num = 0;
function callFunction(div_id) {
	data = map[div_id];
	count = data.quesDisplay.length;
	// alert("Call");
	number();
	
	if (number.num <= count) {
		if(number.num==1)
			createPuzzles(div_id, data.question[data.quesDisplay[number.num - 1]],
					data.answer[data.quesDisplay[number.num - 1]], number.num)
		else{
		setTimeout(function(){createPuzzles(div_id, data.question[data.quesDisplay[number.num - 1]],
				data.answer[data.quesDisplay[number.num - 1]], number.num)},2000);}
		
		// alert(number.num);
		/*function lazy(){
			alert("here");
					createPuzzles(div_id, data.question[data.quesDisplay[number.num - 1]],
				data.answer[data.quesDisplay[number.num - 1]], number.num);
						setTimeout(function(){lazy()},500);
						}*/
		//myFunction();
	}
	if (number.num > count) {
		a();
	}
}

function myFunction()
{
myVar=setInterval(function(){alert("Hello")},1000);
}
function a() {
	alert("you did all");
}


function createStatusDiv(OuterDiv,gameProgress){
	//var Hdata = map[OuterDiv];
	var outerDivObj = document.getElementById(OuterDiv);
	var StatusDiv = document.createElement("div");
	StatusDiv.className = 'statusContainer';
	StatusDiv.id = OuterDiv + "div_status";
	var thelabel = document.createElement("label");
	var textNode = document.createTextNode(gameProgress + " / "+map[OuterDiv].count);
	thelabel.appendChild(textNode);
	thelabel.id = OuterDiv + "status";
	thelabel.value = (gameProgress + " / "+map[OuterDiv].count);
	thelabel.className = 'statusLabel';
	StatusDiv.appendChild(thelabel);
	outerDivObj.appendChild(StatusDiv);
	//map[OuterDiv] = Hdata;
}

function createTextBox(OuterDiv){
	var outerDivObj = document.getElementById(OuterDiv);
	var textDiv = document.createElement("div");
	textDiv.className = 'textboxContainer';
	textDiv.id = OuterDiv + "div_text";
	
	var textLabel = document.createElement("label");
	var value = document.createTextNode("Guess a letter or a number:");
	textLabel.id = OuterDiv + "lb_text";
	textLabel.appendChild(value);
	textDiv.appendChild(textLabel);

	var textInput = document.createElement("input");
	textInput.setAttribute("type", "text");
	textInput.setAttribute("placeholder", "Input");
	textInput.setAttribute("maxlength", "1");
	textInput.setAttribute("onkeydown",
			"if (event.keyCode == 13) replaceChar(" + OuterDiv + ");");
	textInput.id = OuterDiv + "txt_guess";
	textDiv.appendChild(textInput);
	
	outerDivObj.appendChild(textDiv);
}
function replaceChar(outerDiv){
	var HData = map[outerDiv];
	var answer = new Array();
	answer = HData.AnswerArray;
	var inpBox = document.getElementById(outerDiv+"txt_guess");
	str = inpBox.value;
	str2 = inpBox.value;
	inpBox.value="";
	var bool = false;
	var correct = false;
	
	if(str2.charCodeAt(0) >= 97 && str2.charCodeAt(0) <= 122)
		str = String.fromCharCode(str.charCodeAt(0)-32);
	if(str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90)
		str2 = String.fromCharCode(str.charCodeAt(0)+32);
	var c = str.charCodeAt(0);
	for(var i = 0; i<answer.length;i++){
		if(answer[i]==str){
			var a = document.getElementById(outerDiv + "lb_answer" + i);
			var newChild = document.createTextNode(str);
			var oldChild = a.childNodes[0];
			a.replaceChild(newChild, oldChild);
			HData.CurrAnswer[i] = str;
			bool = true;
			correct = true;
			var labelChange = document.getElementById(outerDiv + "lb_solve" + c);
			labelChange.className = 'labelcolor3';
			map[outerDiv] = HData;
			if (chkAnswer(outerDiv)) {
				//alert("You did it!!!");
					callFunction(outerDiv);
				
				return;
			}
		}
		else if(answer[i]==str2){
			var a = document.getElementById(outerDiv + "lb_answer" + i);
			var newChild = document.createTextNode(str2);
			var oldChild = a.childNodes[0];
			a.replaceChild(newChild, oldChild);
			HData.CurrAnswer[i] = str2;
			bool = true;
			correct = true;
			
			var labelChange = document.getElementById(outerDiv + "lb_solve" + c);
			labelChange.className = 'labelcolor3';
			map[outerDiv] = HData;
			if (chkAnswer(outerDiv)) {
				//alert("You did it!!!");
				callFunction(outerDiv);
				
				return;
			}
		}
		 else {
				if (!bool){
					var labelChange = document.getElementById(outerDiv + "lb_solve" + c);
					labelChange.className = 'labelcolor2';
				}
			}
	}
	
	if(!correct){
		HData.remainingAttempts -= 1;
		map[outerDiv] = HData;
		refreshImage(outerDiv);
		if(HData.remainingAttempts == 0){
			exitGame();
		}
	}
	
}

function exitGame()
{

	disable();
	alert("Game Over");
	return;
}