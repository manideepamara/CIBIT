function Home(props) {
    return (
        <h1>
            Home
            {props.match.params.acid}
        </h1>
    )
}


export default Home;