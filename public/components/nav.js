//Define the navigation bar template
var template = document.createElement("template");
template.innerHTML = `
<style>
@font-face {
}


:root{

}

#nav{
	width: 100vw;
	font-family: 'Kay Pho Du', serif;
	font-weight: 700;
	font-family: 'Poppins', sans-serif;
    display:flex;
	background-color: #1a1a1a;
    align-content: center;
	align-items: center;
	justify-content: center;
    height:60px;
}

a{
    display:block;
    position:relative;
    color:white;
    text-decoration:none;
    margin-left: 20px;
    font-size: 17px;
	padding: 10px 12px;
	transition: 0.1s;
}

a.active::before {
	content: '';
	position: absolute;
	background: transparent;
	top: 0;
	left: 0;
	border-radius: 5px;
	width: 100%;
	height: 100%;
	box-shadow: 
		inset 5px 5px 10px orange, 
		inset -5px -5px 10px orange, 
		inset 5px -5px 10px orange, 
		inset -5px 5px 10px orange;
	transition: 0.1s;

}

a.active {
	color: gold;
	border: 2px solid gold;
	border-radius: 5px;
	text-shadow:
		2px 2px 5px orange, 
		-2px -2px 5px orange, 
		2px -2px 5px orange, 
		-2px 2px 5px orange;
	box-shadow:
		5px 5px 10px orange, 
		-5px -5px 10px orange, 
		5px -5px 10px orange, 
		-5px 5px 10px orange;
}

.line-over::before{
    content:'';
    display: block;
    width:0;
    height:3px;
    position: absolute;
    top: -2px;
    background-color: black;
    transition:width 0.2s linear;
}

.line-over:hover::before{
    width:100%;

}



.button:hover{
    transform: scale(1.05);
    box-shadow: 2 px 6 px 6 px 0 rgb(200, 200, 200);
}

</style>

<div id="nav">
	<a class="active" href="#about-me">About</a>
	<a href="#projects">Projects</a>
	<a href="#contact-me">Contact</a>
</div>

`;

//Define a Navigation class
class Navigation extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({
			mode: "open"
		});

		//Insert the template to the shadow dom
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.links = this.shadowRoot.querySelectorAll("a");
		this.addListeners();
		this.links[0].click();

	}

	addListeners(){
		for(let entry of this.links.entries()){
			let link = entry[1];
			link.addEventListener("click", (e)=>{
				for(let link of this.links.entries()){
					link[1].classList.remove("active");
				}
				e.target.classList.add("active");
			});
		}
	}

}

//Define custom html element
window.customElements.define("app-nav", Navigation);
