import style from './password.module.css'
import Users from '../../constants/pages/users/Users.js'

function PasswordStrength({ level,className }) {
	const total = 4;

	const getColor = (i) => {
		if (i === 0) return '#F76936';
		if (i === 1) return '#F79A1E';
		if (i === 2) return '#FFF742';
		if (i === 3) return '#27F58B';
		return '#dcdcdc';
	};

	return (
		<div className={`${style.strength} ${style[className]}`}>
			{Array.from({ length: total }).map((_, i) => (
				<div
					key={i}
					className={`${style.bar} ${i < level ? style.active : ""}`}
					style={{
						backgroundColor: i < level ? getColor(i) : "#dcdcdc"
					}}
				/>
			))}
		</div>
	);
}



export default PasswordStrength