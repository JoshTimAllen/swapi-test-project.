import VectorSvg from '../Assets/Vector.svg';


const Breadcrumb = ({crumbName, func, displayArrow  = true}) => {
        return (
                <div className='crumb'>
                {displayArrow  &&
                <span><img className='vector' src={VectorSvg}></img></span> 
                }   
                <a className='crumb-name' onClick={()=>{func()}}>{crumbName}</a> 
                </div>
    )
}

export default Breadcrumb