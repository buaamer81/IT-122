// data.js

// Array of objects representing music albums
const items = [
    {
      id: 1,
      title: 'Thriller',
      artist: 'Michael Jackson',
      year: 1982,
      genre: 'Pop'
    },
    {
      id: 2,
      title: 'Back in Black',
      artist: 'AC/DC',
      year: 1980,
      genre: 'Rock'
    },
    {
      id: 3,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      genre: 'Progressive Rock'
    },
    {
      id: 4,
      title: 'Rumours',
      artist: 'Fleetwood Mac',
      year: 1977,
      genre: 'Rock'
    },
    {
      id: 5,
      title: 'The Wall',
      artist: 'Pink Floyd',
      year: 1979,
      genre: 'Progressive Rock'
    }
  ];
  
  //to get all albums
  export function getAll() {
    return items;
  }
  
  // to get a specific album by id
  export function getItem(id) {
    return items.find(item => item.id === Number(id));
  }
  