import React from 'react';
import '../styles/About.css';
import avatar from '../assets/user_icon.png';
import gitIco from '../assets/icons8-github-48.png';
import linkIco from '../assets/icons8-linkedin-48.png';
import logo from "../assets/tastybook-logo.png";

const About = () => {

	return (
		<div id='about'>
			<h1>About Us</h1>
			<div>
				<img src={logo} alt="logo" />
				<h2 className='logo'>TastyBook</h2>
			</div>

			<p id='about_text'>
				TastyBook is the ultimate culinary companion for all food and cooking enthusiasts.
				It provides many food recipes from different countries and cultures around the world.
				Whether you're an experienced chef or a kitchen novice, our app is designed to elevate
				your cooking experience to new heights.
				The amazing fact is that our recipes are made <strong>by cooking lovers, for cooking lovers.</strong><br />
				The recipes are shared with ingredients list, and all needed to properly use the recipe.
				Then enjoy cooking succulent dishes and embark on a flavorful journey.
			</p>
			<div id='team'>
				<h2>Powered By</h2>
				<div className='member'>
					<img src={avatar} alt="Mercy Korir" />
					<p>Software Engineer - <strong>Backend</strong> </p>
					<span>Mercy Korir</span>
					<div className='socials'>
						<a href="/#">
							<img src={linkIco} alt="linkedin_icon" title='linkedin'/>
						</a>
						<a href="/#">
							<img src={gitIco} alt="github_icon" title='git'/>
						</a>
					</div>
				</div>
				<div className='member'>
					<img src={avatar} alt="Fayçal OUEDRAOGO" />
					<p>Software Engineer - <strong>Frontend</strong> </p>
					<span>Fayçal OUEDRAOGO</span>
					<div className='socials'>
						<a href="/#">
							<img src={linkIco} alt="github_icon" />
						</a>
						<a href="/#">
							<img src={gitIco} alt="github_icon" />
						</a>
					</div>
				</div>
				<div id='member'>
					<img src={avatar} alt="TIESSIA ADAMA" />
					<p>Software Engineer - <strong>Frontend</strong> </p>
					<span>TIESSIA ADAMA</span>
					<div className='socials'>
						<a href="/#">
							<img src={linkIco} alt="github_icon" />
						</a>
						<a href="/#">
							<img src={gitIco} alt="github_icon" />
						</a>
					</div>
				</div>		
			</div>
		</div>
	);
};

export default About;
