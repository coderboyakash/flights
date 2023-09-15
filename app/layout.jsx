import './globals.css'
import { Roboto } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400'] })

export const metadata = {
	title: 'Next App',
	description: 'Next App',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				{children}
			</body>
		</html>
	)
}
