import Card from "../../UI/Card";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import classes from '../../pages/Dashboard.module.css';
import Logs from "./Logs";
import FileList from "../files/FileList";
import Plots from "./Plots";
import {useState} from "react";

const Section = ({value, index, task}) => {
    const [plots, setPlots] = useState()
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
                <DragDropContext>
                    <Droppable droppableId='plots'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <Plots id={task._id} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Card>
        }
    </section>
}

export default Section;