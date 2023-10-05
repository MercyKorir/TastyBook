import React from 'react';
import '../styles/About.css';
import avatar from '../assets/user_icon.png'


const About = () => {

	return (
		<>
			<div id='about'>
				<p>About Us</p>
				<div>
					<img src={avatar} alt="Mercy Korir" />
					<p>Software Engineer - <strong>Backend</strong> </p>
					<span>Mercy Korir</span>
				</div>
				<div>
					<img src={avatar} alt="Fayçal OUEDRAOGO" />
					<p>Software Engineer - <strong>Frontend</strong> </p>
					<span>Fayçal OUEDRAOGO</span>
				</div>
				<div>
					<img src={avatar} alt="TIESSIA ADAMA" />
					<p>Software Engineer - <strong>Frontend</strong> </p>
					<span>TIESSIA ADAMA</span>
				</div>					
			</div>
		</>
	);
};

export default About;
