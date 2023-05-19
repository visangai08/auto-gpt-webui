declare const process: any;

function getBackendUrlHost() {
<<<<<<< HEAD
  const defaultUrl = 'http://10.214.2.34:2200';
=======
  const defaultUrl = 'http://10.214.2.33:2200';
>>>>>>> 298329a820d7ddff12584a0c07f6a0b5096b5812
  const envUrl = process?.env?.BACKEND_URL || '';
  const localStorageUrl = localStorage.getItem('backendUrl') || '';
  const urlParam = new URLSearchParams(window.location.search).get('api') || '';
  const result =  urlParam || localStorageUrl || envUrl || defaultUrl;
  const resultWithoutTrailingSlash = result.replace(/\/$/, '');
  return resultWithoutTrailingSlash;
}

export function getBackendApiUrl() {
  return getBackendUrlHost();
}

export function getBackendSocketUrl() {
  return getBackendUrlHost().replace(/^http/, 'ws');
}
