export default async function getTodos(): Promise<any[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json() as any[];
    return data;
}