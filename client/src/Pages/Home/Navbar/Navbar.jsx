import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";

import "./navbar.css";

function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [hbxBalance, setHbxBalance] = useState(null);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeMenu = () => {
    setNavActive(false);
  };

  //Use effect blocks
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu;
    }
  }, []);

  // wallet connection and balance fetching
  const connectWallet = async () => {
    if ("solana" in window) {
      const provider = window.solana;

      if (provider.isPhantom) {
        try {
          const response = await provider.connect();

          setWalletAddress(response.publicKey.toString());

          getHBXBalance(response.publicKey);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Phantom wallet not detected");
    }
  };

  const getHBXBalance = async (publicKey) => {
    try {
      console.log(process.env.REACT_APP_SOLANA_RPC_URL);
      const connection = new Connection(process.env.REACT_APP_SOLANA_RPC_URL);

      const accounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          mint: new PublicKey(process.env.REACT_APP_HBX_MINT_ADDRESS),
        },
      );

      if (accounts.value.length > 0) {
        const balance =
          accounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        console.log("HBX Balance:", balance);

        setHbxBalance(balance);
      } else {
        setHbxBalance(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // format balance

  function formatBalance(balance) {
    if (balance === null || balance === undefined) return "...";

    const num = Number(balance);

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";

    return num.toString();
  }

  return (
    <nav className={`navbar ${navActive ? "active" : ""}`}>
      {/* <div className="navbar--logo">
        <img src="/img/hbxlogo.png" alt="HBX logo" />
      </div> */}
      <a
        className={`nav__hamburger ${navActive ? "active" : ""}`}
        onClick={toggleNav}
      >
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
      </a>
      <div className={`navbar--items ${navActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link
              onClick={closeMenu}
              activeClass="navbar--active-content"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="/"
              className="navbar--content"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              activeClass="navbar--active-content"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="/portfolio"
              className="navbar--content"
            >
              Our Portfolio
            </Link>
          </li>

          <li>
            <a
              href="/whitepaper.pdf"
              download
              onClick={closeMenu}
              className="navbar--content whitepaper-link"
            >
              Download Whitepaper
            </a>
          </li>

          <li>
            <a
              href="/giveaway.pdf"
              download
              onClick={closeMenu}
              className="navbar--content whitepaper-link"
            >
              Giveaway Info
            </a>
          </li>

          <li className="dropdown">
            <span className="navbar--content dropdown-toggle">Roster ▾</span>

            <ul className="dropdown-menu">
              <li>
                <a
                  href="https://open.spotify.com/artist/1YcGi2JIfTzbotFBDiysfS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bryvvn
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/artist/4bRaaX0Gni1bOAca0tGduI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookie4l
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/artist/5W4k9fFelamN9X3sVxO6Ce"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GORILLA GLUE
                </a>
              </li>

              <li>
                <a
                  href="https://open.spotify.com/artist/7C4Sna90V9C5gRrtZNh8kZ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  On Safari
                </a>
              </li>

              <li>
                <a
                  href="https://open.spotify.com/artist/5itWJQ4OM8zmCx9cKIFFcP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OS Breezy
                </a>
              </li>

              <li>
                <a
                  href="https://open.spotify.com/artist/2Gaxo8kmFvgNJvNmg6ZsGH"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prince.Wasabi
                </a>
              </li>

              <li>
                <a
                  href="https://open.spotify.com/artist/7BzZGOottM9jSFRsFOBevb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TO BE HIRO
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <button onClick={connectWallet} className="wallet-connect-btn">
        <img
          src="/img/phantomlogo.png"
          alt="phantom"
          style={{ width: "44px", height: "44px", paddingBottom: "4px" }}
        />

        {walletAddress
          ? `$HBX: ${formatBalance(hbxBalance)}`
          : "Connect Wallet"}
      </button>
    </nav>
  );
}

export default Navbar;
