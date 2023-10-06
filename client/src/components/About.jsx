import React from 'react';
import '../styles/About.css';
import avatar from '../assets/user_icon.png';
import linkedin_ico from '../assets/icons8-linkedin-48.png';
import github_ico from '../assets/icons8-github-48.png';


const About = () => {

	return (
		<>
			<div id='about'>
				<p>About Us</p>
				<div>
					<img src={avatar} alt="Mercy Korir" />
					<p>Software Engineer - <strong>Backend</strong> </p>
					<span>Mercy Korir</span>
					<div className='socials'>
						<a href="/#"><img src={linkedin_ico} alt="linkedIn icon" /></a>
						<a href="/#"><img src={github_ico} alt="github icon" /></a>
					</div>
				</div>
				<div>
					<img src={avatar} alt="Fayçal OUEDRAOGO" />
					<p>Software Engineer - <strong>Frontend</strong> </p>
					<span>Fayçal OUEDRAOGO</span>
					<div className='socials'>
						<a href="/#"><img src={linkedin_ico} alt="linkedIn icon" /></a>
						<a href="/#"><img src={github_ico} alt="github icon" /></a>
					</div>
				</div>
				<div>
					<img src={avatar} alt="TIESSIA ADAMA" />
					<p>Software Engineer - <strong>Frontend</strong> </p>
					<span>TIESSIA ADAMA</span>
					<div className='socials'>
						<a href="/#"><img src={linkedin_ico} alt="linkedIn icon" /></a>
						<a href="/#"><img src={github_ico} alt="github icon" /></a>
					</div>
				</div>					
			</div>
		</>
	);
};

export default About;
