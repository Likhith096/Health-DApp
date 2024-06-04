// import web3 from 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js';

// document.addEventListener('DOMContentLoaded', () => {
//     const sendButton = document.getElementById('sendButton');
//     const receiveButton = document.getElementById('receiveButton');
//     const fileInput = document.getElementById('fileInput');
//     const fileOutput = document.getElementById('fileOutput');

//     if (typeof window.ethereum !== 'undefined') {
//         // MetaMask is installed
//         window.ethereum.request({ method: 'eth_requestAccounts' })
//             .then(accounts => {
//                 if (accounts.length > 0) {
//                     // User is connected
//                     const account = accounts[0];
//                     console.log('Connected account:', account);
//                 } else {
//                     console.log('No connected accounts.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching accounts:', error);
//             });
//     } else {
//         console.log('MetaMask is not installed.');
//     }

//     // Connect to Web3
//     if (window.ethereum) {
//         window.ethereum.request({ method: 'eth_requestAccounts' })
//             .then(accounts => {
//                 // Handle the accounts array
//                 console.log(accounts);
//             })
//             .catch(error => {
//                 // Handle error. For example, the user rejected the request.
//                 console.error(error);
//             });
//     } else {
//         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//     }

//     // Your contract ABI and address
//     const contractABI = [
//         {
//             "inputs": [],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
//         },
//         {
//             "inputs": [],
//             "name": "last_completed_migration",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "owner",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "completed",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "setCompleted",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "_fileContent",
//                     "type": "string"
//                 }
//             ],
//             "name": "sendFile",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "receiveFile",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         }
//     ];
//     const contractAddress = '0x97Cddf0e6cBB915fcD922e2aC4B9a533130DA945';

//     const contract = new web3.eth.Contract(contractABI, contractAddress);

//     // Send File
//     sendButton.addEventListener('click', async () => {
//         const file = fileInput.files[0];
//         console.log("Sending...");
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = async (e) => {
//                 const fileContent = e.target.result;
//                 const accounts = await web3.eth.getAccounts();
//                 const sender = accounts[0];

//                 contract.methods.sendFile(fileContent).send({
//                     from: sender,
//                     value: web3.utils.toWei('0.1', 'ether')
//                 })
//                 .on('receipt', receipt => {
//                     console.log('File sent', receipt);
//                 })
//                 .on('error', error => {
//                     console.error('Error sending file', error);
//                 });
//             };
//             reader.readAsText(file);
//         }
//     });

//     // Receive File
//     receiveButton.addEventListener('click', async () => {
//         const accounts = await web3.eth.getAccounts();
//         const receiver = accounts[0];

//         // Assuming your contract has a function to retrieve the file
//         contract.methods.receiveFile().call({ from: receiver })
//             .then(fileContent => {
//                 fileOutput.textContent = fileContent;
//             })
//             .catch(error => {
//                 console.error('Error receiving file', error);
//             });
//     });
// });






document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const receiveButton = document.getElementById('receiveButton');
    const fileInput = document.getElementById('fileInput');
    const fileOutput = document.getElementById('fileOutput');
  
    // MetaMask connection
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                if (accounts.length > 0) {
                    const account = accounts[0];
                    console.log('Connected account:', account);
                } else {
                    console.log('No connected accounts.');
                }
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    } else {
        console.log('MetaMask is not installed.');
    }
  
    // Connect to Web3
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return;
    }
  
    // Your contract ABI and address
    const contractABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "storedFile",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_fileContent",
              "type": "string"
            }
          ],
          "name": "sendFile",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "receiveFile",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
    const contractAddress = '0x9F59c33631Ae85670a4576eC8FD7c8E59D150188'; // Replace with your contract address
  
    const contract = new web3.eth.Contract(contractABI, contractAddress);
  
    // Send File
    sendButton.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const fileContent = e.target.result;
                const accounts = await web3.eth.getAccounts();
                const sender = accounts[0];
  
                contract.methods.sendFile(fileContent).send({ from: sender, value: web3.utils.toWei('0.1', 'ether') })
                    .on('receipt', receipt => {
                        console.log('File sent', receipt);
                        alert('File uploaded successfully!');
                    })
                    .on('error', error => {
                        console.error('Error sending file', error);
                        alert('Failed to upload file. See console for details.');
                    });
            };
            reader.readAsText(file);
        } else {
            alert('Please select a file.');
        }
    });
  
    // Receive File
    receiveButton.addEventListener('click', async () => {
        const accounts = await web3.eth.getAccounts();
        const receiver = accounts[0];
  
        contract.methods.receiveFile().call({ from: receiver })
            .then(fileContent => {
                fileOutput.textContent = fileContent;
            })
            .catch(error => {
                console.error('Error receiving file', error);
            });
    });
  });