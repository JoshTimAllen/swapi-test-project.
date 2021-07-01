//import logo from './logo.svg';
import './css/App.css';
import './css/Card.css';

import Card from './components/Card';
import Breadcrumb from './components/Breadcrumb';
import VectorSvg from './Assets/Vector.svg';
import SearchSvg from  './Assets/Search.svg'
import CardSvg from './Assets/Card.svg';

import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

var People = "";
var Ascending = true;

var sortingOperation = "";

const SortingOperation = {
	Name: 0,
  Homeworld: 1,
  Vehicles: 2,
  Starships: 3,
  Species: 4
}
class peopleCacheData {
  constructor(person) { 
   this. person  = person; 
   this. homeworld = "";
   this. species = '';
  }
}
var peopleArray = [];

var allCards = [];
var displayResults = [];
function App() {
  var [breadcrumbPath,setbreadcrumbpath] = useState(<Breadcrumb crumbName='Select a card'/>);

  GetPeople();
  function GetPeople(){
    if(People!=""){return}
    const request = new XMLHttpRequest();
    request.onload = function() {
        People = JSON.parse(request.responseText);
        console.log(request.responseText);

        for(var c = 0; c < People.results.length; c++){
          var cached = new peopleCacheData(People.results[c]);
          GetHttp(People.results[c].homeworld,(data)=>{
            cached.homeworld = JSON.parse(data).name;
          });
          if(People.results[c].species.length>0){
          GetHttp(People.results[c].species[0],(data)=>{
            cached.species = JSON.parse(data).name;
            console.log(JSON.parse(data).name);
          });
        }
          peopleArray.push(cached);
        }        
        displayResults = People.results;
        DisplayAllCards();
      }
      request.open("GET", "https://swapi.dev/api/people");
      request.setRequestHeader("Content-Type", "application/json");
      request.send();
  }
  function GetHttp(url  = "", callback){
    const request = new XMLHttpRequest();
    request.onload = function() {
         callback(request.responseText);
      }
      request.open("GET", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.send();
  }

  function  DisplayAllCards(){
    breadcrumbPath = ( <Breadcrumb crumbName='Select a card'   func={()=>{}}  displayArrow = { true  }  />);
    setbreadcrumbpath(()=>[breadcrumbPath]);
    allCards=[];
    ClearCards();
    for(var c = 0; c < displayResults.length; c++){      
      DisplayCard(displayResults[c]);
    }
    document.getElementById ('SearchArea').style.display = 'flex';
  }

  function  DisplayCard(data){
     var card =  render(ReactDOM.createPortal(<Card person = {data} fullDisplay= { false} func={()=>{DisplayCardFullDetails(data)}}/>, document.getElementById ('CardsContainer')));
    allCards.push(card);
  }

  function DisplayCardFullDetails(data){
    ClearCards();
    var card =  render(ReactDOM.createPortal(<Card person = {data} fullDisplay= { true } func={()=>{ }}/>, document.getElementById ('CardsContainer')));
    allCards.push(card);
    breadcrumbPath = (<Breadcrumb crumbName={data.name} func={()=>{}}/>)
    setbreadcrumbpath(()=>[breadcrumbPath]);
    document.getElementById ('SearchArea').style.display = 'none';
  }

  function ClearCards(){    
    allCards = [];
    document.getElementById ('CardsContainer').innerHTML  =  "";
  }
  
function Search(event){
    if(event.key === 'Enter'){
    var SearchString = document.getElementById('SearchBar').value;
    GetHttp("https://swapi.dev/api/people/?search=" +  SearchString,(data)=>{
      displayResults = JSON.parse(data).results;
      DisplayAllCards();
    });
  }
}
    function SwitchAsceding(value){
      Ascending = value;
      if(!Ascending){        
        document.getElementById("DESC-Button").style.backgroundColor = "#B8B8B8"
        document.getElementById("ASC-Button").style.backgroundColor = "#FFFFFF"
    }
    else{      
        document.getElementById("DESC-Button").style.backgroundColor = "#FFFFFF";
        document.getElementById("ASC-Button").style.backgroundColor = "#B8B8B8";
    }
    SortResults(operation);
  }
  
  
var operation = 0;
  function SortResults(){
    operation = parseInt(document.getElementById('sortSelect').value);
    console.log(operation);
    switch(operation){
      case SortingOperation.Name:{
           displayResults.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          });
          if(!Ascending){
            displayResults.reverse();
          }
          DisplayAllCards();
         break;
      }
      case SortingOperation.Homeworld:{   
        var tempList = [];
        peopleArray.sort(function(a, b){
          if(a.homeworld < b.homeworld) { return -1; }
           if(a.homeworld > b.homeworld) { return 1; }
          return 0;
        }); 
        for(var c = 0; c < peopleArray.length; c++){
          tempList.push(peopleArray[c].person);
        }
        displayResults = tempList;
        
        if(!Ascending){
          displayResults.reverse();
        }
        DisplayAllCards();
       break;
      }
      case SortingOperation.Species:{        
        var tempList = [];
        peopleArray.sort(function(a, b){
          if(a.species < b.species) { return -1; }
           if(a.species > b.species) { return 1; }
          return 0;
        }); 
        for(var c = 0; c < peopleArray.length; c++){
          tempList.push(peopleArray[c].person);
        }
        displayResults = tempList;
        
        if(!Ascending){
          displayResults.reverse();
        }
        DisplayAllCards();
       break;
      }
      case SortingOperation.Vehicles:{
        displayResults.sort(function(a, b){
         if(a.vehicles.length < b .vehicles.length) { return -1; }
         if(a.vehicles.length > b.vehicles.length) { return 1; }
         return 0;
       });
       
    if(!Ascending){
      displayResults.reverse();
    }
       DisplayAllCards();
      break;
      }
      case SortingOperation.Starships:{
        displayResults.sort(function(a, b){
         if(a.starships.length < b.starships.length) { return -1; }
         if(a.starships.length > b.starships.length) { return 1; }
         return 0;
       });       
      if(!Ascending){
        displayResults.reverse();
      }
       DisplayAllCards();
      break;
      }
    }
  }
  return (
    <div className="BODY">
      <div className="container">
        <header>
          <div className = 'HeaderLeft'>
           <button className='bttn'> <img src={CardSvg}></img> <span> Cards </span></button> 
          </div>
          <div className = 'HeaderCentre'>
           <h1><span style = {{color:'rgba(58,58,58,1)'}}>SW-</span><span style = {{color:'rgba(117,117,117,1)'}}>API Deck Builder</span> </h1> 
          </div>
          <div className = 'HeaderRight'>
           <button className='bttn'></button> 
          </div>
        </header>
        <div className="Breadcrumb"> 
        <Breadcrumb  crumbName='All Cards' func ={()=>{
            DisplayAllCards();
        }} displayArrow={false}/>
        {breadcrumbPath}
        </div>
        <section>
<div id="SearchArea">
      <input className= 'SearchBar'  id='SearchBar' onKeyDown={(e)=>{Search(e);}}  placeholder="Search" >     
        </input> 
        <span className="SearchIcon"><a><img src={SearchSvg}></img></a></span> 
        <p style={{display: 'inline-block', color:"#3B3B3B",   paddingLeft:'10px'}}>Sort by</p>
      
      <span id="SortContainer">
      <div className='Sorting'>
        <select id="sortSelect" onChange={SortResults}>
        <option value={SortingOperation.Name}>Name</option>
          <option value={SortingOperation.Homeworld}>Homeworld</option>
          <option value={SortingOperation.Species}>Species</option>
          <option value={SortingOperation.Vehicles}>Vehicles</option>
          <option value={SortingOperation.Starships}>Starships</option>
        </select>
        </div>        
        </span>

        <div className="OrderSelection">
        <a id="ASC-Button" onClick={()=>{SwitchAsceding(true)}}>
          ASC
        </a>
        <a id="DESC-Button"  onClick={()=>{SwitchAsceding(false)}}>
          DESC
        </a>
        </div>

        </div>
        
      <div className='CardsContainer' id="CardsContainer">
       
      </div>
      </section>
      </div>
    </div>
  );
}

export default App;
