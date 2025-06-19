"use client";

import React from "react";
import { useScrollTrigger, Box, Fade} from "@mui/material";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

export function ScrollTop(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: window ? window() : undefined,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
