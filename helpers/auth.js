import cookie from 'js-cookie'

// Cookie set
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            expires: 1 //1 gün
        }) 
    }
}
// Cookie sil
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1 //1 gün
        });
    }
};


// Cookie al
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// LocalStorage set
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Localstorage sil
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Kullanıcı auth
export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};


// Kullanıcı info
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

// Kullanıcı çıkış
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

// Kullanıcı güncelle
export const updateUser = (response, next) => {
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};