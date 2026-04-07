export function isConnected()
{
    const user  = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    return user && token ? true : false;
}

export function disconnect()
{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

export function connecte(user, token)
{
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('user_id', user.user_id);
	localStorage.setItem('token',JSON.stringify(token));
}

export function updateLocal(user)
{
    localStorage.removeItem('user');
	localStorage.setItem('user', JSON.stringify(user));

    const tout = Object.fromEntries(
		Object.keys(localStorage).map(key => [key, localStorage.getItem(key)])
	);
    console.log("aaa",tout);
	

    console.log("USER", localStorage.getItem('user'));
}