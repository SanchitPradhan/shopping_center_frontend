import logo from '../Images/SuperShoopy-Vert.svg'


const Home = () => {
    return (
        <div className='text-center'>
            <center><img src={logo} alt="logo" className='home-logo' /></center>
            <center><h3 className='home-heading'><strong>Welcome to SuperShoppy.<br/>Browse for best deals.<br/>Happy Shopping!</strong></h3></center>
            {/* <h4 className='home-heading'><strong>Browse for best deals.</strong></h4>
            <h5 className='home-heading'><strong>Happy Shopping!</strong></h5> */}
        </div>
    );
}

export default Home;