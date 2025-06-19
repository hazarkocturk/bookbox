"use client";

import React from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { SignedIn, UserButton } from "@clerk/nextjs";
import type { Theme } from "@mui/material/styles";

interface Props {
  window?: () => Window;
}

function ElevationScroll(props: { children: React.ReactElement; window?: () => Window }) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children as React.ReactElement<AppBarProps>, {
    elevation: trigger ? 4 : 0,
    sx: (theme: Theme) => ({
      backgroundColor: trigger ? "transparent" : theme.palette.divider,
      backdropFilter: "blur(10px)",
      transition: "background-color 0.3s ease",
    }),
  });
}

export default function Header(props: Props) {
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="sticky">
          <Toolbar className="flex justify-between w-full">
            <Typography variant="h6" component="div">
              BookBox
            </Typography>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}
