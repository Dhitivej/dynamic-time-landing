const time = document.querySelector('#time'),
	greeting = document.querySelector('#greeting'),
	name = document.querySelector('#name'),
	focusDiv = document.querySelector('#focus');

window.onload = init;

function init() {
	showTime();
	getDetails();

	name.addEventListener('keypress', setName);
	name.addEventListener('blur', setName);

	focusDiv.addEventListener('keypress', setFocus);
	focusDiv.addEventListener('blur', setFocus);
}

function showTime() {
	let today = new Date(),
		hour = today.getHours(),
		min = today.getMinutes(),
		sec = today.getSeconds();

	// Set AM or PM (using tertianary es6)
	const amPm = hour >= 12 ? 'PM' : 'AM';

	// 12hr format
	hour = hour % 12 || 12;

	// Output time
	time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

	setTimeout(showTime, 1000);
	setTimeout(setBgGreet, 1000);
}
function addZero(n) {
	// if number > 10 add zer0 paddding
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
function setBgGreet() {
	let today = new Date(),
		hour = today.getHours();

	if (hour < 12) {
		document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
		greeting.textContent = 'Good Morning';
	} else if (hour < 18) {
		document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
		greeting.textContent = 'Good Afternoon';
	} else {
		document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
		greeting.textContent = 'Good Night';
		document.body.style.color = '#ffffff';
	}
}

function getDetails() {
	if (localStorage.getItem('name') === null) {
		name.textContent = 'Jesus';
	} else {
		name.textContent = localStorage.getItem('name');
	}

	if (localStorage.getItem('focusDiv') === null) {
		focusDiv.textContent = 'Do something';
	} else {
		focusDiv.textContent = localStorage.getItem('focusDiv');
	}
}
function setFocus(e) {
	if (e.type === 'keypress') {
		// confirm enter
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('focusDiv', e.target.innerText);
			focusDiv.blur();
		}
	} else {
		localStorage.setItem('focusDiv', e.target.innerText);
	}
}
function setName(e) {
	if (e.type === 'keypress') {
		// confirm enter
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('name', e.target.innerText);
			name.blur();
		}
	} else {
		localStorage.setItem('name', e.target.innerText);
	}
}
