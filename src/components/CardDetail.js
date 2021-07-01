import CardSvg from '../Assets/Card.svg';
import DeckSvg from '../Assets/Card.svg';
import GenderMaleSvg from '../Assets/Card.svg';
import GenderFemaleSvg from '../Assets/Card.svg';
import HomeworldSvg from '../Assets/Homeworld.svg';
import VehicleSvg from '../Assets/Card.svg';
import StarshipSvg from '../Assets/Starship.svg';


const CardDetail = ({type,value}) => {
    var detailName  = "";
    var svg;
    switch(type){
        case 1:{
            detailName = "HOMEWORLD";
            svg = HomeworldSvg;
            break;
        }
        case 2:{
            detailName = "VEHICLES";
            svg = VehicleSvg;
            break;
        }
        case 3:{
            detailName = "STARSHIPS";
            svg = StarshipSvg;
            break;
        }
        case 4:{
            detailName = "VEHICLE";
            svg = VehicleSvg;
            break;
        }
        case 5:{
            detailName = "STARSHIP";
            svg = StarshipSvg;
            break;
         }
    }
    return (
                <div className='detail'>
                    <div style={{flex:1,display:'flex'}}> 
                        <span>
                            <img src={HomeworldSvg}></img>
                        </span> <span  className= 'detailName'> {detailName} </span>
                    </div>
                    <p className='detail-value' >{value}</p>
                </div>
    )
}

export default CardDetail