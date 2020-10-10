var templateProject = document.createElement("template");

templateProject.innerHTML = `

	
	<style>
		#card {
			--color: #fe076e;
			--card-width: 400px;
			--img-width: var(--card-width);
			--img-height: calc(var(--img-width) / 2.1);
			font-family: arial;
			width: 400px;
			border-radius: 6px;
			overflow: hidden;

		}

		#img-container {
			width: 100%;
			height: var(--img-height);
		}

		#img-container>img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		#header {
			text-align: center;
			color: var(--color);
			margin: 20px;
			font-size: 20px;
			font-weight: bolder;
		}


		#description {

			margin: 40px;
			color: rgb(50, 50, 50);
		}

		#links {
			cursor: pointer;
			background-color: var(--color);
			display: flex;
			justify-content: space-around;
		}

		#links>a {

			all: unset;
			color: white;


		}

		#technology {
			display: flex;
			width: 100%;
			background-color: var(--color);
			color: white;
			border-top: 1px solid rgb(50, 50, 50);
		}

		#backend {
			flex-basis: 50%;
			text-align: center;
			border-right: 1px solid rgb(50, 50, 50);

		}

		#frontend {
			flex-basis: 50%;
			text-align: center;
		}

		.tech-header {
			font-weight: bolder;

		}

	</style>

	<div id="card">

		<div id="img-container">
			<img src="images/neteacher.png" alt="">

		</div>

		<div id="header">

			<div id="project-num">

				

			</div>
			<div id="project-name" style="margin-top:10px; color:black;">Job Search Platform</div>

		</div>
		<div id="description">

			This is a job search platform. It allows users to register as job seekers or as recruiters. Job seekers can upload their cv, search for jobs and apply with one click. Recruiters can publish ads, track the number of applicants and download their cvs.
		</div>


		<div id="links">
			<a id="live-site" href="https://avodatova.co.il">
				Live Site
			</a>

		</div>
		<div id="technology">
			<div id="backend">

				<div class="tech-header">Backend</div>

				<div>PHP</div>

			</div>
			<div id="frontend">

				<div class="tech-header">Frontend</div>


				Vanilla js


			</div>

		</div>

	</div>

`;

class Project extends HTMLElement {

	constructor() {
		super();

		this.attachShadow({

			mode: 'open'
		});


		this.template = document.createElement('template');

	}

	embedAttributes() {

		this.template.innerHTML = `

	<style>
		#card {
			--color: ${this.color};
			--card-width: 400px;
			--img-width: var(--card-width);
			--img-height: calc(var(--img-width) / 2.1);
			display: flex;
			flex-direction: column;
			font-family: arial;
			width: var(--card-width);
			max-width: 90vw;
			min-height:640px;
			border-radius: 6px;
			overflow: hidden;
			background-color:white;

		}

		#img-container {
			width: 100%;
			height: var(--img-height);
		}

		#img-container>img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		#header {
			text-align: center;
			color: var(--color);
			margin: 20px;
			font-size: 15px;
			font-weight: bolder;
		}

		#project-num{
			font-size: 20px;

		}
		
		#project-name{
			font-size: 25px;

		}

		#description {

			margin: 20px 40px 20px 40px;
			color: rgb(100, 100, 100);
			font-size: 20px;
			text-align: center;
			margin-bottom: auto;
		}

		#links {
			cursor: pointer;
			background-color: var(--color);
			display: flex;
			justify-content: space-around;
			margin-top: 40px;
		}

		a {

			all: unset;
			color: white;
			font-weight:bold;
			display:block;
			flex-basis: 50%;
			text-align: center;
		}

		#github-link{
			border-left: 1px solid rgb(50, 50, 50);

		}

		#technology {
			display: flex;
			width: 100%;
			background-color: var(--color);
			color: white;
			border-top: 1px solid rgb(50, 50, 50);
		}

		#backend {
			flex-basis: 50%;
			text-align: center;
			border-right: 1px solid rgb(50, 50, 50);

		}

		#frontend {
			flex-basis: 50%;
			text-align: center;
		}

		.tech-header {
			font-weight: bolder;

		}

		@media(max-width: 800px){
			
			#card{
				
			}

		}

	</style>

	<div id="card">

		<div id="img-container">
			<img src="${this.imgUrl}" alt="">

		</div>

		<div id="header">

			<div id="project-num">

				${this.projectNumber}
				

			</div>
			<div id="project-name" style="margin-top:10px; color:black;">

				${this.projectName}

			</div>

		</div>
		<div id="description">
				
			${this.description}

		</div>


		<div id="links">

			<a id="live-site" target="_blank" href="${this.liveUrl}">
				Live Site
			</a>

			${this.gitLink}
		</div>
		<div id="technology">
			<div id="backend">

				<div class="tech-header">Backend</div>

				<div style="font-size:18px;">${this.backendTech}</div>

			</div>
			<div id="frontend">

				<div class="tech-header">Frontend</div>


				<div style="font-size:18px;">
					${this.frontendTech}

				</div>

			</div>

		</div>

	</div>


		`;
		this.shadowRoot.appendChild(this.template.content.cloneNode(true));


	}

	connectedCallback() {

		this.imgUrl = this.getAttribute("img-url");
		this.projectNumber = this.getAttribute("project-number");
		this.projectName = this.getAttribute("project-name");
		this.liveUrl = this.getAttribute('live-site');
		this.gitLink = (this.getAttribute("git-url")) ? this.createLink(this.getAttribute("git-url")) : "";
		this.frontendTech = this.getAttribute('frontend');
		this.backendTech = this.getAttribute('backend');
		this.description = this.getAttribute("description");
		this.color = this.getAttribute("color");


		this.embedAttributes();


	}

	createLink(url) {
		return `<a id="github-link" target="_blank" href="${url}">Github Repo</a>`;

	}


}

//Define custom html element
window.customElements.define("app-project", Project);
