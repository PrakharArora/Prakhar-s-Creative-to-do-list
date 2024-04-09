
//This is I created for stroing data in local storage and getting data from local storage
export const storeDataLocal = (key, data) => {
    const values = JSON.stringify(data);
    localStorage.setItem(key, values);
}
export const mylocal = (key) => {   
console.log(key);
}

export const getRecordsfromLocal = (key) => {
    const data = localStorage.getItem(key);
    if(data) {
        return JSON.parse(data);
    }
}