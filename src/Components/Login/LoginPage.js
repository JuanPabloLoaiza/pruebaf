import axios from 'axios';

export const LoginPage = async () => {
    const url = 'http://localhost:3001/user';

    const data = async () => {
        const user = await axios.get(url);
        return user;
    };

    return await data();
}
