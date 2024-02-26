import React, { useState,useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat2/Chat"
import { AuthContext } from "../../context/AuthContext";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord)
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <>
    <div className="topbarCenter"> 
    <div className="search">
      <div className="searchInputs" style ={{  placeContent:"center"}}>
        {console.log(data)}
        <input
          type="text"
          style ={{  textAlign:"center"}}
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
  
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 10).map((value, key) => {
            return (
                <> 
               {console.log(value.name)}        
              
              </>

              
              
            );
          })}
        </div>
      )}
    </div>


    </div>
   

    </>
  );
}

export default SearchBar;