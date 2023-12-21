import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { apiSignIn, apiSignUp } from 'services/AuthService';
import appConfig from 'configs/app.config';
import { REDIRECT_URL_KEY } from 'constants/app.constant';
import { setUser, initialState } from 'store/auth/userSlice'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import { useNavigate } from 'react-router-dom';
import useQuery from './useQuery';
import { setCookie } from './cookie';
import { getMemInfoFromToken } from './parseToken';

function useAuth() {
    const navigate = useNavigate();
    const query = useQuery();
    const dispatch = useDispatch()

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values);
            const token = resp.data.data.access_token
            setCookie(token);
            dispatch(onSignInSuccess(token));

            const memberInfo = getMemInfoFromToken(token);
            dispatch(setUser(memberInfo));

            if (resp != null) {
                const redirectUrl = query.get(REDIRECT_URL_KEY);
                navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
                return {
                    status: 'success',
                    message: '',
                };
            }
        } catch (errors) {
            console.log(errors);
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            };
        }

        
        
    };

    const signUp = async (values) => {
    };

    const signOut = async () => {
        Cookies.remove('access_token');
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath);
    };

    const isAuthenticated = () => {
        return !!Cookies.get('access_token');
    };

    return {
        authenticated: isAuthenticated(),
        signIn,
        signUp,
        signOut,
    };
}

export default useAuth;