import React, { Component } from 'react'
import logo from './logo.svg'
import './App.less'

export default class App extends Component {
	render() {
		return (
			<div className="wrapper">
				<span><img src={logo} alt=""/></span>
				<h3 className="info">Hello Freelog !</h3>
			</div>	
		)
	}
}
