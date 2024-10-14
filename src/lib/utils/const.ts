export const PHONE_MODE_PX = 360;
export function isPhone() {
	if (!window) return false;
	const windowWidth = window.innerWidth;
	return windowWidth <= PHONE_MODE_PX;
}
