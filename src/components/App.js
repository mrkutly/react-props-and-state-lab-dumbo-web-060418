import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all',
      }
    }
  }


  getPets = () => {
    if (this.state.filters.type === 'all'){
      fetch('/api/pets')
        .then(resp => resp.json())
        .then(json => this.setState({pets: json}))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(resp => resp.json())
        .then(json => this.setState({pets: json}))
    }
  }

  updateFiltersType = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onAdoptPet = (id) => {
    let currentState = this.state.pets.map(pet => (pet.id === id) ? {...pet, isAdopted: true} : pet)
    this.setState({ pets: currentState })
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFiltersType} onFindPetsClick={this.getPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
