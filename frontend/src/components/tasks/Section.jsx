import Card from "../../UI/Card";

import classes from '../../pages/Dashboard.module.css';
import Logs from "./Logs";
import FileList from "../files/FileList";
import Plots from "./Plots";

const Section = ({value, index, task}) => {
    return <section className={classes.tasks}>
        {value === index && index === 0 &&
            <Card>
                <Logs id={task._id}/>
            </Card>
        }
        {value === index && index === 1 &&
            <Card>
                <FileList id={task._id} />
            </Card>
        }
        {value === index && index === 2 &&
            <Card>
                <Plots id={task._id}/>
            </Card>
        }
    </section>
}

export default Section;