$(document).ready(onReady);

let username = '';

function onReady() {
	console.log('jQuery is Loaded...');
	$('#userNameSubmit-btn').on('click', submitName);
	$('#userNameSubmit-btn').on('click', createTaskField);

	$('#inputSection').on('click', '#saveTask-btn', saveTask);
	$('#taskSection').on('click', '.delete-btn', removeTask);
	getAllTasks();
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

function renderList(array) {
	$('#taskSection').empty();
	$('#taskSection').append(`
	<tr>
		<td> Task</td>
		<td> Status</td>
	</tr>

`)
	for (let item of array) {
		$('#taskSection').append(`
	<tr>
		<td> ${item.description}</td>
		<td><button class = "check-btn" data-id = ${item.id}> ✅ </button></td>
		<td><button class = "delete-btn" data-id = ${item.id}> DELETE </button></td>
	</tr>
`);
	}
	createTaskField();
}

function createTaskField() {
	console.log('...in createTable function on [enter] button click');
	$('#inputSection').empty();
	$('#inputSection').append(`
	<tr>
		<tr> 
		<td> Add Tasks to List</td>
		</tr>
		<td>
			<input id="taskIn" type="text" placeholder="Task Description">	
		</td>
		<td>
			<button id = "saveTask-btn">  Enter </button>
		</td>
	</tr>
`);
}
function saveTask() {
	console.log('in the saveTask function');

	let newTask = {
		description: $('#taskIn').val()
	};
	console.log('Task preparing to send to DataBase : ', newTask);
	$.ajax({
		method: 'POST',
		url: '/task',
		data: newTask
	}).then(function (response) {
		console.log('back from POST');
		$('#taskIn').val('');
		getAllTasks();
	}).catch(function (error) {
		console.log('Error: ', error);
		alert('Was not able to POST to database...');
	});
}

function getAllTasks() {
	console.log('in getAllTasks function.');
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

function removeTask() {
	const id = $(this).data('id');
	console.log(`in removeTask ${id}`)

	$.ajax({
		type: 'DELETE',
		url: `/task/${id}`
	}).then(function (response) {
		console.log(`Back from DELETE:`, response);
		getAllTasks();
	}).catch(function (error) {
		console.log(error);
	})
}
