import Cookies from 'cookies';
import { dbConnect } from '../../../lib/db';
import { User } from '../../../models';
import catchErrors from '../../../helpers/api/catchErrors';

const handler = async (req, res) => {
	await dbConnect();

	if (req.method === 'POST') {
		const cookies = new Cookies(req, res);
		const token = cookies.get('auth');
		if (token) {
			const user = await User.verifyToken(token);
			res.status(200).json({
				isAuth: true,
				user,
			});
		} else {
			res.status(200).json({
				isAuth: false,
			});
		}
	}
};

export default catchErrors(handler);
