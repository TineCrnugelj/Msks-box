import ArgumentPair from "../components/tasks/ArgumentPair";

export function parseArguments(args, numOfArgs) {
    const argElements = []
    for (let i = 1; i <= numOfArgs; i++) { // export to function
        const keyValue = args[i - 1].split('=')
        const key = keyValue[0].replace(/\W@:./g, '')
        const value = keyValue[1].replace(/\W@:./g, '')
        argElements.push(<ArgumentPair key1={key} value={value} index={i} key={i} />)
    }
    return argElements;
}