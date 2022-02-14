let mainResult = document.querySelector(".main-result");
let resultData = document.querySelector('#result')
let users = [];
let text = localStorage.getItem('usersList');
let obj = JSON.parse(text);
if(obj != null){
	users = obj;
	mainResult.style.display = "block";
}
function showData(){
	text = localStorage.getItem('usersList');
	obj = JSON.parse(text);
	if(users.length > 0 || obj != null ){
		if(obj != null){
			users = obj;
		}
		for(var i=0;i < users.length;i++){
			resultData.innerHTML += `<div class="user-details"><div class="user-details__inner"> <img src="${obj[i].image}"  alt="user-${i}"/> <h2>${obj[i].user}</h2><h3>${obj[i].designation}</h3> </div></div>`;
		}
	}
}
showData();
let imgField = document.querySelector("#img-field");
function readURL(input) {
	imgField.style.display = "block";
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			document.querySelector('#userImg').src =  e.target.result;
		}
		reader.readAsDataURL(input.files[0]);
	}
}
document.querySelector('.submit').addEventListener('click',(e)=>{
	e.preventDefault();
	let error_message = document.querySelector('.error-message');
	error_message.innerHTML = "";
	let title = document.querySelector('.title').value;
	let designation = document.querySelector('.designation').value;
	let userImage = document.querySelector('#userImg').getAttribute('src');
	let success_message = document.querySelector('.success-message');
	try{
		if(title == "") throw "Name should not be empty!"
			if(designation == "") throw "Designation should not be empty!"
				if(userImage == "") throw "Image should not be empty!"
			}
		catch(err){
			error_message.innerHTML = err;
			error_message.style.display = 'block';
		}
		if(title != "" && designation != "" && userImage != ""){
			error_message.style.display = 'none';
		// add new object to array
		let usersinput = {
			user:title,
			designation: designation,
			image: userImage
		}
		users.push(usersinput);
		let userlistadded = JSON.stringify(users);
		// set list to localStorage
		localStorage.setItem('usersList',userlistadded);

		success_message.style.display = 'block';
		setTimeout(function(){
			success_message.style.display = 'none';
		},3000);
		// empty all result 
		resultData.innerHTML = '';
		// added result data
		showData();
		// empty all fields
		document.querySelector('.title').value = "";
		document.querySelector('.designation').value = "";
		document.querySelector('#userImg').setAttribute('src','');
		imgField.style.display = "none";
		mainResult.style.display = "block";
		}
});
document.querySelector('.btn-primary').addEventListener('click',(e)=>{
	e.preventDefault();
	localStorage.removeItem('usersList');
	resultData.innerHTML = '';
	mainResult.style.display = "none";
	users = [];
});