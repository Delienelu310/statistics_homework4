import { useEffect, useState } from "react";
import { generateNormalDistribution, generateSnDistribution } from "../calculations/exercise2";

import { VictoryChart, VictoryScatter, VictoryLabel, VictoryTooltip, VictoryLine } from "victory";

export default function Exercise2({nValues, repeats}){

    const [results, setResults] = useState({});
    const [errors, setErrors] = useState({});

    const [normalDistributions, setNormalDistribtuions] = useState({});
    const [normalDistributionsParameters, setNormalDistribtuionsParameters] = useState({});

    function convertResults(result){
        if(!result) return [];
        let data = [];
        for(let x of Object.keys(result)){
            data.push({
                x: +x, y: result[x]
            });
        }
        return data;
    }

    const showNormalDistribution = (n) => {
        new Promise((resolve, reject) => {
            let result = generateNormalDistribution(n,
                normalDistributionsParameters[n].a, 
                normalDistributionsParameters[n].b, 
                normalDistributionsParameters[n].k)
            resolve(result);
        }).then(response => {
            let obj = {...normalDistributions};
            obj[n] = response;
            setNormalDistribtuions(obj);

            console.log("Normal distribution");
            console.log(normalDistributions);
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        if(nValues){
            let obj = {};
            for(let i = 0; i < nValues.length; i++){
                obj[nValues[i]] = {a: 1, b: 0, k: 1};
            }
            setNormalDistribtuionsParameters(obj);
        }
    }, []);


    return (
        <div>
            <h3>Exercise 2</h3>
            {nValues.map(n => (
                <div key={"EX2_" + n}style={{display: "inline-block", width: "30%"}}>
                    <h5>For n = {n}</h5>
                    {results[n] && <div style={{width: "100%", margin: "auto"}}>
                        <VictoryChart width={400} height={300} style={{margin:"10%"}}>

                            <VictoryScatter
                                data={convertResults(results[n])}
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
                                data={convertResults(results[n])}
                                style={{
                                data: { stroke: 'red' },
                                    parent: { border: '1px solid #ccc' },
                                }}
                            />

                            {normalDistributions[n] && <VictoryScatter
                                data={convertResults(normalDistributions[n])}
                                size={2}
                                style={{ data: { fill: "blue"} }} 

                                labels={({ datum }) => datum.y}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutStyle={{ fill: 'white' }}
                                    />
                                }
                            />}

                            {normalDistributions[n] && <VictoryLine
                                data={convertResults(normalDistributions[n])}
                                style={{
                                data: { stroke: 'blue' },
                                    parent: { border: '1px solid #ccc' },
                                }}
                            />}
                        </VictoryChart>

                    </div>}
                    <div>
                        {normalDistributions[n] && <div>
                            <span>A: {normalDistributionsParameters[n].a}</span>
                            <input
                                style={{width: "100%"}}
                                type="range"
                                id="slider"
                                value={normalDistributionsParameters[n].a}
                                onChange={e => {
                                    let obj = {...normalDistributionsParameters};
                                    obj[n].a = e.target.value;
                                    setNormalDistribtuionsParameters(obj);
                                }}
                                min="0"
                                max="20"
                                step="0.01"
                            />
                            <br/>
                            <span>B: {normalDistributionsParameters[n].b}</span>
                            <input
                                style={{width: "100%"}}
                                type="range"
                                id="slider"
                                value={normalDistributionsParameters[n].b}
                                onChange={e => {
                                    let obj = {...normalDistributionsParameters};
                                    obj[n].b = e.target.value;
                                    setNormalDistribtuionsParameters(obj);
                                }}
                                min="-10"
                                max="10"
                                step="0.01"
                            />
                            <span>K: {normalDistributionsParameters[n].k}</span>
                            <input
                                style={{width: "100%"}}
                                type="range"
                                id="slider"
                                value={normalDistributionsParameters[n].k}
                                onChange={e => {
                                    let obj = {...normalDistributionsParameters};
                                    obj[n].k = e.target.value;
                                    setNormalDistribtuionsParameters(obj);
                                }}
                                min="-10"
                                max="10"
                                step="0.01"
                            />
                            <button onClick={() => {
                                let obj = {...normalDistributions};
                                obj[n] = null;
                                setNormalDistribtuions(obj);
                            }} className="m-3 btn btn-danger">Hide</button>
                            <br/>
                        </div>}
                        
                        <button onClick={() => {showNormalDistribution(n)}} className="m-3 btn btn-primary">Normal distribution</button>
                    </div>
                    


                    <button onClick={() => {
                        new Promise((resolve, reject) => {
                            let result = generateSnDistribution(n, repeats);
                            console.log(result);
                            resolve(result);
                        }).then(response => {
                            console.log("For n = " + n);
                            console.log(response);
                        
                            let obj = {...results};
                            obj[n] = response;
                            setResults(obj);

                            let errs = {...errors};
                            errs[n] = null;
                            setErrors(errs);
                        }).catch(e => {
                            console.log("For n = " + n);
                            console.log(e);

                            let obj = {...results};
                            obj[n] = null;
                            setResults(obj);

                            let errs = {...errors};
                            errs[n] = "Unexpected error";
                            setErrors(errs);
                        });
                    }}className="btn btn-primary m-3">Calculate</button>
                </div>
            ))}
        </div>
    );
}