import { useEffect, useState } from "react";
import { VictoryChart, VictoryBar, VictoryScatter, VictoryLine, VictoryTooltip, VictoryAxis} from "victory";
import {generatePnData, generateArcsinData} from "../calculations/exercise3";

export default function Exercise3({nValues, k}){

    const [pnData, setPnData] = useState({});
    const [acrsinSwitch, setArcsinSwitch] = useState({});
    const [coefficients, setCoefficients] = useState({});

    const [arcSinData, setArcsinData] = useState({});

    function convertPnData(pnData){
        
        let result = [];
        for(let key of Object.keys(pnData)){
            result.push({
                x: key * 5,
                y: pnData[key]
            });
        }

        return result;
    }

    useEffect(() => {
        let obj = {};
        for(let i = 0; i < nValues.length; i++){
            obj[nValues[i]] = 1;
        }
        setCoefficients(obj);
    }, []);

    return (
        <div>
            {nValues.map(n =>  ( 
                <div key={"EX3_" + n}>
                    <h4>For n = {n}</h4>
                    {pnData[n] && <VictoryChart domainPadding={20}>
                        <VictoryBar 
                            data={convertPnData(pnData[n])}
                            style={{ data: { fill: "blue"} }} 
                        />
                    </VictoryChart>}

                    {acrsinSwitch[n] && arcSinData[n] && <VictoryChart>

                        <VictoryAxis tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />

                        <VictoryScatter
                            data={convertPnData(pnData[n])}
                            size={2}
                            style={{ data: { fill: "blue"} }} 

                            labels={({ datum }) => datum.y}
                            labelComponent={
                                <VictoryTooltip
                                    flyoutStyle={{ fill: 'white' }}
                                />
                            }
                        />

                        <VictoryLine
                            data={convertPnData(pnData[n])}
                            style={{
                            data: { stroke: 'blue' },
                                parent: { border: '1px solid #ccc' },
                            }}
                        />

                        <VictoryScatter
                            data={arcSinData[n]}
                            size={2}
                            style={{ data: { fill: "red"} }} 

                            labels={({ datum }) => datum.y}
                            labelComponent={
                                <VictoryTooltip
                                    flyoutStyle={{ fill: 'white' }}
                                />
                            }
                        />

                        <VictoryLine
                            data={arcSinData[n]}
                            style={{
                            data: { stroke: 'red' },
                                parent: { border: '1px solid #ccc' },
                            }}
                        />

                    </VictoryChart>}

                    {acrsinSwitch[n] && <button onClick={() => {
                        let obj = {...acrsinSwitch};
                        obj[n] = false;
                        setArcsinSwitch(obj);
                    }} className="m-3 btn btn-danger">Hide</button>}

                    <span>K: {coefficients[n]}</span>
                    <input
                        style={{width: "50%"}}
                        type="range"
                        id="slider"
                        value={coefficients[n]}
                        onChange={e => {
                            let obj = {...coefficients};
                            obj[n] = e.target.value;
                            setCoefficients(obj);
                        }}
                        min="0"
                        max="5"
                        step="0.01"
                    />

                    <button onClick={() => {
                        new Promise((resolve, reject) => {
                            let data = generateArcsinData(coefficients[n]);
                            resolve(data);
                        }).then(response => {
                            let converted = [];
                            for(let i = 0; i < response.length; i++){
                                converted.push({
                                    x: i,
                                    y: response[i]
                                });
                            }
                            let obj = {...arcSinData};
                            obj[n] = converted;
                            setArcsinData(obj);
                        }).catch(e => {
                            console.log(e);
                        });

                        let obj = {...acrsinSwitch};
                        obj[n] = true;
                        setArcsinSwitch(obj);
                    }} className="m-3 btn btn-primary">Arcsin</button>

                    <button onClick={() => {
                        new Promise((resolve, reject) => {
                            let data = generatePnData(n, k);
                            resolve(data);
                        }).then(response => {
                            let obj = {...pnData};
                            obj[n] = response;
                            setPnData(obj);
                        }).catch(e => {
                            console.log(e);
                        });
                    }} className="m-3 btn btn-primary">Generate</button>

                </div>
            ))}
            
        </div>
    );
}