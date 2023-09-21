import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


function App() {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }

  // returns state, & list
  const [robots, setRobots] = useState([]);
  // returns list
  const [searchfield, setSearchField] = useState('');
  const [count, setCount] = useState(0)

  // ------------(|||| life-cycle |||| components)----------------
  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response=> response.json())
  //     .then(users => {this.setState({ robots: users})});
  // }

  // useEffect asks "whats the side effect? / it runs every time APP is reloaded...!"
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => {setRobots(users)});
    

    // this helps with re-rendering robots, instead of having a bunch of lists console.log'ing we could set conditions...
  // -------------only console.log() when the 'object' inside re-renders(changes)---------------
  }, [])

  const onSearchChange = (event) => {
    // this.setState({ searchfield: event.target.value })
    setSearchField(event.target.value)
  }

  // render() {
    // const { robots, searchfield } = this.state;
  const filteredRobots = robots.filter(robot =>{
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })
    
  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <button onClick={()=>setCount(count+1)}>Click Me!</button>
        <a className='pa2'>Clicked {count} { count === 1 
        ? "time"
        : "times"
        }!</a>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }

  // }

export default App;