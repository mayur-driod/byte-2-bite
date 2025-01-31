import React from 'react'
import { useState } from 'react'
import cuisines from '../Data/Cusines.json'

function AIpage() {
    const [inputs, setInputs] = useState({
        Ingredients: '',
        Cusine: '',
        Diet: '',
        Hasoven: false,
        Time: null,
        minCalories: null,
        maxCalories: null,
    });
    const [filteredCuisines, setFilteredCuisines] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'Cusine' && value.length > 0) {
            setFilteredCuisines(
              cuisines.filter(cuisine =>
                cuisine.toLowerCase().includes(value.toLowerCase())
              )
            );
            setShowDropdown(true);
          } else {
            setShowDropdown(false);
          }
    }

    const handleSelect = (cuisine) => {
        setInputs(prevState => ({
            ...prevState,
            Cusine: cuisine
        }));
        setShowDropdown(false);
    }

  return (
    <>
        <div>
            <form >
                <div>
                    <label>Ingredients</label>
                    <input type="text" value={inputs.Ingredients} name="Ingredients" onChange={handleChange} placeholder="Enter ingredients" required/>
                </div>
                <div>
                    <label>Cusine</label>
                    <input type="text" value={inputs.Cusine} onChange={handleChange} onFocus={()=> setShowDropdown(true)} name="Cusine" placeholder='Enter your cusine' autoComplete='true' />
                    {showDropdown && filteredCuisines.length > 0 && (
                        <ul style={{ position: 'absolute', left: 0, right: 0, backgroundColor: 'white', border: '1px solid', borderRadius: '4px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '4px', zIndex: 1 }}>
                          {filteredCuisines.map((cuisine) => (
                            <li
                              key={cuisine}
                              onClick={() => handleSelect(cuisine)}
                              style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: 'white', color: 'black' }}
                            >
                              {cuisine}
                            </li>
                          ))}
                        </ul>
                        )}
                </div>

                <div>
                    <label>Diet</label>
                    <label>
                        <input 
                            type="radio" 
                            name="Diet" 
                            value="vegetarian" 
                            checked={inputs.Diet === "vegetarian"} 
                            onChange={handleChange} 
                            required 
                        />
                        Vegetarian
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="Diet" 
                            value="non-vegetarian" 
                            checked={inputs.Diet === "non-vegetarian"} 
                            onChange={handleChange} 
                            required 
                        />
                        Non-Vegetarian
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="Diet" 
                            value="vegan" 
                            checked={inputs.Diet === "vegan"} 
                            onChange={handleChange} 
                            required 
                        />
                        Vegan
                    </label>
                </div>

                <div>
                    <label>Do you have an oven?</label>
                    <input type="checkbox" name="Hasoven" checked={inputs.Hasoven} onChange={handleChange} />   
                </div>
                <div>
                    <label>How much time can you spend?</label>
                    <input type="number" name="Time" value={inputs.Time} onChange={handleChange} placeholder='please input in mins' min={5} step={5}/>
                </div>
                <div>
                    <div>
                        <label>What is your min calorie</label>
                        <input type="number" name="minCalories" value={inputs.minCalories} onChange={handleChange} placeholder='please input in kcal' min={100} step={100}/>
                    </div>
                    <div>
                        <label>What is your max calorie</label>
                        <input type="number" name="maxCalories" value={inputs.maxCalories} onChange={handleChange} placeholder='please input in kcal' min={101} step={100}/>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default AIpage