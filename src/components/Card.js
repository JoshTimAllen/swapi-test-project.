import CardSvg from '../Assets/Card.svg';
import DeckSvg from '../Assets/Card.svg';
import GenderMaleSvg from '../Assets/Card.svg';
import GenderFemaleSvg from '../Assets/Card.svg';
import HomeworldSvg from '../Assets/Homeworld.svg';
import VehicleSvg from '../Assets/Card.svg';
import CardDetail from './CardDetail'; 
import React, {Component, useState} from 'react';
import { render } from '@testing-library/react';

class Card extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            species:'-',
            homeWorld: '',
            vehicles: [],
            starships: [],
            func :  ()=>{}
        }
    }
    static homeWorld  = '';
    componentDidMount() {
        this.GetSpecies();
        this.GetHttp(this.props.person.homeworld,(data)=>{
            this.setState({
                 homeWorld: JSON.parse(data).name
            });
        });
        
        for(var c = 0; c < this.props.person.vehicles.length; c++){
            this.GetHttp(this.props.person.vehicles[c],(data)=>{
                var value  = JSON.parse(data).name;
                var  newVehicles = this.state.vehicles;
                if(!this.state.vehicles.includes(value)){
                    newVehicles.push(value);
                this.setState({
                        vehicles: newVehicles
                }); 
            }
            });
        }
        for(var c = 0; c < this.props.person.starships.length; c++){
            this.GetHttp(this.props.person.starships[c],(data)=>{
                var value  = JSON.parse(data).name;
                var  newStarships = this.state.starships;
                if(!this.state.starships.includes(value)){
                    newStarships.push(value);
                this.setState({
                        starships: newStarships
                }); 
            }
            });
        }
    }
    GetSpecies(){        
        if(this.props.person.species.length>0){
            this.GetHttp(this.props.person.species[0],(data)=>{
                
        this.setState({
            species: JSON.parse(data).name
        });
            });
        }
        else{
            this.setState({
                species: 'N/A'
            });
        }    
    }
    GetHttp(url  = "", callback){
        const request = new XMLHttpRequest();
        request.onload = function() {
             callback(request.responseText);
          }
          request.open("GET", url);
          request.setRequestHeader("Content-Type", "application/json");
          request.send();
      }
      
    func(){
        this.props.func();
    }
    render(){
        var fullDisplay  = this.props.fullDisplay;
        var details = [];
        
     details.push(   <CardDetail type={1} value ={this.state.homeWorld}/> );
        if(!fullDisplay){            
            details.push(<CardDetail type={2} value ={this.props.person.vehicles.length}/>);
            details.push(<CardDetail type={3} value ={this.props.person.starships.length}/>);
        }
        else  {
             for(var c = 0; c < this.props.person.vehicles.length; c++){
                details.push(<CardDetail type={4} value ={this.state.vehicles[c]}/>);
             }
             for(var c = 0; c < this.props.person.starships.length; c++){
                details.push(<CardDetail type={5} value ={this.state.starships[c]}/>);
             }
        }
        if(!fullDisplay){ }
        return (
            <div className="Card">
                <div className='CardHeader'>
                    <img src={CardSvg}></img>
                   <h3 className='CardName' onClick={()=>{ this.func()}}> {this.props.person.name}</h3> 
                </div>
                <div className='CardBody'>
                    <div className='CardBodyHeader'>
                <span> {this.props.person.birth_year} </span> <span>{this.state.species}</span>
                    </div>
                    {details}
                </div>
            </div>
        );
    }
}

export default Card

