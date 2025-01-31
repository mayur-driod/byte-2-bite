import React, { useState } from 'react';
import cuisines from '../Data/Cusines.json';
import './AIpage.css';

function AIpage() {
    const [inputs, setInputs] = useState({
        Ingredients: '', // Store multiple ingredients
        Cuisines: [],  // Store multiple cuisines
        Diet: '', // stores diet (veg, non-veg, vegan)
        Hasoven: false, // stores if user has oven
        Time: null, // stores time in mins
        minCalories: 0, // stores min calories
        maxCalories: 0, // stores max calories
    });

    const [filteredCuisines, setFilteredCuisines] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cuisineInput, setCuisineInput] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCuisineChange = (e) => {
        const value = e.target.value;
        setCuisineInput(value);

        if (value.length > 0) {
            setFilteredCuisines(
                cuisines.filter(cuisine =>
                    cuisine.toLowerCase().includes(value.toLowerCase())
                )
            );
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleSelectCuisine = (cuisine) => {
        if (inputs.Cuisines.length < 3 && !inputs.Cuisines.includes(cuisine)) {
            setInputs(prevState => ({
                ...prevState,
                Cuisines: [...prevState.Cuisines, cuisine]  // Add selected cuisine
            }));
        }
        setCuisineInput('');
        setShowDropdown(false);
    };

    const removeCuisine = (cuisine) => {
        setInputs(prevState => ({
            ...prevState,
            Cuisines: prevState.Cuisines.filter(c => c !== cuisine)  // Remove selected cuisine
        }));
    };

    return (
        <>
            <div>
                <form>
                    <div>
                        <label>Ingredients</label>
                        <input 
                            type="text" 
                            value={inputs.Ingredients} 
                            name="Ingredients" 
                            onChange={handleChange} 
                            placeholder="Enter ingredients" 
                            required 
                        />
                    </div>

                    {/* Cuisine Selection */}
                    <div>
                        <label>Cuisine (up to 3)</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                            {inputs.Cuisines.map(cuisine => (
                                <span key={cuisine} style={{ 
                                    padding: '6px 10px', 
                                    backgroundColor: '#ddd', 
                                    borderRadius: '12px', 
                                    display: 'flex', 
                                    alignItems: 'center' 
                                }}>
                                    {cuisine} 
                                    <button 
                                        type="button" 
                                        onClick={() => removeCuisine(cuisine)} 
                                        style={{ 
                                            marginLeft: '6px', 
                                            border: 'none', 
                                            backgroundColor: 'transparent', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        ❌
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input 
                            type="text" 
                            value={cuisineInput} 
                            onChange={handleCuisineChange} 
                            onFocus={() => setShowDropdown(true)} 
                            placeholder="Type to search cuisines" 
                            disabled={inputs.Cuisines.length >= 3} 
                        />
                        {showDropdown && filteredCuisines.length > 0 && (
                            <ul style={{ 
                                position: 'absolute', 
                                left: 0, right: 0, 
                                backgroundColor: 'white', 
                                border: '1px solid', 
                                borderRadius: '4px', 
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                marginTop: '4px', 
                                zIndex: 1, 
                                listStyle: 'none', 
                                padding: 0 
                            }}>
                                {filteredCuisines.map((cuisine) => (
                                    <li 
                                        key={cuisine} 
                                        onClick={() => handleSelectCuisine(cuisine)} 
                                        style={{ 
                                            padding: '8px 12px', 
                                            cursor: 'pointer', 
                                            backgroundColor: 'white', 
                                            color: 'black' 
                                        }}
                                    >
                                        {cuisine}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Diet Selection */}
                    <div className='diet'>
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
                        <input type="number" name="Time" value={inputs.Time} onChange={handleChange} placeholder="Please input in mins" min={5} step={5}/>
                    </div>

                    <div>
                        <label>What is your min calorie</label>
                        <input type="number" name="minCalories" value={inputs.minCalories} onChange={handleChange} placeholder="Please input in kcal" min={100} step={100} defaultValue={null}/>
                    </div>
                    
                    <div>
                        <label>What is your max calorie</label>
                        <input type="number" name="maxCalories" value={inputs.maxCalories} onChange={handleChange} placeholder="Please input in kcal" min={inputs.minCalories ? inputs.minCalories + 1 : 101} step={100} defaultValue={null}/> {/*min value is set to be greater than the minCalories*/}
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </>
    );
}

export default AIpage;
