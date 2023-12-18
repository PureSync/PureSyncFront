import Cookies from 'js-cookie';
import { apiSignIn, apiSignOut, apiSignUp } from 'services/AuthService';
import appConfig from 'configs/app.config';
import { REDIRECT_URL_KEY } from 'constants/app.constant';
import { useNavigate } from 'react-router-dom';
import useQuery from './useQuery';

function useAuth() {
    const navigate = useNavigate();
    const query = useQuery();

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values);
           
            if (resp!=null) {
                // const { token } = resp.data;
                // Cookies.set('auth_token', token, { expires: 1 }); 
                const redirectUrl = query.get(REDIRECT_URL_KEY);
                navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
                return {
                    status: 'success',
                    message: '',
                };
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            };
        }
    };

    const signUp = async (values) => {
    };

    const signOut = async () => {
        await apiSignOut();
        Cookies.remove('access_token');
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