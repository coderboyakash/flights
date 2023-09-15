import { Roboto } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from '../providers/StoreProvider';
import { NextAuthProvider } from '../providers/NextAuthProvider';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400'] })

export const metadata = {
	title: 'Next Login',
	description: 'Next Login',
}

export default function AuthLayout({ children }) {
	return (
		<Providers>
			<NextAuthProvider>
				{children}
			</NextAuthProvider>
		</Providers>
	)
}
