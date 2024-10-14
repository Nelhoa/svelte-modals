import { browser } from '$app/environment';

export const PHONE_MODE_PX = 360;
export function isPhone() {
	if (!browser) return false;
	const windowWidth = window.innerWidth;
	return windowWidth <= PHONE_MODE_PX;
}
