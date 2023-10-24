import { useState } from 'react'

const SearchBar = () => {
  const [textSearch, setTextSearch] = useState('');
  

  const handleChange = (value) => {
    setTextSearch(value)
  }

  const onSearch = () => {
    console.log('Clic Search Button')

  }

  return (
    <div className="c-search">

      <input
        id="input-search"
        placeholder='Buscar'
        className="search__input"
        value={textSearch}
        onChange={e => handleChange(e.target.value)}
        type='search' />
      

      <button 
        className="search__button" 
        onClick={onSearch}
      >
        Buscar</button>

    </div>
  );
}

export default SearchBar
