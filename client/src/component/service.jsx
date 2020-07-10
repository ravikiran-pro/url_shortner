import React from 'react';
import {Button,Spinner} from 'react-bootstrap';
import './../styles/view.css'
import clipboardIcon from './../clipboard.png'

class service extends React.Component{
	constructor(props){
		super(props);
		this.state={
			url:'',
			urls:[],
			error:'',
			status:true,
			copied:false,
		}
		this.Request_service=this.Request_service.bind(this);
		this.handleinput=this.handleinput.bind(this);
	}
	Request_service =() =>{
		this.setState({status:false});
		const url="/shortner?url="+this.state.url;
		fetch(url)
		  .then(response => response.json())
		  .then(data => {
		  	  if(data==="invaliddata"){
		  	  this.setState(()=>{
		  	  	return{
		  	  		error:"The web address is not available"
		  	  	}
		  	  }) 
		  	  return }
			  var datas=this.state.urls;
			  datas.push(data);
			  this.setState((state)=>{
				  return {
					urls:datas,
					url:'',
					error:'',
					copied:'copied',
				  }
			  })
		  })
	}
	componentDidUpdate(){ this.state.status=true;}
	handleinput=(event)=>{
		this.setState({url:event.target.value});
	}
	render(){
		return (
			<div className="view">
				<input type="text" id="Urlinput" name="url" value={this.state.url}
					onChange={this.handleinput}
					placeholder="enter url to be shortened"/>
				<Loader Request_service={this.Request_service}
				status={this.state.status}
				/>
				<br/><i className="error">{this.state.error}</i>
				<div className="lists">
					<UrlList urls={this.state.urls}/>
				</div>
			</div>
	)
        }
}
function Loader(props){
		return(
			<>
				<button value="shorten" id="loader" onClick={props.Request_service}>
				Shortener
					<Spinner animation="border" className="spinner" 
					size="sm" style={{color:'#1BC60C'}} 
					hidden={props.status}/>
				</button>
			</>)
}
function UrlList(props){
	const sleep = (time) => {
  		return new Promise((resolve) => setTimeout(resolve, time));
	}
	const response =(event)=>{
		var name=	event.target.className;
		var ele=document.getElementsByClassName(name);
		navigator.clipboard.writeText(ele[0].innerText);
		ele[2].innerHTML="copied!"
			sleep(200).then(() => {
   				ele[2].innerHTML=""
			});
	}
	const list=props.urls.slice(0).reverse().map((name,index)=>{
		return (
			<div class="list">
				<label id="labels" key={name} className={name}>{"http://localhost:5000/"+name}</label>
				<img src={clipboardIcon}
					onClick={response} id="clip" className={name} />
					<sup className={name}></sup>
			</div>
		)
	});
	
	return <>{list}</>
}
export default service;
