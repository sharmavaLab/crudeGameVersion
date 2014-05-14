var map = new Object();
var unknownChar = "-";
var upr = 0;
//Mention the length of the string for width-wise
var len = 50;

function setLength(length){
	len = length;
}


function playSound(filePath) {
	var snd = new Audio(filePath); // buffers automatically when created
	snd.play();
}

function timeElapsed(minutes, seconds, milliseconds) {
	// three elements in interval, first is minutes, second is seconds, third is
	// milliseconds
	var interval = new Array();
	interval[0] = minutes;
	interval[1] = seconds;
	interval[2] = milliseconds;
	return interval;
}

function calculateTime(gStartTime, gEndTime) {
	var milliseconds = 0;
	var seconds = 0;
	var minutes = 0;
	if (gStartTime == undefined) {
		return timeElapsed(0, 0, 0);
	}
	if (gEndTime == undefined) {
		return timeElapsed(0, 0, 0);
	}

	var diff = gEndTime - gStartTime;
	milliseconds = diff;

	if (milliseconds >= 1000) {
		seconds = Math.floor(milliseconds / 1000);
		milliseconds = milliseconds % 1000;
	}

	if (seconds >= 60) {
		minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;
	}
	return timeElapsed(minutes, seconds, milliseconds);
}

function showTime(gStartTime, gEndTime, gameNo) {
	var interval = calculateTime(gStartTime, gEndTime);
	var timeStr = "time to pass game " + gameNo + ": ";
	timeStr = timeStr + interval[0] + " minutes " + interval[1] + " seconds "
	+ interval[2] + " milliseconds";
	return timeStr;
}

function CryptogramData(div_id) {
	this.count = 0;
	this.cipher = new Array();
	this.encrypt = new Array();
	this.currAnswer = new Array();
	this.Msg = new Array();
	this.error = "";
	this.startTime = null;
	this.endTime = null;
	this.solutionSubLineId = -1;

}

function createSolutionDiv(div_id, lineNo){
	var solveDiv = document.createElement("div");
	solveDiv.className = 'container2';
	solveDiv.id = div_id+"_"+lineNo + "div_decipher";
	solveDiv.style.visibility = "hidden";

	var solveLabel = document.createElement("label");
	solveLabel.id = div_id+"_"+lineNo + "lb_ciphered";
	solveDiv.appendChild(solveLabel);

	var solveInput = document.createElement("input");
	solveInput.setAttribute("type", "text");
	solveInput.setAttribute("value", "");
	solveInput.setAttribute("maxlength", "1");
	solveInput.setAttribute("size","1");
	solveInput.setAttribute("onkeydown",
			"if (event.keyCode == 13) replaceChar("+lineNo+" , "+ div_id + ");");
	solveInput.id = div_id+"_"+lineNo + "tx_deciphered";
	solveDiv.appendChild(solveInput);
	return solveDiv;
}
function createCipher(div_id) {
	var next = 0;
	var i, x, unique = 1;
	cipher = new Array(26);
	for (i = 0; i < 26; i++) {
		do {
			unique = 1;
			next = Math.floor((Math.random() * 26));
			for (x = 0; x < i && unique == 1; x++) {
				if (((cipher[x].charCodeAt(0)) - 65) == next) {
					unique = 0;
				}
			}
		} while ((unique != 1) || (next == i));
		cipher[i] = String.fromCharCode(next + 65);
	}
	var crData = map[div_id];
	crData.cipher = cipher;
}
function encryptMsg(div_id) {
	var crData = map[div_id];
	encrypt = new Array(crData.Msg.length);
	for (var i = 0; i < encrypt.length; i++) {
		encrypt[i] = new Array(crData.Msg[i].length);
		for (var j = 0; j < encrypt[i].length; j++) {
			xx = crData.Msg[i].charCodeAt(j);
			if (xx >= 65 && xx <= 90) {
				xx = xx - 65;
				encrypt[i][j] = cipher[xx];
			} else if (xx >= 97 && xx <= 122) {
				xx = xx - 32 - 65;
				upr = cipher[xx].charCodeAt(0);
				encrypt[i][j] = String.fromCharCode(upr + 32);
			} else {
				encrypt[i][j] = crData.Msg[i][j];
			}
		}
	}
	crData.encrypt = encrypt;
	map[div_id] = crData;
}
function createContainers(div_id, codes) {
	var outerDiv = document.getElementById(div_id);
	var ProblemDiv = document.createElement("div");
	ProblemDiv.className = 'container1';
	ProblemDiv.id = div_id + "div_showCipher";
	outerDiv.appendChild(ProblemDiv);
	dyCreateContainer(div_id, div_id + 'div_showCipher', div_id
			+ "div_decipher", codes);
}
function dyCreateContainer(outerDiv, cipheredId, solveDiv, codes) {
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var currAnswer = crData.currAnswer;
	var container = document.getElementById(cipheredId);
	currAnswer = new Array(encrypt.length);
	for (var i = 0; i < encrypt.length; i++) {
		currAnswer[i] = new Array(crData.encrypt[i].length);
		for (var j = 0; j < encrypt[i].length; j++) {
			if ((encrypt[i][j].charCodeAt(0) >= 65 && encrypt[i][j]
			.charCodeAt(0) <= 90)
			|| (encrypt[i][j].charCodeAt(0) >= 97 && encrypt[i][j]
			.charCodeAt(0) <= 122)) {
				currAnswer[i][j] = unknownChar;
			} else {
				currAnswer[i][j] = encrypt[i][j];
			}
		}
	}
	for (var i = 0; i < encrypt.length; i++) {
		var subLineCipher = document.createElement("div");
		subLineCipher.id = "subLineCipher"+cipheredId+"_"+i;
		var subLineAnswer = document.createElement("div");
		subLineAnswer.id = "subLineAnswer"+cipheredId+"_"+i;
		var solutionLine = createSolutionDiv(outerDiv, i);
		for (var j = 0; j < encrypt[i].length; j++) {
			if ((encrypt[i][j].charCodeAt(0) >= 65 && encrypt[i][j]
			.charCodeAt(0) <= 90)
			|| (encrypt[i][j].charCodeAt(0) >= 97 && encrypt[i][j]
			.charCodeAt(0) <= 122)) {
				var thelabel = document.createElement("label");
				var textNode = document.createTextNode(encrypt[i][j]);
				thelabel.appendChild(textNode);
				thelabel.id = outerDiv + "lbCiphered" + i + j;
				thelabel.value = i + "-" + j;
				subLineCipher.appendChild(thelabel);
				thelabel.onclick = function() {
					if (crData.startTime == null) {
						crData.startTime = new Date();
					}
					//this.className = 'labelcolor2';
					if(crData.solutionSubLineId!=-1){
						var solutionDiv = document.getElementById(crData.solutionSubLineId);
						solutionDiv.style.visibility = "hidden";
					}
					dechipher(this.value, outerDiv);
					var indices = this.value.split("-");
					crData.solutionSubLineId = outerDiv+"_"+indices[0] + "div_decipher";
					var textbox = document.getElementById(outerDiv+"_"+indices[0] + "tx_deciphered");
					textbox.value = "";
					textbox.focus();
					var str = encrypt[indices[0]][indices[1]];
					var str2 = "";
					if (str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) {
						str2 = String.fromCharCode(str.charCodeAt(0) + 32);
					} else if (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122) {
						str2 = String.fromCharCode(str.charCodeAt(0) - 32);
					}
					for (var i = 0; i < encrypt.length; i++) {
						for (var j = 0; j < encrypt[i].length; j++) {
							if (encrypt[i][j] == str
									|| encrypt[i][j] == str2) {
								var q = document
								.getElementById(outerDiv + "lbCiphered" + i + j);
								var a = document.getElementById(outerDiv + "lbAnswerItm"
										+ i + j);
								q.className = 'labelcolor2';
								a.className = 'labelcolor2';
							}
							else {
								var q = document
								.getElementById(outerDiv + "lbCiphered" + i + j);
								var a = document.getElementById(outerDiv + "lbAnswerItm"
										+ i + j);
								q.className = 'labelcolor1';
								a.className = 'labelcolor1';
							}
						}
					}
					if ((currAnswer[indices[0]][indices[1]].charCodeAt(0) >= 65 && currAnswer[indices[0]][indices[1]]
					.charCodeAt(0) <= 90)
					|| (currAnswer[indices[0]][indices[1]]
					.charCodeAt(0) >= 97 && currAnswer[indices[0]][indices[1]]
					.charCodeAt(0) <= 122))
						textbox.value = currAnswer[indices[0]][indices[1]];

				};
				thelabel.onmousedown = function() {
					playSound("media/click_char.mp3");
				};
			} else {
				var thelabel = document.createElement("label");
				var textNode = document.createTextNode(encrypt[i][j]);
				thelabel.appendChild(textNode);
				thelabel.id = outerDiv + "lbCiphered" + i + j;
				thelabel.value = i + "-" + j;
				subLineCipher.appendChild(thelabel);
			}
		}
		for (var j = 0; j < encrypt[i].length; j++) {
			if ((encrypt[i][j].charCodeAt(0) >= 65 && encrypt[i][j]
			.charCodeAt(0) <= 90)
			|| (encrypt[i][j].charCodeAt(0) >= 97 && encrypt[i][j]
			.charCodeAt(0) <= 122)) {
				var thelabelAnswer = document.createElement("label");
				thelabelAnswer.id = outerDiv + "lbAnswerItm" + i + j;
				var textNode2 = document.createTextNode(unknownChar);
				thelabelAnswer.appendChild(textNode2);
				thelabelAnswer.value = i + "-" + j;
				subLineAnswer.appendChild(thelabelAnswer);
				thelabelAnswer.onclick = function(){
					if (crData.startTime == null) {
						crData.startTime = new Date();
					}
					if(crData.solutionSubLineId!=-1){
						var solutionDiv = document.getElementById(crData.solutionSubLineId);
						solutionDiv.style.visibility = "hidden";
					}
					dechipher(this.value, outerDiv);
					var indices = this.value.split("-");
					crData.solutionSubLineId = outerDiv+"_"+indices[0] + "div_decipher";
					var textbox = document.getElementById(outerDiv+"_"+indices[0] + "tx_deciphered");
					textbox.value = "";
					textbox.focus();
					var str = encrypt[indices[0]][indices[1]];
					var str2 = "";
					if (str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) {
						str2 = String.fromCharCode(str.charCodeAt(0) + 32);
					} else if (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122) {
						str2 = String.fromCharCode(str.charCodeAt(0) - 32);
					}
					for (var i = 0; i < encrypt.length; i++) {
						for (var j = 0; j < encrypt[i].length; j++) {
							if (encrypt[i][j] == str
									|| encrypt[i][j] == str2) {
								var q = document
								.getElementById(outerDiv + "lbCiphered" + i + j);
								var a = document.getElementById(outerDiv + "lbAnswerItm"
										+ i + j);
								q.className = 'labelcolor2';
								a.className = 'labelcolor2';
							}
							else {
								var q = document
								.getElementById(outerDiv + "lbCiphered" + i + j);
								var a = document.getElementById(outerDiv + "lbAnswerItm"
										+ i + j);
								q.className = 'labelcolor1';
								a.className = 'labelcolor1';
							}
						}
					}
					if ((currAnswer[indices[0]][indices[1]].charCodeAt(0) >= 65 && currAnswer[indices[0]][indices[1]]
					.charCodeAt(0) <= 90)
					|| (currAnswer[indices[0]][indices[1]]
					.charCodeAt(0) >= 97 && currAnswer[indices[0]][indices[1]]
					.charCodeAt(0) <= 122))
						textbox.value = currAnswer[indices[0]][indices[1]];
				};
				thelabelAnswer.onmousedown = function() {
					playSound("media/click_char.mp3");
				};

			} else {
				var thelabelAnswer = document.createElement("label");
				thelabelAnswer.id = outerDiv + "lbAnswerItm" + i + j;
				thelabelAnswer.value = i + "-" + j;
				var textNode2 = document.createTextNode(encrypt[i][j]);
				thelabelAnswer.appendChild(textNode2);
				subLineAnswer.appendChild(thelabelAnswer);
			}
		}
		container.appendChild(subLineCipher);
		container.appendChild(subLineAnswer);
		container.appendChild(solutionLine);
	}
	crData.currAnswer = currAnswer;
	map[outerDiv] = crData;
}
function dechipher(index, outerDiv) {
	var crData = map[outerDiv];
	var indices = index.split("-");
	var encrypt = crData.encrypt;
	var divDecipher = document.getElementById(outerDiv+"_"+indices[0]+"div_decipher");
	divDecipher.style.visibility = "visible";
	var lbCiphered = divDecipher.getElementsByTagName("label")[0];
	lbCiphered.value = index;
	lbCiphered.innerHTML = encrypt[indices[0]][indices[1]] + ":";
}
function replaceChar(lineNo, outerDiv) {
	var crData = map[outerDiv];
	var encrypt = crData.encrypt;
	var currAnswer = crData.currAnswer;
	var inpBox = document.getElementById(outerDiv+"_"+lineNo+ "tx_deciphered");
	replacement = inpBox.value;
	if (replacement == undefined || replacement == "") {
		replacement = unknownChar;
	}
	if ((replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90)
			|| (replacement.charCodeAt(0) >= 97 && replacement.charCodeAt(0) <= 122)
			|| replacement == unknownChar) {
		var lbCiphered = document.getElementById(outerDiv+"_"+lineNo + "lb_ciphered");
		var indices = lbCiphered.value.split("-");
		var str = encrypt[indices[0]][indices[1]];
		var str2 = "";
		if (str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) {
			str2 = String.fromCharCode(str.charCodeAt(0) + 32);
		} else if (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122) {
			str2 = String.fromCharCode(str.charCodeAt(0) - 32);
		}
		if (replacement.charCodeAt(0) >= 65 && replacement.charCodeAt(0) <= 90) {
			replacement = String.fromCharCode(replacement.charCodeAt(0) + 32);
		}
		for (var i = 0; i < encrypt.length; i++) {
			for (var j = 0; j < encrypt[i].length; j++) {
				var q = document
				.getElementById(outerDiv + "lbCiphered" + i + j);
				if (currAnswer[i][j] == replacement
						|| currAnswer[i][j] == String.fromCharCode(replacement
								.charCodeAt(0) - 32)) {
					var a = document.getElementById(outerDiv + "lbAnswerItm"
							+ i + j);
					var newChild = document.createTextNode("-");
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
					currAnswer[i][j] = "-";
				}
				var indices = q.value.split("-");
				if (encrypt[indices[0]][indices[1]] == str
						|| encrypt[indices[0]][indices[1]] == str2) {
					var a = document.getElementById(outerDiv + "lbAnswerItm"
							+ i + j);
					if (encrypt[indices[0]][indices[1]].charCodeAt(0) >= 65
							&& encrypt[indices[0]][indices[1]].charCodeAt(0) <= 90
							&& replacement != unknownChar) {
						var newChild = document.createTextNode(String
								.fromCharCode(replacement.charCodeAt(0) - 32));
						currAnswer[i][j] = String.fromCharCode(replacement
								.charCodeAt(0) - 32);
					} else {
						var newChild = document.createTextNode(replacement);
						currAnswer[i][j] = replacement;
					}
					var oldChild = a.childNodes[0];
					a.replaceChild(newChild, oldChild);
				}
			}
		}
		for (var i = 0; i < encrypt.length; i++) {
			for (var j = 0; j < encrypt[i].length; j++) {
				var q = document
				.getElementById(outerDiv + "lbCiphered" + i + j);
				var a = document.getElementById(outerDiv + "lbAnswerItm"
						+ i + j);
				q.className = 'labelcolor1';
				a.className = 'labelcolor1';

			}
		}
		inpBox.value = "";
		document.getElementById(outerDiv+"_"+lineNo + "div_decipher").style.visibility = "hidden";
		playSound("media/char_changed.mp3");
	} else {
		inpBox.value = "";
		playSound("media/enter_invalid.mp3");
	}

	crData.currAnswer = currAnswer;
	map[outerDiv] = crData;
	if (chkAnswer(outerDiv)) {
		playSound("media/successful.mp3");
		crData.endTime = new Date();
		var timeInfo = showTime(crData.startTime.getTime(), crData.endTime
				.getTime(), outerDiv);
		alert("You got it right!!" + timeInfo + " \n");
	}
}
function chkAnswer(outerDiv) {
	var crData = map[outerDiv];
	var Msg = crData.Msg;
	var currAnswer = crData.currAnswer;
	for (var i = 0; i < Msg.length; i++) {
		for (var j = 0; j < Msg[i].length; j++) {
			if (Msg[i][j] != currAnswer[i][j]) {
				return false;
			}
		}
	}
	return true;
}

function createPuzzlesWithLength(div_id, message, length, key){
	var ori_len = len;
	len = length;
	createPuzzles(div_id, message, key);
	len = ori_len;
}


function createPuzzles(div_id, message, key) {
	var value = new Array();
	k = 0;
	if (key == undefined) {
		map[div_id] = new CryptogramData(div_id);
		var crData = map[div_id];
		var codes = message.split("\n");
		for (var i = 0; i < codes.length; i++) {
			while (codes[i].length > len) {
				temp = codes[i].charCodeAt(len);
				if (!((temp >= 65 && temp <= 90) || (temp >= 97 && temp <= 122))) {
					value[k++] = codes[i].substr(0, len);
					codes[i] = codes[i].substr(len);
				} else {
					for (var x = len; x >= 0; x--) {
						breaker = codes[i].charCodeAt(x);
						if (!((breaker >= 65 && breaker <= 90) || (breaker >= 97 && breaker <= 122))) {
							value[k++] = codes[i].substr(0, x);
							codes[i] = codes[i].substr(x);
							break;
						}
					}
				}
			}
			value[k++] = codes[i];
		}
		crData.count = value.length;
		crData.Msg = value;
		createCipher(div_id);
		encryptMsg(div_id);
		createContainers(div_id, value);
	} else {
		codes = message.split("\n");
		for (var i = 0; i < codes.length; i++) {
			while (codes[i].length > len) {
				temp = codes[i].charCodeAt(len);
				if (!((temp >= 65 && temp <= 90) || (temp >= 97 && temp <= 122))) {
					value[k++] = codes[i].substr(0, len);
					codes[i] = codes[i].substr(len);
				} else {
					for (var x = len; x >= 0; x--) {
						breaker = codes[i].charCodeAt(x);
						if (!((breaker >= 65 && breaker <= 90) || (breaker >= 97 && breaker <= 122))) {
							value[k++] = codes[i].substr(0, x);
							codes[i] = codes[i].substr(x);
							break;
						}
					}
				}
			}
			value[k++] = codes[i];
		}

		map[div_id] = new CryptogramData(div_id);
		map[div_id].count = value.length;
		map[div_id].Msg = value;
		if (userCipher(div_id, value, key)) {
			encryptMsg(div_id);
			createContainers(div_id, value);
		}

		else {
			alert(map[div_id].error);
			playSound("media/enter_invalid.mp3");
		}

	}

}

function userCipher(div_id, messages, keys) {
	message = messages.join("");
	upr = message.toUpperCase();
	str = upr.split("");
	sortedMsg = str.sort();
	elem = new Array();
	key = keys.toUpperCase();
	var crData = map[div_id];
	// Key Length check
	if (key.length != 26) {
		crData.error = "Key is short. Please give the required length of 26";
		return false;
	}
	cipher = new Array(26);
	for (var i = 0; i < 26; i++) {
		cipher[i] = key[i];
	}

	p = 0;
	// Removing duplicates from message to check repetition of key use
	for (i = 0; i < sortedMsg.length; i++) {
		msg = sortedMsg[i].charCodeAt(0);
		k = 0;
		for (var j = 0; j < i; j++) {
			if (msg == sortedMsg[j].charCodeAt(0)) {
				k = 1;
				break;
			}
		}
		if (k == 0 && (msg >= 65 && msg <= 90)) {
			elem[p] = sortedMsg[i];
			p++;
		}

	}
	// Check for repetition of key
	for (i = 0; i < elem.length; i++) {
		a1 = elem[i].charCodeAt(0);
		pre = cipher[a1 - 65].charCodeAt(0);
		for (var x = i + 1; x < elem.length; x++) {
			a2 = elem[x].charCodeAt(0);
			nex = cipher[a2 - 65].charCodeAt(0);
			if (pre == nex) {
				crData.error = "Sorry ..Repetition of key use is not allowed";
				return false;
			}
		}
	}
	// Character Validation
	for (i = 0; i < elem.length; i++) {
		msg = elem[i].charCodeAt(0);
		code = cipher[msg - 65].charCodeAt(0);
		if (!(code >= 65 && code <= 90)) {
			crData.error = "Key not valid";
			return false;
		}
	}
	crData.cipher = cipher;
	return true;
}

