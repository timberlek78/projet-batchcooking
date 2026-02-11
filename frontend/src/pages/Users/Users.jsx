import { useState } from "react";
import UsersRegister from "./UsersRegister";
import style from "./users.module.css";
import UsersLogin from "./UsersLogin";

function Users() {
	
	const [hasAccount, setHasAccount] = useState(false);

	return (
		<div className={style.login_wrap}>
			{
				hasAccount ? <UsersLogin hasAccount = {() => setHasAccount(!hasAccount)} /> : <UsersRegister hasAccount = {() => setHasAccount(!hasAccount)} />
			}
			
		</div>
	);
}

export default Users;
