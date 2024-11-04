# Open Charity: A Decentralized Charity Donation Platform

Open Charity is a decentralized application (dApp) that brings transparency and trust to charitable donations by leveraging blockchain technology on the [AIAchain](https://aiachain.org/) network. Users can donate to verified charities using cryptocurrency, with real-time tracking and transparent transaction records. Built with [Next.js](https://nextjs.org/) and deployed on AIAchain, Open Charity aims to empower users to make a positive impact while ensuring full accountability.


## Features
1. Decentralized Donations: Donate directly to charities without intermediaries, ensuring the entire amount reaches the cause.
2. Real-Time Transparency: Track donations instantly with dynamic updates and view all donation history.
3. NFT and Crypto Donations: Supports both cryptocurrency and NFT-based donations (in development).
4. Secure and Verified Charities: Only verified charities can register, ensuring legitimacy.
5. Low Fees and Fast Transactions: AIAchain enables cost-efficient and quick transactions, ideal for real-time donations.


## Technologies Used
- Frontend: [Next.js](https://nextjs.org/) (React framework) for a dynamic and interactive UI.
- Smart Contract: Solidity smart contracts for secure, on-chain charity verification and donations.
- Blockchain: [AIAchain](https://docs.aiachain.org/aia-chain-pos-ai-and-financial-payments/introduction-to-aia-chain) for high-speed, low-cost transactions with EVM compatibility.
- Wallet Integration: [MetaMask](https://metamask.io/) or any EVM-compatible wallet for secure user connections and transactions.


## Getting Started
### Prerequisites

Ensure you have the following installed:

- Node.js and npm: [Download here](https://nodejs.org/en/download/prebuilt-installer/)
- MetaMask or any EVM-compatible wallet: [Download here](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US&utm_source=ext_sidebar)

### Installation

Clone the repository and install dependencies:

```
git clone https://github.com/JainamOswal18/open-charity.git
cd open-charity
npm install
```

### Development Setup

To start the development server:

```
npm run dev
```

Open http://localhost:3000 to view the application in the browser.



## Deployment

To deploy the project, we recommend using [Vercel](https://vercel.com/), as Next.js works seamlessly with it:
1. Push your code to a GitHub repository.
2. Import the repository into Vercel and configure the necessary environment variables.
3. Deploy the application with a single click.

For detailed steps, refer to [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).



## Usage

### Connecting a Wallet

1. Ensure you’re on the AIAchain network in MetaMask or any other EVM-compatible wallet.
2. Click Connect Wallet on the homepage to initiate connection.

### Making a Donation

1. Explore the list of charities and their active campaigns.
2. Select a charity, enter the donation amount, and (optionally) a message.
3. Confirm the transaction in MetaMask, and view the live transaction status in the app.

### Viewing Donation History

- Access the dashboard to view a record of past donations, including transaction details, timestamps, and donation amounts.



## Smart Contract Overview

The core functionality is handled by the `CharityDonation` smart contract, which is deployed on the AIAchain network. The contract provides:

- `registerCharity` : Allows only the contract owner to register verified charities.
- `donate` : Enables users to donate funds directly to a charity.
- `getTotalDonations` : Fetches the total donations for a specific charity.
- `checkRegisteredCharity` : Verifies if an address is registered as a charity.
    
The contract ensures that funds are stored securely, and only authorized withdrawals can be processed.



## Testing on Remix IDE

For smart contract testing and deployment:

1. Copy the smart contract code to [Remix IDE](https://remix.ethereum.org/).
2. Compile the contract using the correct Solidity version (e.g., `0.8.x`) and evm version as london (inside advanced config).
3. Deploy on the AIAchain network by connecting Remix to MetaMask.
4. After deployment, note the contract address and update your frontend with this address.



## Roadmap

1. NFT Donations: Expand the donation model to include NFT-based donations.
2. Dynamic Charity Registration: Implement a system for community-backed verification of new charities.
3. Cross-Chain Compatibility: Integrate with other EVM-compatible chains for greater reach.



## Contributing

We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request with your changes.

1. Fork the repository
2. Create your branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature/new-feature`)    
5. Open a pull request



## License

This project is licensed under the MIT License.



## Acknowledgements

- [AIAchain](https://docs.aiachain.org/aia-chain-pos-ai-and-financial-payments/introduction-to-aia-chain): For providing the blockchain infrastructure.
- [Next.js Documentation](https://nextjs.org/docs): For extensive guidance on building apps with Next.js.
- [Remix IDE](https://remix.ethereum.org/): For smart contract deployment and testing.






<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
