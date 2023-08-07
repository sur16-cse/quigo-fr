export function setDataToStorage(key:string,value:any){
    window.localStorage.setItem(key,JSON.stringify(value))
  }

export function getDataFromStorage(key:string){
    return JSON.parse(localStorage.getItem(key) || '{}')
  }
