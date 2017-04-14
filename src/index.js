import {render} from 'react-dom';
import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';

class Pokemon extends Component{

  buttonClicked(element) {
      render(<PokemonDetail pokeID={element}/>,document.getElementById('app'))
  }

  render(){
    const {pokemon,id} = this.props;
    return <div className="pokemon--species col-lg-3 col-md-6 col-sm-12 col-xs-12" onClick={this.buttonClicked.bind(this, id)}>
            <div className="pokemon--species--container">
              <img className='image' src={`/public/sprites/${id}.png`} />
              <div className='middle'>
                <div className='pokemon--species--name'> {pokemon.name} </div>
              </div>
            </div>
          </div>;
    }
}


class PokemonDetailItem extends Component{
  render(){
    const {pokemondetail,id} = this.props;
    return <div className="container">
      <div className="row">
        <div className="pokemon--species push-lg-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <div className="pokemon--species--container">
            <img className='image-detail' src={pokemondetail.sprites.front_default} />
          </div>
        </div>
        <div className="pokemon--species push-lg-3 col-lg-3 col-md-9 col-sm-12 col-xs-12">
          <ul className="list-detail">
            <li>
              Name : {pokemondetail.forms[0].name}
            </li>
            <li>
              Type : {pokemondetail.types[0].type.name}
            </li>
            <li>
              Ability : {pokemondetail.abilities[0].ability.name}
            </li>
            <li>
              Weight : {pokemondetail.weight}
            </li>
            <li>
              Height : {pokemondetail.height}
            </li>
          </ul>
        </div>
        <div className="clearfix"></div>    
      </div>        
        <br/><br/>
        <center><a href="/">Back to list Pokedex</a></center>    
    </div>         
          ;
    }
}

//The PokemonList component shows nothing when it mounts for the first time.
//But right before it mounts on to the DOM, it makes an
//API call to fetch the first 151 pokemon from the api and
//then displays them using the Pokemon Component
class PokemonList extends Component{
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
    };
  }
  componentWillMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.salestock.net:8000/api/v2/pokemon?limit=150').then(res=>res.json())
    .then(response=>{
      this.setState({
        species : response.results,
        loading : true,
        fetched : true
      });
    });
  }

  render(){
    const {fetched, loading, species} = this.state;
    let content ;
    if(fetched){
      content = <div className="pokemon--species--list">
      {species.map((pokemon,index)=><Pokemon key={pokemon.name} id={index+1} pokemon={pokemon}/>)}
      </div>;
    }else if(loading && !fetched){
        content = <p> Loading ...</p>;
    }
    else{
      content = <div/>;
    }
    return <div>
            {content}
          </div>;
  }
}

class PokemonDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
    };
  }
  componentWillMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.salestock.net:8000/api/v2/pokemon/'+this.props.pokeID).then(res=>res.json())
    .then(response=>{
      var arr = [];
      arr.push(response);
      this.setState({
        species : arr,
        loading : true,
        fetched : false
      });
    });
  }

  render(){
    const {fetched, loading, species} = this.state;
    let content ;
    content = <div className="pokemon--species--list">
      {species.map((pokemondetail,index) => <PokemonDetailItem key={this.props.pokeID} id={this.props.pokeID} pokemondetail={pokemondetail}/>)}
    </div>;
    return <div className="pokeapp">
      <h1><center> Pokemon Detail </center></h1>
      <div>
        {content}
      </div>
    </div>;
  }
}


//This is the root component
class PokeApp extends Component{
  render(){
    return <div className="pokeapp">
      <h1><center> The Salestock Indonesia PokeDex! </center></h1>
      <PokemonList/>
    </div>;
  }
}

render(<PokeApp/>,document.getElementById('app'))
