import classes from "./TaskTable.module.css";
import {MDBCol} from "mdbreact";

const Searchbar = () => {
    return <MDBCol className={classes.searchBar} md="2">
        <div className="input-group md-form form-sm form-1 pl-0">
            <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Search"
                aria-label="Search"
            />
        </div>
    </MDBCol>
};

export default Searchbar;