$(document).ready(onReady);

let username = '';

function onReady() {
	console.log('jQuery is Loaded...');
	$('#userNameSubmit-btn').on('click', submitName);
	$('#userNameSubmit-btn').on('click', createTaskField);


	// $('#enter-btn').on('click', createTaskField);
}
/**This function will create a header with the user's 
*name in the header To Do list that was provided in the *input field. Once the event listener on the submit *button,  the previous content for that section will be *removed and be replaced with "username" To Do List.
 */
function submitName() {
	console.log('...inside the submitName function.');
	username = $('#usernameInput').val();

	console.log('The user\'s name is: ', username);

	$('#userList').empty();
	$('#userList').append(`
	<h1 id="userHeader" > ${username}'s To Do List	</h1>
`);
}

function renderList(list) {
	$('#viewTable').empty();
	for (let i = 0; i < list.length; i++) {
		let list = list[i];
		$('#viewTable').append(`
	<tr>
		<td> ${list.description}</td>
		<td> ${list.isComplete}</td>
		<button id = "delete-btn"> </button>
	</tr>
`);



	}

}

function createTaskField() {
	console.log('...in createTable function on [enter] button click');
	$('.taskSection').empty();
	$('.taskSection').append(`
		<tr>
			<th> Task</th>
			<th> Status</th>
		</tr>
`);
	$('.taskSection').append(`
	<tr>
		<td>
			<input id="taskIn" type="text" placeholder="Description">	
		</td>
		<td>
			<button id = "isComplete">  NOT COMPLETE </button>
		</td>
		<td>
			<button id ="delete-button"> DELETE </button>
		</td>
	</tr>
`);
}
function saveTask() {
	console.log('in the saveTask function');

	let newTask = {
		description: $('#taskIn').val(),
	};
	console.log('Task preparing to send to DataBase : ', newTask);
	$.ajax({
		method: 'POST',
		url: '/task',
		data: newTask
	}).then(function (response) {
		console.log('back from POST');
		getTask();
	}).catch(function (error) {
		console.log('Error: ', error);
		alert('Was not able to POST to database...');
	});
}

function getAllTasks() {
	console.log('in getKoalas');
	$.ajax({
		method: 'GET',
		url: '/task'
	}).then(function (response) {
		console.log('Response is: ', response);
		renderList(response);
	}).catch(function (error) {
		console.log('Error in retrieving the data from database');
	});
}


