import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { DONATIONS } from "./donations";
import venmoLogo from "./assets/donations/venmo-white.png";
import paypalLogo from "./assets/donations/paypal.svg";
import zelleLogo from "./assets/donations/zelle-white.png";

const useStyles = makeStyles({
  controls: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 6,
    marginLeft: "auto",
    "@media (max-width: 359px)": {
      gap: 4,
      "& > a, & > button": { paddingLeft: 6, paddingRight: 6 },
    },
  },
  prompt: {
    whiteSpace: "nowrap",
    "@media (max-width: 480px)": {
      flexBasis: "100%",
      textAlign: "right",
    },
  },
  button: {
    minWidth: 0,
    minHeight: 36,
    padding: "6px 10px",
    textTransform: "none",
    lineHeight: 1,
    "&:focus-visible, &.Mui-focusVisible": {
      outline: "2px solid #222",
      outlineOffset: 3,
    },
  },
  venmo: {
    backgroundColor: "#008CFF",
    "&:hover": { backgroundColor: "#0074d4" },
  },
  paypal: {
    backgroundColor: "#fff",
    color: "#003087",
    border: "1px solid #c5c5c5",
    "&:hover": { backgroundColor: "#f5f8ff" },
  },
  zelle: {
    backgroundColor: "#6d1ed4",
    "&:hover": { backgroundColor: "#471e99" },
  },
  venmoLogo: { width: 64, height: "auto", display: "block" },
  paypalLogo: { width: 22, height: 22, marginRight: 5 },
  zelleLogo: { width: 43, height: "auto", display: "block" },
  panel: {
    padding: 16,
    width: 300,
    maxWidth: "calc(100vw - 32px)",
    boxSizing: "border-box",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  email: {
    display: "block",
    margin: "8px 0",
    "& input": { userSelect: "text" },
  },
  status: { marginTop: 8 },
});

export default function DonationButtons() {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const open = Boolean(anchor);

  const copyEmail = async () => {
    setCopying(true);
    setStatus("");
    try {
      await navigator.clipboard.writeText(DONATIONS.zelleEmail);
      setStatus("Email copied.");
    } catch (_error) {
      setStatus("Couldn’t copy. Select the email and copy it manually.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className={classes.controls} role="group" aria-label="Donate">
      <Typography className={classes.prompt} variant="body2">Buy us a coffee!</Typography>
      <Button
        className={`${classes.button} ${classes.venmo}`}
        href={DONATIONS.venmo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donate with Venmo (opens in a new tab)"
      >
        <img className={classes.venmoLogo} src={venmoLogo} alt="Venmo" />
      </Button>
      <Button
        className={`${classes.button} ${classes.paypal}`}
        href={DONATIONS.paypal}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donate with PayPal (opens in a new tab)"
      >
        <img className={classes.paypalLogo} src={paypalLogo} alt="" />
        PayPal
      </Button>
      <Button
        className={`${classes.button} ${classes.zelle}`}
        aria-label="Donate with Zelle"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "zelle-panel" : undefined}
        onClick={(event) => {
          setStatus("");
          setAnchor(event.currentTarget);
        }}
      >
        <img className={classes.zelleLogo} src={zelleLogo} alt="Zelle" />
      </Button>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          id: "zelle-panel",
          role: "dialog",
          "aria-labelledby": "zelle-title",
          "aria-describedby": "zelle-instructions",
          className: classes.panel,
        }}
      >
        <div className={classes.panelHeader}>
          <Typography id="zelle-title" variant="subtitle1">Donate with Zelle</Typography>
          <Button size="small" onClick={() => setAnchor(null)}>Close</Button>
        </div>
        <Typography id="zelle-instructions" variant="body2">
          In your banking app, open Zelle and send to this email:
        </Typography>
        <InputBase
          className={classes.email}
          fullWidth
          value={DONATIONS.zelleEmail}
          readOnly
          inputProps={{ "aria-label": "Zelle email" }}
          onFocus={(event) => event.target.select()}
        />
        <Button autoFocus variant="outlined" size="small" onClick={copyEmail} disabled={copying}>
          {copying ? "Copying…" : "Copy email"}
        </Button>
        <Typography className={status ? classes.status : undefined} variant="body2" role="status" aria-live="polite">
          {status}
        </Typography>
      </Popover>
    </div>
  );
}
