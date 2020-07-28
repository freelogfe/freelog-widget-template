import './index.less'
import logoUrl from './logo.svg'

export default function mountApp() {
	const $app = document.querySelector('#freelog-app')
	const $img = document.createElement('img')
	const $title = document.createElement('h3')
	$img.src = logoUrl
	$title.textContent = 'Hello Freelog App!'
	$app.appendChild($img)
	$app.append($title)
}
