import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/portfolio", label: "Studio Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Airdrop" },
];

const truncateAddress = (address) =>
  address ? `${address.slice(0, 4)}…${address.slice(-4)}` : "";

function formatBalance(balance) {
  if (balance === null || balance === undefined) return "…";

  const num = Number(balance);
  if (!Number.isFinite(num)) return "…";

  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;

  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [hbxBalance, setHbxBalance] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [walletHint, setWalletHint] = useState("");

  const { pathname } = useLocation();
  const navRef = useRef(null);

  const closeMenu = useCallback(() => setNavActive(false), []);
  const toggleNav = () => setNavActive((open) => !open);

  /* Close the drawer whenever the route changes. */
  useEffect(closeMenu, [pathname, closeMenu]);

  /* Close it on Escape, on outside clicks, and once we're back on desktop. */
  useEffect(() => {
    if (!navActive) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth > 960) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [navActive, closeMenu]);

  /* Elevate the bar once the page scrolls. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getHBXBalance = useCallback(async (publicKeyString) => {
    const rpcUrl = process.env.REACT_APP_SOLANA_RPC_URL;
    const mint = process.env.REACT_APP_HBX_MINT_ADDRESS;
    if (!rpcUrl || !mint) return;

    try {
      /* Loaded on demand — @solana/web3.js is far too large to sit in the
         initial bundle for a button most visitors never press. */
      const { Connection, PublicKey } = await import("@solana/web3.js");
      const connection = new Connection(rpcUrl, "confirmed");

      const accounts = await connection.getParsedTokenAccountsByOwner(
        new PublicKey(publicKeyString),
        { mint: new PublicKey(mint) },
      );

      const amount =
        accounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount ?? 0;
      setHbxBalance(amount);
    } catch (error) {
      console.error("Failed to fetch $HBX balance:", error);
      setHbxBalance(null);
    }
  }, []);

  const connectWallet = async () => {
    setWalletHint("");

    /* Already connected — a second press disconnects. */
    if (walletAddress) {
      try {
        await window.solana?.disconnect?.();
      } catch (error) {
        console.error("Wallet disconnect failed:", error);
      }
      setWalletAddress(null);
      setHbxBalance(null);
      return;
    }

    const provider = window.solana;
    if (!provider?.isPhantom) {
      setWalletHint("Phantom wallet not detected.");
      return;
    }

    setConnecting(true);
    try {
      const response = await provider.connect();
      const publicKey = response.publicKey.toString();
      setWalletAddress(publicKey);
      await getHBXBalance(publicKey);
    } catch (error) {
      /* User dismissing the Phantom popup is not an error worth shouting about. */
      if (error?.code !== 4001) {
        console.error("Wallet connection failed:", error);
        setWalletHint("Could not connect. Please try again.");
      }
    } finally {
      setConnecting(false);
    }
  };

  /* Keep the button honest if the wallet is switched or locked elsewhere. */
  useEffect(() => {
    const provider = window.solana;
    if (!provider?.on) return undefined;

    const onDisconnect = () => {
      setWalletAddress(null);
      setHbxBalance(null);
    };
    const onAccountChanged = (publicKey) => {
      if (!publicKey) return onDisconnect();
      const next = publicKey.toString();
      setWalletAddress(next);
      getHBXBalance(next);
      return undefined;
    };

    provider.on("disconnect", onDisconnect);
    provider.on("accountChanged", onAccountChanged);

    return () => {
      provider.off?.("disconnect", onDisconnect);
      provider.off?.("accountChanged", onAccountChanged);
    };
  }, [getHBXBalance]);

  const linkClass = ({ isActive }) =>
    `navbar--content${isActive ? " navbar--active-content" : ""}`;

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? "is-scrolled" : ""} ${
        navActive ? "active" : ""
      }`}
    >
      <NavLink to="/" className="navbar--logo" onClick={closeMenu}>
        <img src="/img/hbxlogo-192.png" alt="" width="38" height="38" />
        <span>Habix</span>
      </NavLink>

      <div
        id="primary-navigation"
        className={`navbar--items ${navActive ? "active" : ""}`}
      >
        <ul>
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={closeMenu}
                className={linkClass}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="/profile.pdf"
              download
              onClick={closeMenu}
              className="navbar--content whitepaper-link"
            >
              Company Profile
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar--actions">
        <button
          type="button"
          onClick={connectWallet}
          disabled={connecting}
          className={`wallet-connect-btn ${walletAddress ? "is-connected" : ""}`}
          title={
            walletAddress
              ? `Connected as ${walletAddress} — click to disconnect`
              : "Connect your Phantom wallet"
          }
        >
          <img
            src="/img/phantomlogo-64.png"
            alt=""
            className="wallet--logo"
            width="20"
            height="20"
          />
          {connecting && <span>Connecting…</span>}
          {!connecting && !walletAddress && <span>Connect Wallet</span>}
          {!connecting && walletAddress && (
            <>
              <span className="wallet--balance">
                {formatBalance(hbxBalance)} $HBX
              </span>
              <span className="wallet--address">
                {truncateAddress(walletAddress)}
              </span>
            </>
          )}
        </button>

        {walletHint && (
          <p className="wallet--hint" role="status">
            {walletHint}{" "}
            <a href="https://phantom.app/" target="_blank" rel="noreferrer">
              Get Phantom
            </a>
          </p>
        )}
      </div>

      <button
        type="button"
        className={`nav__hamburger ${navActive ? "active" : ""}`}
        onClick={toggleNav}
        aria-label={navActive ? "Close menu" : "Open menu"}
        aria-expanded={navActive}
        aria-controls="primary-navigation"
      >
        <span className="nav__hamburger__line" />
        <span className="nav__hamburger__line" />
        <span className="nav__hamburger__line" />
      </button>
    </nav>
  );
}

export default Navbar;
