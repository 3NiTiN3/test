async function fetchData(url) {
    try {
        const res = await pm.sendRequest({ url, method: 'GET', header: { 'X-API-Key': 'your-api-key-here', 'Content-Type': 'application/json' }});
        return res.json();
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    }
}

function compareJSON(obj1, obj2, path = '') {
    const diff = {};
    const compare = (key) => JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key]);
    Object.keys(obj1).forEach(key => {
        const currentPath = path ? `${path}.${key}` : key;
        if (!obj2.hasOwnProperty(key)) diff[currentPath] = { oldValue: obj1[key], newValue: null };
        else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') Object.assign(diff, compareJSON(obj1[key], obj2[key], currentPath));
        else if (compare(key)) diff[currentPath] = { oldValue: obj1[key], newValue: obj2[key] };
    });
    Object.keys(obj2).forEach(key => { if (!obj1.hasOwnProperty(key)) diff[path ? `${path}.${key}` : key] = { oldValue: null, newValue: obj2[key] }; });
    return diff;
}

async function compareAPIURLs(url1, url2) {
    try {
        const [data1, data2] = await Promise.all([fetchData(url1), fetchData(url2)]);
        const differences = compareJSON(data1, data2);
        console.log('Differences between data fetched from API URL 1 and API URL 2:');
        for (const key in differences) console.log(`${key}:`, differences[key]);
    } catch (error) {
        console.error('Failed to fetch data from one or both URLs:', error);
    }
}

const url1 = 'https://simple-books-api.glitch.me/books/2';
const url2 = 'https://simple-books-api.glitch.me/books/1';
compareAPIURLs(url1, url2);
