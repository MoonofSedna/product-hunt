import { useState, useEffect } from 'react';

export default function useScreenSize({ size }: { size: string }) {
	const [mobileVersion, setMobileVersion] = useState<boolean>();

	useEffect(() => {
		const screen = {
			width: window.matchMedia(`(max-width: ${size} )`),
		};

		function handleResize() {
			if (screen.width.matches) {
				setMobileVersion(true);
			} else {
				setMobileVersion(false);
			}
			window.addEventListener('resize', handleResize);
		}
		handleResize();
	}, []);
	return mobileVersion;
}
