import classes from "./TaskTable.module.css";
import {MDBCol} from "mdbreact";
import {useState} from "react";
import {FaSearch} from "react-icons/fa";

import classes1 from './Search.module.css';

const Searchbar = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeQuery = (e) => {
        setSearchQuery(e.target.value);
        props.onQueryChange(e.target.value);
    }

    return <MDBCol className={classes.searchBar} md="2">
        <div className="input-group md-form form-sm form-1 pl-0">
            <input
                onChange={onChangeQuery}
                className="form-control my-0 py-1"
                type="text"
                placeholder="Search by hash, tag or status"
                aria-label="Search"
                value={searchQuery}
            />
            <FaSearch className={classes1.searchBtn} size={25} />
        </div>
    </MDBCol>
};

export default Searchbar;
