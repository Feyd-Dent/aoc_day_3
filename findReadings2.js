const findLocation = async () => {
    
    const decimalBinaryConvert = (binInput) => {
        let result = 0;
        let g = 0;
        for (let i=binInput.length-1; i != -1; i--) {
            result += binInput[i] * Math.pow(2, g);
            g++;
        }
        return result;
    };

    const arrayLoop = (arr, g) => {

        //set up variables
        let ones = 0;
        let zeros = 0;
        let result1 = arr[0];
        let result2 = arr[1];
        let resultArray = [];

            // check the arrays are more than one entry in length
            if (arr[0].length > 1){
                ones = 0;
                zeroes = 0;
                //count the ones and zeroes in the primary array
                for ( let i=0; i < arr[0].length; i++ ) {
                    if (arr[0][i][g] === "1"){
                        ones += 1;
                    } else {
                        zeros += 1;
                    }
                }
                //loop and store the Oxygen entries
                if (ones >= zeros) {
                    result1 = arr[0].filter((e) => {
                        return e[g] == 1;
                    })
                } else if (zeros > ones) {
                    result1 = arr[0].filter((e) => {
                        return e[g] == 0;
                    })
                };
            };
            
            //Check arrays are more than one entry in length
            if (arr[1].length > 1) {
                ones = 0;
                zeros = 0;
                //count the ones and zeros in the xecondary array
                for ( let i=0; i < arr[1].length; i++ ) {
                    if (arr[1][i][g] === "1"){
                        ones += 1;
                    } else {
                        zeros += 1;
                    }
                }
                //loop and store the Co2 array entries
                if (zeros <= ones) {
                    result2 = arr[1].filter((e) => {
                        return e[g] == 0;
                    })
                } else if (ones < zeros) {
                    result2 = arr[1].filter((e) => {
                        return e[g] == 1;
                    })
                };
            }

        //deploy results to output array
        resultArray[0] = result1;
        resultArray[1] = result2;
        //advance function index variable
        g++;
        //check each array for a single answer in each.
        if (resultArray[0].length > 1 || resultArray[1].length > 1){
            arrayLoop(resultArray, g);
        } else {
            console.log(resultArray[0][0]);
            console.log(resultArray[1][0]);
            console.log(decimalBinaryConvert(resultArray[0][0]));
            console.log(decimalBinaryConvert(resultArray[1][0]));
            return resultArray;
        };
    };

    try {
        const dirInput = await fetch(`./readings.html`);
        const dirText = await dirInput.text();
        const dirArray = await dirText.split(/\r?\n/);
        const feederArray = [dirArray, dirArray];
        const finalAnswer = arrayLoop(feederArray, 0);


        let oxygen = "";
        let c02 = "";
        console.log(finalAnswer, "let's see!");

        // for ( let i=0; i < ones.length; i++) {
        //     if (ones[i] > zeros[i]) {
        //         gamma += "1";
        //         epsilon += "0";
        //     } else {
        //         gamma += "0";
        //         epsilon += "1";
        //     }
        // }
        // const finalNumber = decimalBinaryConvert(epsilon) * decimalBinaryConvert(gamma);
        // console.log("Result = ", finalNumber);
        return finalAnswer;
    } catch (error) {
        console.log(error, "noooo!!!!")
    }
    };

    console.log(findLocation(), "woops");