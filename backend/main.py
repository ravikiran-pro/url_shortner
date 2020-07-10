from flask import Flask,redirect,request,jsonify
from db import DB
import requests

app=Flask(__name__)

@app.route('/shortner',methods=['GET'])
def url_shortner():
    url=request.args.get('url')
    try:
    	requests.get(url)
    	return jsonify(DB().add(url))	
    except:
    	return jsonify("invaliddata")

@app.route('/<token>')
def redirector(token):
    url=DB().get(token)
    print(url)
    return redirect(url)

if __name__=="__main__":
    app.run(debug=True)
