$(document).ready(onReady);

let username = '';
//Here I have event listener once the username submit button is clicked the header will create a (name)'s TO DO LIST and 
//also another event listener which  will create a input field where the task descriptions will be handled. 

function onReady() {
	console.log('jQuery is Loaded...');
	$('#userNameSubmit-btn').on('click', submitName);
	$('#userNameSubmit-btn').on('click', createTaskField);

	//These are the button event listener that are were created after the initial render. 
	$('#inputSection').on('click', '#saveTask-btn', saveTask);
	$('#taskSection').on('click', '#delete-btn', removeTask);
	$('#taskSection').on('click', '#check-btn', updateCompletion);
	getAllTasks();
}
/**This function will create a header with the user's 
*name in the header To Do list that was provided in the *input field. Once the event listener on the submit *button,  the previous content for that section will be *removed and be replaced with "username" To Do List.
 */
function submitName() {
	if ($('#usernameInput').val() === '') {
		alert('You must input a name for this To Do List');
	}
	else {
		console.log('...inside the submitName function.');
		username = $('#usernameInput').val();
		username = username.toUpperCase();

		console.log('The user\'s name is: ', username);

		$('#userList').empty();
		$('#userList').append(`
	<h1 id="userHeader" > ${username}'S TO DO LIST ✍️	</h1>
`);
	}
}

function renderList(array) {
	$('#taskSection').empty();
	$('#taskSection').append(`
	<tr>
		<td> Task</td>
		<td> Status</td>
	</tr>

`);
	/**
	This will check if the property of the item's "IsComplete" is set to 'true'
	or 'false'. If it has the value 'true' then the <tr> will be given the class = complete, to be used in the css styling to change the background to green accordingly. Else the class will not be added to the appropriate table row. 
	 */
	for (let item of array) {
		if (item.IsComplete === true) {
			$('#taskSection').append(`
	<tr class = "complete">
		<td> ${item.description}</td>
		<td><button id = "check-btn"  data-id = ${item.id}> ✅ </button></td>
		<td><button id = "delete-btn" data-id = ${item.id}> DELETE </button></td>
	</tr>
`);
		} else {
			$('#taskSection').append(`
	<tr class = "incomplete">
		<td> ${item.description}</td>
		<td><button id = "check-btn"  data-id = ${item.id}> ✅ </button></td>
		<td><button id = "delete-btn" data-id = ${item.id}> DELETE </button></td>
	</tr>
`);
		}
	}
	createTaskField();
}
//This is used in the initial setup of the app where this will populate once the username is provided and the input fields for the table is displayed to the user.
function createTaskField() {
	console.log('...in createTable function on [enter] button click');
	$('#inputSection').empty();
	$('#inputSection').append(`
	<tr>
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
	if ($('#taskIn').val() === '') {
		alert('You need to add a Task Description before continuing.')
	}
	else if ($('#usernameInput').val() === '') {
		alert('You must input a name for this To Do List');
	}
	else {
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
//remove the table row where the delete button corresponds too. 
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
//When the ✅ button is clicked the PUT method will use the router to send the updated value for the "IsComplete" property and change to 'true'.
function updateCompletion() {
	let id = $(this).data('id');
	$.ajax({
		method: 'PUT',
		url: `/task/${id}`
	}).then(function (response) {
		console.log('update data', response);
		getAllTasks();
	}).catch(function (error) {
		console.log('Something went wrong with updating using PUT method: ', error);
	});
}