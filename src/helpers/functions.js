import { auth } from '../../firebase.js';

const signIn = async (email, password) => {
        let response = await auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                // it successfully signed in a registered user with email and password
                if (auth) {
                    return { success: true, auth };
                }
            })
            .catch(error => {
                return { success: false, message: error.message };
            });
            return response;
}

const register = async (email, password) => {
        let response = await auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    return { success: true, auth };
                }
            })
            .catch(error => {
                return { success: false, message: error.message };
            });
            return response;
}
  
const update = async (password) => {

        const passwordUpdate = async (password) => {
        let response = await auth
                        .currentUser
                        .updatePassword(newPassword)
                        .then((auth) => {
                            if (auth) {
                                return { success: true, message: 'Update successful' };
                            }
                        })
                        .catch(error => {
                            return { success: false, message: error.message };
                        });
            return response;
        }

        await auth
            .onAuthStateChanged(authUser => {
                
                if (authUser) {
                    // the user just logged in / the user was logged in
                    console.log('user is signed in as > ', authUser?.email);      
                    passwordUpdate(password);
                } else {
                    // the user is logged out
                    console.log('User is not signed in');
                    return { success: false, message: 'User is not signed in' };
                };
            });
}
    
export { signIn, register, update };