$(document).ready(onReady);

let username = '';

function onReady() {
	console.log('jQuery is Loaded...');
	$('#userNameSubmit-btn').on('click', submitName);

}

function submitName() {
	console.log('...inside the sumbitName function.');
	username = $('#usernameInput').val();

	console.log('The user\'s name is: ', username);

	$('.userList').empty();
	$('.userList').html(`
	<h1 id="userHeader" > ${username}'s To Do List	</h1>
`);
}