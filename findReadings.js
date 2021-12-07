const findLocation = async () => {
    
    const decimalBinaryConvert = (binInput) => {
        let result = 0;
        let g = 0;
        for (let i=binInput.length-1; i != -1; i--) {
            result += binInput[i] * Math.pow(2, g);
            g++;
        }
        return result;
    }

    try {
        const dirInput = await fetch(`./readings.html`);
        const dirText = await dirInput.text();
        const dirArray = await dirText.split(/\r?\n/);

        let ones = [0,0,0,0,0,0,0,0,0,0,0,0];
        let zeros = [0,0,0,0,0,0,0,0,0,0,0,0];
        let epsilon = "";
        let gamma = "";

        for ( let i=0; i < dirArray.length; i++ ) {
            for ( let g=0; g < dirArray[i].length; g++) {
                if (dirArray[i][g] === "1"){
                    ones[g] += 1;
                } else {
                    zeros[g] += 1;
                }
            }
        }

        for ( let i=0; i < ones.length; i++) {
            if (ones[i] > zeros[i]) {
                gamma += "1";
                epsilon += "0";
            } else {
                gamma += "0";
                epsilon += "1";
            }
        }
        const finalNumber = decimalBinaryConvert(epsilon) * decimalBinaryConvert(gamma);
        console.log("Result = ", finalNumber);
    } catch (error) {
        console.log(error, "noooo!!!!")
    }
    };

    findLocation();