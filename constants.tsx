import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  name: "SHASHANK SINGH",
  roleTitle: "Senior Blockchain Developer & Tech Lead",
  summary: "Results-driven blockchain developer with 4+ Years of Experience. Team lead with extensive expertise in EVM-based blockchains, Hyperledger, Solana and DeFi protocols. Proven ability to design, develop, and deploy smart contracts, decentralized applications (dApps), and blockchain-based solutions across diverse industries. Proficient in Solidity, Ethereum, Solana and Hyperledger Fabric, with a strong focus on delivering secure, scalable, and innovative solutions.",
  primaryImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop",
  contact: {
    phone: "8076879262",
    email: "shashanksingh9694@gmail.com",
    location: "Noida, India",
    github: "github.com/shashank9694",
    linkedin: "linkedin.com/in/shashank-singh-35b6b515b"
  },
  skills: [
    { id: 's1', name: "Solidity", category: "Language", level: 98 },
    { id: 's2', name: "NodeJs", category: "Language", level: 92 },
    { id: 's3', name: "Rust", category: "Language", level: 85 },
    { id: 's4', name: "JavaScript", category: "Language", level: 95 },
    { id: 's5', name: "TypeScript", category: "Language", level: 90 },
    { id: 's6', name: "Hardhat", category: "Technology", level: 95 },
    { id: 's7', name: "Solana CLI", category: "Technology", level: 88 },
    { id: 's8', name: "Anchor CLI", category: "Technology", level: 85 },
    { id: 's9', name: "Docker", category: "Technology", level: 80 },
    { id: 's10', name: "IPFS", category: "Technology", level: 90 },
    { id: 's11', name: "Besu", category: "Technology", level: 85 },
    { id: 's12', name: "Hyperledger Fabric", category: "Technology", level: 88 }
  ],
  experience: [
    {
      id: 'e1',
      role: "Senior Blockchain Developer",
      company: "Metaspace Technology",
      duration: "11/2024 - Present",
      bullets: [
        "Specializing in meta transactions and smart contract wallets.",
        "Developing and optimizing meta transaction solutions to improve user experience.",
        "Leading the development of smart contract wallets for secure asset management."
      ]
    },
    {
      id: 'e2',
      role: "Senior Technical Lead",
      company: "Sparxit Solutions",
      duration: "03/2023 - 10/2024",
      bullets: [
        "Directed implementation of infrastructure for Polygon Edge nodes and bridges.",
        "Developed and optimized automated arbitrage strategies for CEX exchanges.",
        "Delivered complex Node.js projects including e-commerce and health applications."
      ]
    },
    {
      id: 'e3',
      role: "Senior Blockchain Developer",
      company: "Sparxit Solutions",
      duration: "03/2022 - 03/2023",
      bullets: [
        "Led the development and deployment of flashloan Smart Contracts.",
        "Enhanced network performance and cross-chain compatibility via secure bridges.",
        "Leveraged Smart Contracts to maximize profit opportunities through automated arbitrage."
      ]
    },
    {
      id: 'e4',
      role: "Blockchain Developer",
      company: "Mobiloitte Technology",
      duration: "02/2021 - 03/2022",
      bullets: [
        "Contributed to key projects such as Crypto Wallet on EVM Chain and Fractional NFT.",
        "Collaborated with cross-functional teams to design and deploy blockchain solutions.",
        "Started as a trainee gaining foundational experience in DLT."
      ]
    }
  ],
  education: [
    { id: 'ed1', degree: "B.Tech", institution: "Raj Kumar Goel Institute Of Technology (RKGIT)", duration: "2016 - 2020" },
    { id: 'ed2', degree: "School (XII)", institution: "Krashak Smajh Inter College (KSIC)", duration: "2014 - 2015" },
    { id: 'ed3', degree: "School (X)", institution: "Holy Angels Inter College", duration: "2011 - 2012" }
  ],
  projects: [
    { id: 'p1', title: "Salamtcom", category: "Node.js", tech: "Node.js", bullets: ["Health-focused app for diet tracking and nutritional intake."], imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80", accentColor: "#10b981" },
    { id: 'p2', title: "Crypto Wallet on EVM", category: "Solidity, React.js", tech: "Solidity", bullets: ["Achieved a user adoption rate of 85%.", "Integrated seamless transaction capabilities."], imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80", accentColor: "#6366f1" },
    { id: 'p3', title: "Aave Flashloan Bot", category: "Solidity, Aave", tech: "Aave Protocol", bullets: ["Implemented Smart Contracts on Aave for instant borrowing."], imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80", accentColor: "#10b981" },
    { id: 'p4', title: "Arbitrage CEX", category: "Solidity, React.js", tech: "Smart Contracts", bullets: ["Automated arbitrage strategies between CEX exchanges."], imageUrl: "https://images.unsplash.com/photo-1611974717482-48a66504b22e?auto=format&fit=crop&w=800&q=80", accentColor: "#f59e0b" },
    { id: 'p5', title: "Polygon Edge Infra", category: "Polygon, React.js", tech: "Bridges", bullets: ["Set up infrastructure for Polygon Edge nodes and bridges."], imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80", accentColor: "#8b5cf6" },
    { id: 'p6', title: "Fractional NFT", category: "Solidity, React.js", tech: "NFT Marketplace", bullets: ["Created Smart Contracts enabling fractional ownership of NFTs."], imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80", accentColor: "#ec4899" },
    { id: 'p7', title: "CEX NFT Marketplace", category: "Solidity, React.js", tech: "Infrastructure", bullets: ["Developed a centralized exchange NFT marketplace."], imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", accentColor: "#6366f1" },
    { id: 'p8', title: "IDO & ICO Launchpad", category: "Solidity, React.js", tech: "Staking", bullets: ["Built launchpad platform for token sales and staking."], imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80", accentColor: "#14b8a6" },
    { id: 'p9', title: "Truckology ICO", category: "Solidity, React.js", tech: "Tokenomics", bullets: ["Launched ICO and developed comprehensive tokenomics."], imageUrl: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=800&q=80", accentColor: "#f59e0b" },
    { id: 'p10', title: "DEX and DeFi", category: "Solidity, React.js", tech: "DeFi Protocols", bullets: ["Designed and developed a decentralized exchange (DEX)."], imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop", accentColor: "#8b5cf6" },
    { id: 'p11', title: "DAO Smart Contract", category: "Solidity", tech: "Governance", bullets: ["Designed and deployed DAO Smart Contracts for governance."], imageUrl: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=800&q=80", accentColor: "#10b981" },
    { id: 'p12', title: "Metaspace Game NFT", category: "Solidity, React.js", tech: "GameFi", bullets: ["Developed an NFT marketplace for the Metaspace Game."], imageUrl: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80", accentColor: "#ec4899" },
    { id: 'p13', title: "Flocy Wallet", category: "Solidity, React.js", tech: "Wallets", bullets: ["Developed Flocy Wallet for secure storage."], imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80", accentColor: "#6366f1" },
    { id: 'p14', title: "Crypto Loan", category: "Solidity, IPFS", tech: "Collateral", bullets: ["Borrowing protocol using digital tokens as collateral."], imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80", accentColor: "#10b981" },
    { id: 'p15', title: "Decentralized Database", category: "IPFS, Besu, Solidity", tech: "Web3 Storage", bullets: ["Developed decentralized database solution using IPFS."], imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80", accentColor: "#14b8a6" }
  ],
  customSections: []
};