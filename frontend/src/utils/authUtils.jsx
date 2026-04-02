export function isConnected()
{
    const user = JSON.parse(localStorage.getItem('user'));

    return user ? true : false;
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