$(document).ready(onReady);

let username = '';

function onReady() {
	console.log('jQuery is Loaded...');
	$('#userNameSubmit-btn').on('click', submitName);


	$('#enter-btn').on('click', createTable);
}
/**This function will create a header with the user's 
*name in the header To Do list that was provided in the *input field. Once the event listener on the submit *button,  the previous content for that section will be *removed and be replaced with "username" To Do List.
 */
function submitName() {
	console.log('...inside the sumbitName function.');
	username = $('#usernameInput').val();

	console.log('The user\'s name is: ', username);

	$('.userList').empty();
	$('.userList').html(`
	<h1 id="userHeader" > ${username}'s To Do List	</h1>
`);
}

function renderList() {
	$('#viewTable').empty();

}

function createTaskField() {
	console.log('...in createTable function on [enter] button click');
	$('.taskSection').empty();
	$('.taskSection').append(`
		<tr>
			<th> Task</th>
			<th> Complete</th>
			<th> Delete</th>
		</tr>
`);
	$('.taskSection').append(`
	<tr>
		<td>
			<input id="taskIn" type="text" placeholder="Description">	
		</td>
	</tr>
`);
	saveTask()
}
function saveTask() {
	console.log('in the saveTask function');

	let newTask = {
		description: $('#taskIn').val(),
		complete: ""
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


