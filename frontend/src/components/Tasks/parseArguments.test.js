import {parseArguments} from "../../helpers/helpers";
import ArgumentPair from "./ArgumentPair";

describe('parseArguments test', () => {
    test('Function should return empty array if no arguments', () => {
        const numOfArgs = 0;
        const args = [];
        const result = [];

        expect(parseArguments(args, numOfArgs)).toEqual(result);
    });

    test('Function should return an array with one item if one argument', () => {
        const numOfArgs = 1;
        const args = ['embedding=asd@tag2323'];
        const result = [
            <ArgumentPair
                index={1}
                key={1}
                key1="embedding"
                value="asd@tag2323"
            />
        ];

        expect(parseArguments(args, numOfArgs)).toEqual(result);
    });

    test('Function should return an array with two item if two argument', () => {
        const numOfArgs = 2;
        const args = ['embedding=asd@tag2323', 'lr_gamma=0.5'];
        const result = [
            <ArgumentPair
                index={1}
                key={1}
                key1="embedding"
                value="asd@tag2323"
            />,
            <ArgumentPair
                index={2}
                key={2}
                key1="lr_gamma"
                value="0.5"
            />
        ];

        expect(parseArguments(args, numOfArgs)).toEqual(result);
    });

    test('Function should return an array with 7 items if 7 argument', () => {
        const numOfArgs = 7;
        const args = [
            'embedding=asd@tag2323',
            'lr_gamma=0.5',
            'stop_epochs=0.5',
            'lr_step=30',
            'embedding_loss=false',
            'batch_size=300',
            'delta=3'
        ];
        const result = [
            <ArgumentPair
                index={1}
                key={1}
                key1="embedding"
                value="asd@tag2323"
            />,
            <ArgumentPair
                index={2}
                key={2}
                key1="lr_gamma"
                value="0.5"
            />,
            <ArgumentPair
                index={3}
                key={3}
                key1="stop_epochs"
                value="0.5"
            />,
            <ArgumentPair
                index={4}
                key={4}
                key1="lr_step"
                value="30"
            />,
            <ArgumentPair
                index={5}
                key={5}
                key1="embedding_loss"
                value="false"
            />,
            <ArgumentPair
                index={6}
                key={6}
                key1="batch_size"
                value="300"
            />,
            <ArgumentPair
                index={7}
                key={7}
                key1="delta"
                value="3"
            />
        ];

        expect(parseArguments(args, numOfArgs)).toEqual(result);
    });
});