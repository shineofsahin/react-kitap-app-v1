import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleFilter = (event) => {
    const searchWord = event.target.value;
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
                <a className="dataItem"
                href={"/profil/" + value.name}
                style={{ textDecoration: "none" }}
              >
                  <img src={
                  value.picture
                ? value.picture
                : PF + "/noAvatar.png"
            } alt="PP"  className="topbarImgs"/>
                <p>{value.name} - {value.city ? value.city : "Belirtilmedi"} </p> </a>              
              
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