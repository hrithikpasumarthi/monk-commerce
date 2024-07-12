import React from "react";
import "./styles/app.scss";
import timeline from "./assets/timeline.png";
import workExperience from "./assets/workExperience.webp";

const App = () => {
	return (
		<>
			<h1 className="header">
				Welcome to React App thats build using Webpack and Babel
				separately
			</h1>

			<img width="40" height="40" src={timeline} alt="timeline" />
			<img width={50} height={50} src={workExperience} alt="work exp" />
			<div className="row">
				<div className="column large-6">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Minus doloribus reprehenderit voluptatum sint dolor, ab quas
					aut incidunt voluptates perspiciatis odio cumque vero et in
					odit repellendus dolore architecto modi?
				</div>
				<div className="column large-6">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Minus doloribus reprehenderit voluptatum sint dolor, ab quas
					aut incidunt voluptates perspiciatis odio cumque vero et in
					odit repellendus dolore architecto modi?
				</div>
				<div className="column large-2">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Minus doloribus reprehenderit voluptatum sint dolor, ab quas
					aut incidunt voluptates perspiciatis odio cumque vero et in
					odit repellendus dolore architecto modi?
				</div>
			</div>
		</>
	);
};

export default App;
