import { useEffect, useState } from "react";
import { calculateA, calculateB } from "../calculations/exercise1.js";

export default function Exercise1({nValues}){

    const [aResults, setAResults] = useState({});
    const [aErrors, setAErrors] = useState({});

    const [bResults, setBResults] = useState({});
    const [bErrors, setBErrors] = useState({});

    useEffect(() => {

    }, [aResults, bResults, aErrors, bErrors]);

    return (
        <div>
            <h3>Exercise 1</h3>
            <div style={{display: "inline-block", width: "30%"}}>
                <h4>Part A:</h4>
                <h6>{"P(X >= 1.2 * E(X))"}</h6>
                <div>
                    {nValues.map(n => (
                        <div key={"A_" + n}>
                            {<div>
                                <b>For n = {n}:</b>
                                {aErrors[n]}
                                {aResults[n]}
                            </div>}
                            <button className="m-3 btn btn-primary" onClick={() => {
                                new Promise((resolve, reject) => {
                                    let result = calculateA(n, 0.5);
                                    resolve(result);
                                }).then(response => {
                                    let obj = {...aResults};
                                    obj[n] = response;
                                    setAResults(obj);

                                    let errorsObj  = {...aErrors};
                                    errorsObj[n] = null;
                                    setAErrors(errorsObj);

                                    console.log(aResults);
                                }).catch(e => {
                                    let obj = {...aResults};
                                    obj[n] = null;
                                    setAResults(obj);

                                    let errorsObj  = {...aErrors};
                                    errorsObj[n] = "Unexpected error";
                                    setAErrors(errorsObj);

                                    console.log(e);
                                });;
                            }}>
                                Calculate A({n})
                            </button>
                        </div>
                    ))}
                </div>
                
            </div>
            <div style={{display: "inline-block", width: "30%"}}>
                <h4>Part B:</h4>
                <h6>{"P( | X - E(X) | >= 0.1* E(X))"}</h6>
                {nValues.map(n => (
                    <div key={"B_" + n}>
                        {<div>
                            <b>For n = {n}:</b>
                            {bErrors[n]}
                            {bResults[n]}
                        </div>}
                        <button className="m-3 btn btn-primary" onClick={() => {
                            console.log("Promise was created?");
                            new Promise((resolve, reject) => {
                                console.log("Stated");
                                let result = calculateB(n, 0.5);
                                console.log(result);
                                resolve(result);
                            }).then(response => {
                                let obj = {...bResults};
                                obj[n] = response;
                                setBResults(obj);

                                let errorsObj  = {...bErrors};
                                errorsObj[n] = null;
                                setBErrors(errorsObj);
                            }).catch(e => {
                                let obj = {...bResults};
                                obj[n] = null;
                                setBResults(obj);

                                let errorsObj  = {...bErrors};
                                errorsObj[n] = "Unexpected error";
                                setBErrors(errorsObj);

                                console.log(e);
                            });;
                        }}>
                            Calculate B({n}) 
                        </button>
                    </div>
                ))}
            </div>
            
        </div>
    );
}