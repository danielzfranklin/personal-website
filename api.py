import json

from flask import Flask, Response, request, escape
from google.appengine.api import urlfetch

app = Flask("api")
app.config.from_pyfile("config.py")

prefix = "/api/"


@app.route(prefix + "contact", methods=["GET", "POST"])
def contact():
	"""
	Send an email to email from contact page inputs of name, email, subject, message, user agent
	and server collected input of ip
	:return: nothing
	"""
	send_to = "danielf@openmailbox.org"

	data = json.loads(request.data.decode())

	body_content = "<b>Name:</b> " + data["name"] + "<br><b>Email:</b> " + data["email"] + "<br><b>User Agent:</b> " + \
		data["useragent"] + "<br><b>Message:</b><br>" + data["message"]

	message = {
		"key": app.config["MANDRILL_API_KEY"],
		"message": {
			"html": body_content,
			"subject": data["subject"],
			"from_email": data["email"],
			"from_name": data["name"],
			"to": [
				{
					"email": send_to,
					"name": "Daniel Franklin"
				}
			]
		}
	}

	url = "https://mandrillapp.com/api/1.0/messages/send.json"
	headers = {'Content-Type': 'application/x-www-form-urlencoded'}

	response = urlfetch.fetch(url=url, payload=json.dumps(message), method=urlfetch.POST, headers=headers)

	return "success", 200
