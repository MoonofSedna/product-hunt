import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import useAuthentication from '../hooks/useAuthentication';
// redux
import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
	const { loading } = useAuthentication();

	return (
		<Provider store={store}>
			<Layout loading={loading}>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
