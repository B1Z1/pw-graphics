import './style.scss';
import { Scene } from './scene/Scene';

window.addEventListener('load', () => {
	new Scene('#canvas');
});