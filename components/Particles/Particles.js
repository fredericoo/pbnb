import { default as ParticlesJs } from "react-particles-js";

const Particles = () => (
	<div
		style={{
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
		}}
	>
		<ParticlesJs
			params={{
				particles: {
					number: {
						value: 150,
						density: {
							enable: true,
							value_area: 1803.4120608655228,
						},
					},
					color: {
						value: "#73b0a6",
					},
					shape: {
						type: "circle",
						stroke: {
							width: 0,
							color: "#000000",
						},
						polygon: {
							nb_sides: 4,
						},
					},
					opacity: {
						value: 0.3,
						random: false,
						anim: {
							enable: false,
							speed: 1,
							opacity_min: 0.1,
							sync: false,
						},
					},
					size: {
						value: 5,
						random: true,
						anim: {
							enable: false,
							speed: 40,
							size_min: 0.1,
							sync: false,
						},
					},
					line_linked: {
						enable: true,
						distance: 0,
						color: "#ffffff",
						opacity: 0.3687847739990702,
						width: 0.6413648243462091,
					},
					move: {
						enable: true,
						speed: 2,
						direction: "top",
						random: true,
						straight: false,
						out_mode: "out",
						bounce: false,
						attract: {
							enable: false,
							rotateX: 600,
							rotateY: 1200,
						},
					},
				},
				interactivity: {
					detect_on: "none",
					events: {
						onhover: {
							enable: false,
							mode: "grab",
						},
						onclick: {
							enable: false,
							mode: "bubble",
						},
						resize: true,
					},
					modes: {
						grab: {
							distance: 400,
							line_linked: {
								opacity: 1,
							},
						},
						bubble: {
							distance: 400,
							size: 40,
							duration: 2,
							opacity: 8,
							speed: 3,
						},
						repulse: {
							distance: 100,
							duration: 0.4,
						},
						push: {
							particles_nb: 4,
						},
						remove: {
							particles_nb: 2,
						},
					},
				},
				retina_detect: true,
			}}
		/>
	</div>
);

export default Particles;
