export default async function getUsers(authToken: string): Promise<any[]> {
    const response = await fetch('https://coders-camp-organization-app.herokuapp.com/api/users', {
        method: 'GET',
        headers: {
            'x-auth-token': authToken,
            'Access-Control-Allow-Origin': '*',
        }
    });
    const json = await response.json();
    if( !(json.ok) ) throw Error(json.message);
    return json as any[];
}