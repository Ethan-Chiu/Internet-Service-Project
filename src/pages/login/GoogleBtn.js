import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const CLIENT_ID = "731618628480-i8dpp2um5acq3te2kb2gaaic8i4vsq28";

class GoogleBtn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogined: false,
			accessToken: "",
		};

		this.login = this.login.bind(this);
		this.handleLoginFailure = this.handleLoginFailure.bind(this);
		this.logout = this.logout.bind(this);
		this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
	}

	login(response) {
		if (response.accessToken) {
			this.setState((state) => ({
				isLogined: true,
				accessToken: response.accessToken,
			}));
		}
	}

	logout(response) {
		this.setState((state) => ({
			isLogined: false,
			accessToken: "",
		}));
	}

	handleLoginFailure(response) {
		alert("Failed to log in");
	}

	handleLogoutFailure(response) {
		alert("Failed to log out");
	}

	getInformation() {
		const Http = new XMLHttpRequest();
		var url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token="+this.state.accessToken;
		Http.open("Get", url);

		Http.onreadystatechange = function() {
			if(Http.readyState === 4 && Http.status === 200)
			{
				console.log(Http.responseText);
			}
		};
	}

	render() {
		return (
			<>
				{this.state.isLogined ? (
					<div className="g-signin2" data-onsuccess="onSignIn">
						<GoogleLogout
							icon = {false}
							clientId={CLIENT_ID}
							buttonText="Logout"
							onLogoutSuccess={this.logout}
							onFailure={this.handleLogoutFailure}
							render={renderProps => (
								<a className="social" onClick={renderProps.onClick} disabled={renderProps.disabled}><FontAwesomeIcon icon={faGoogle} size="2x"/></a>
							  )}
						></GoogleLogout>
					</div>
				) : (
					<GoogleLogin
						icon = {false}
						clientId={CLIENT_ID}
						buttonText="Login"
						onSuccess={this.login}
						onFailure={this.handleLoginFailure}
						cookiePolicy={"single_host_origin"}
						responseType="code,token"
						render={renderProps => (
							<a className="social" onClick={renderProps.onClick} disabled={renderProps.disabled}><FontAwesomeIcon icon={faGoogle} size="2x"/></a>
						  )}
					></GoogleLogin>
				)}
				
				{this.getInformation()}
			</>
		);
	}
}

export default GoogleBtn;
