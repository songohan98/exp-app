import React, { useState} from 'react';

const CheckboxComponent = () => {

  const divStyle= {

    color: 'white',
    backgroundColor: '#282c34',
    margin: '40px',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    height: '150px',
    boxShadow: '0 0 10px 5px white',
    overflow: 'auto',
  };

  const barStyle = {

    boxSizing: 'border-box',
    color: 'black',
    backgroundColor: 'AliceBlue',
    width: '90%',
    margin: '40px',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    boxShadow: '0 0 10px 5px white',

  };

  const initialNumbers = Array.from({ length: 100 }, (_, i) => i + 1000);
  const [getNumbers, setNumbers] = useState(initialNumbers.map((num) => ({ number: num, checked: false })));
  const [selectAll, setSelectAll] = useState(false);
  

  const [getQuery, setQuery] = useState('');
  const [getsecQuery, setsecQuery] = useState('');


  const handleChange = (event) => {
    setQuery(event.target.value);
    filterByMatch();
  };

  const handleChangeDifferent = (event) => {
    setsecQuery(event.target.value);
    filterByMatchDifferent(event.target.value);
  };

  const filterByMatch = () => {
    const matchingString = getQuery;
    console.log("What getQuery has after setQuery is called inside function: " + matchingString);
    const string = getQuery.toLowerCase(); // Convert the query to lowercase for case-insensitive comparison
    const updatedNumbers = getNumbers.map((num) => ({
      ...num,
      checked: num.number.toString().toLowerCase().includes(string) // Check if the number contains the query string
    }));
    setNumbers(updatedNumbers);
  }

  const filterByMatchDifferent = (matchingString) => {
    console.log("What getQuery has after setQuery is called inside direct passing function: " + matchingString);
    const string = getQuery.toLowerCase(); // Convert the query to lowercase for case-insensitive comparison
    const updatedNumbers = getNumbers.map((num) => ({
      ...num,
      checked: num.number.toString().toLowerCase().includes(string) // Check if the number contains the query string
    }));
    setNumbers(updatedNumbers);
  }

  const handleCheckboxChange = (index) => {
    const updatedNumbers = [...getNumbers];
    updatedNumbers[index].checked = !updatedNumbers[index].checked;
    setNumbers(updatedNumbers);
    setSelectAll(updatedNumbers.every((num) => num.checked));
  };

  const handleSelectAllChange = () => {
    const updatedNumbers = getNumbers.map((num) => ({ ...num, checked: !selectAll }));
    setNumbers(updatedNumbers);
    setSelectAll(!selectAll);
  };

  return (
    <div className='module'>
      <h3 style={{color:'white', textAlign:'center'}}>State version: </h3>
      <div style={divStyle}>
        {getNumbers.map((num, index) => (
          <div key={num.number} style={{ width: '10%', marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={num.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              {num.number}
            </label>
          </div>
        ))}
      </div>
      <div style={barStyle}>
        <input
          type="text"
          value={getQuery}
          onChange={handleChange}
          placeholder="Search..."
        />
      </div>
      <h3 style={{color:'white', textAlign:'center'}}>Passing event directly version: </h3>
      <div style={divStyle}>
        {getNumbers.map((num, index) => (
          <div key={num.number} style={{ width: '10%', marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={num.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              {num.number}
            </label>
          </div>
        ))}
      </div>
      <div style={barStyle}>
        <input
          type="text"
          value={getsecQuery}
          onChange={handleChangeDifferent}
          placeholder="Search..."
        />
      </div>
      <div style={barStyle}>
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          Select All
        </label>
        <label>
          <input
            type="checkbox"
            checked={!selectAll}
            onChange={handleSelectAllChange}
          />
          Deselect All
        </label>
      </div>
    </div>
  );
};

export default CheckboxComponent;
