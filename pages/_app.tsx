import React from 'react';
import Head from 'next/head';
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
			<>
				<Head>
					<title>Product Hunt</title>
					<meta
						name='viewport'
						content='minimum-scale=1, initial-scale=1, width=device-width'
					/>
				</Head>
				<Layout loading={loading}>
					<Component {...pageProps} />
				</Layout>
			</>
		</Provider>
	);
}

export default MyApp;
